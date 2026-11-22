(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const html = document.documentElement;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const storageGet = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const storageSet = (key, value) => { try { localStorage.setItem(key, value); } catch { /* In-memory state remains usable. */ } };
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safeHtmlWithBdi = (value = '') => escapeHtml(value).replace(/&lt;bdi dir=&quot;ltr&quot;&gt;/g, '<bdi dir="ltr">').replace(/&lt;bdi&gt;/g, '<bdi>').replace(/&lt;\/bdi&gt;/g, '</bdi>');
  let lang = storageGet('faris_creative_language') === 'ar' ? 'ar' : 'en';
  let theme = storageGet('faris_creative_theme') === 'light' ? 'light' : 'dark';
  let toastTimer = 0;
  let scrollQueued = false;
  let previousFocus = null;

  const text = (key) => data.getText(key, lang);
  const iconArrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M6 5h9v9"/></svg>';
  const iconCase = '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3.5" y="4" width="13" height="12" rx="2"/><path d="M7 4V2.5h6V4m-9.5 4h13M8 8v2m4-2v2"/></svg>';
  const iconGitHub = '<svg class="repo-github" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.51-1.3-1.24-1.64-1.24-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.7 2.4 3.98 1.84.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.54 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.55.23 2.7.11 2.98.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.24-5.12 5.52.4.35.76 1.03.76 2.08v3.16c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>';
  const techAliases = { scikitlearn: 'scikit', vanillajavascript: 'javascript', javascript: 'javascript', html5: 'html', css3: 'css', tailwindcss: 'tailwind', githubpages: 'github-pages', jupyternotebook: 'jupyter', vscode: 'vscode', promptengineering: 'prompt' };
  const techKey = (label) => techAliases[String(label).toLowerCase().replace(/[^a-z0-9]/g, '')] || String(label).toLowerCase().replace(/[^a-z0-9]/g, '');
  const techPaths = {
    python: '<path d="M12 3h4a4 4 0 0 1 4 4v3H9a4 4 0 0 0-4 4v1H4a3 3 0 0 1-3-3V9a4 4 0 0 1 4-4h7"/><path d="M12 21H8a4 4 0 0 1-4-4v-3h11a4 4 0 0 0 4-4V9h1a3 3 0 0 1 3 3v3a4 4 0 0 1-4 4h-7"/><circle cx="9" cy="7" r=".7"/><circle cx="15" cy="17" r=".7"/>',
    pandas: '<path d="M5 19V9m5 10V5m5 14v-7m5 7V8"/><path d="M3 19h18"/>', numpy: '<path d="m4 17 5-10 5 10 6-10"/><circle cx="4" cy="17" r="1"/><circle cx="9" cy="7" r="1"/><circle cx="14" cy="17" r="1"/><circle cx="20" cy="7" r="1"/>',
    scikit: '<circle cx="6" cy="7" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="m8 8 3 8m5-8-3 8m-5-9 8-1"/>',
    xgboost: '<circle cx="12" cy="5" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M12 7v5M12 12 6 16m6-4 6 4"/>',
    shap: '<path d="M4 20V12h3v8m3 0V6h3v14m3 0V9h3v11"/><path d="M3 20h18"/>',
    html: '<path d="m5 3 1.4 16L12 21l5.6-2L19 3H5Z"/><text x="12" y="16" text-anchor="middle" fill="currentColor" stroke="none" font-size="10" font-weight="800">5</text>',
    css: '<path d="m5 3 1.4 16L12 21l5.6-2L19 3H5Z"/><text x="12" y="16" text-anchor="middle" fill="currentColor" stroke="none" font-size="10" font-weight="800">3</text>',
    javascript: '<rect x="3" y="3" width="18" height="18" rx="3"/><text x="12" y="16" text-anchor="middle" fill="currentColor" stroke="none" font-size="8" font-weight="800">JS</text>',
    tailwind: '<path d="M3 9c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0c1.1-1.7 2.2-2.6 3.4-2.9M3 15c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0c1.1-1.7 2.2-2.6 3.4-2.9"/>',
    'github-pages': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
    git: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 6h5a5 5 0 0 1 5 5v5M6 8v9a3 3 0 0 0 3 3h7"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.51-1.3-1.24-1.64-1.24-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.7 2.4 3.98 1.84.1-.72.4-1.2.72-1.48-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.54 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.55.23 2.7.11 2.98.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.24-5.12 5.52.4.35.76 1.03.76 2.08v3.16c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>',
    jupyter: '<ellipse cx="12" cy="12" rx="8" ry="4"/><path d="M4 8c0 2.2 3.6 4 8 4s8-1.8 8-4M4 16c0-2.2 3.6-4 8-4s8 1.8 8 4"/><circle cx="5" cy="4" r="1"/><circle cx="19" cy="20" r="1"/>',
    vscode: '<path d="m15 3 6 2v14l-6 2-9-7-3 2-1-1V9l1-1 3 2 9-7Z"/><path d="m6 10 9 7V7l-9 7"/>',
    prompt: '<path d="M4 5h16v12h-9l-5 4v-4H4z"/><path d="m13 7 1.2 2.8L17 11l-2.8 1.2L13 15l-1.2-2.8L9 11l2.8-1.2L13 7Z"/>'
  };
  const techSvg = (label) => `<svg viewBox="0 0 24 24" aria-hidden="true">${techPaths[techKey(label)] || techPaths.prompt}</svg>`;
  const techBadge = (label, variant = 'project') => `<span class="tech-badge ${variant}-tech-badge" data-tech="${techKey(label)}" tabindex="0"><bdi class="tech-label" dir="ltr">${escapeHtml(label)}</bdi><span class="tech-medallion" aria-hidden="true">${techSvg(label)}</span></span>`;

  function applyLanguage(next = lang) {
    const activeSectionId = $('.nav-link.is-active')?.dataset.section;
    const activeSection = activeSectionId ? document.getElementById(activeSectionId) : null;
    const activeSectionTop = activeSection?.getBoundingClientRect().top;
    const preserveActivePosition = activeSection && activeSectionTop < window.innerHeight && activeSectionTop + activeSection.offsetHeight > 0;
    lang = next === 'ar' ? 'ar' : 'en';
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach((node) => {
      const value = text(node.dataset.i18n);
      if (value !== '') {
        if (value.includes('<bdi')) {
          node.innerHTML = safeHtmlWithBdi(value);
        } else {
          node.textContent = value;
        }
      }
    });
    renderFocusDescriptions();

    $$('[data-i18n-aria]').forEach((node) => {
      const value = text(node.dataset.i18nAria);
      if (value) node.setAttribute('aria-label', value);
    });
    const menuButton = $('#menu-toggle');
    if (menuButton) menuButton.setAttribute('aria-label', text(menuButton.getAttribute('aria-expanded') === 'true' ? 'nav.menuClose' : 'nav.menuOpen'));
    document.title = lang === 'ar' ? 'فارس يحيى غزواني — أعمال مختارة' : 'Faris Yahya Ghazwani — Selected Work';
    storageSet('faris_creative_language', lang);
    renderHeroName();
    renderProjects();
    renderSkills();
    renderContactData();
    if (dialog?.open && currentProjectId) renderCase(currentProjectId);
    isolateArabicNumbers();
    if (preserveActivePosition && window.location.hash === `#${activeSectionId}`) {
      const shiftedTop = activeSection.getBoundingClientRect().top;
      window.scrollBy(0, shiftedTop - 112);
    } else if (preserveActivePosition) {
      const shiftedTop = activeSection.getBoundingClientRect().top;
      const delta = shiftedTop - activeSectionTop;
      if (Math.abs(delta) > 1) window.scrollBy(0, delta);
    }
    updateScrollState();
  }

  function renderFocusDescriptions() {
    const tokens = /XGBoost|SHAP|Pandas|Scikit-learn|HTML|CSS|JavaScript/g;
    $$('.sphere-pill-desc[data-i18n]').forEach((node) => {
      const value = text(node.dataset.i18n);
      if (lang !== 'ar') {
        node.textContent = value;
        return;
      }
      if (value.includes('<bdi')) {
        node.innerHTML = safeHtmlWithBdi(value);
        return;
      }
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      for (const match of value.matchAll(tokens)) {
        fragment.append(document.createTextNode(value.slice(cursor, match.index)));
        const isolated = document.createElement('bdi');
        isolated.dir = 'ltr';
        isolated.textContent = match[0];
        fragment.append(isolated);
        cursor = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(value.slice(cursor)));
      node.replaceChildren(fragment);
    });
  }
  function isolateArabicNumbers() {
    if (lang !== 'ar') return;
    const numberPattern = /(\+\s?966(?:[\s-]?\d){9}|\d{2}\s*\/\/|\d{4}[–-]\d{4}|\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?)/g;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement?.closest('bdi,script,style,svg,noscript')) textNodes.push(node);
    }
    textNodes.forEach((node) => {
      const matches = [...node.textContent.matchAll(numberPattern)];
      if (!matches.length) return;
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      matches.forEach((match) => {
        fragment.append(document.createTextNode(node.textContent.slice(cursor, match.index)));
        const isolated = document.createElement('bdi');
        isolated.dir = 'ltr';
        isolated.textContent = match[0];
        fragment.append(isolated);
        cursor = match.index + match[0].length;
      });
      fragment.append(document.createTextNode(node.textContent.slice(cursor)));
      node.replaceWith(fragment);
    });
  }

  function renderHeroName() {
    const heading = $('#hero-name');
    const words = text('hero.name').split(/\s+/).filter(Boolean);
    heading.replaceChildren();
    words.forEach((word, index) => {
      const mask = document.createElement('span');
      mask.className = 'word-mask';
      const reveal = document.createElement('span');
      reveal.className = 'word-reveal';
      reveal.style.setProperty('--word-index', String(index));
      reveal.textContent = word;
      mask.append(reveal);
      heading.append(mask);
      if (index < words.length - 1) heading.append(document.createTextNode(' '));
    });
  }

  function applyTheme(next = theme) {
    theme = next === 'light' ? 'light' : 'dark';
    html.dataset.theme = theme;
    const metaTheme = $('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = theme === 'light' ? '#f3efe6' : '#090a0e';
    const themeButton = $('#theme-toggle');
    if (themeButton) themeButton.setAttribute('aria-pressed', String(theme === 'light'));
    storageSet('faris_creative_theme', theme);
  }

  function renderContactData() {
    const contact = data.contact;
    const setIsolatedValue = (node, value) => {
      const bdi = document.createElement('bdi');
      bdi.dir = 'ltr';
      bdi.className = 'ltr-isolate';
      bdi.textContent = value;
      node.replaceChildren(bdi);
    };
    $('#contact-email').href = `mailto:${contact.email}`;
    setIsolatedValue($('#contact-email'), contact.email);
    $('#contact-phone').href = `tel:${contact.phone}`;
    setIsolatedValue($('#contact-phone'), text('contact.phone'));
    $('#contact-linkedin').href = contact.linkedin.url;
    setIsolatedValue($('#contact-linkedin-handle'), contact.linkedin.handle);
    $('#contact-github').href = contact.github.url;
    setIsolatedValue($('#contact-github-handle'), contact.github.handle);
    $$('[data-contact-link="resume"]').forEach((link) => { link.href = contact.resume; });
    $('[data-copy-channel="email"]').dataset.copy = contact.email;
    $('[data-copy-channel="phone"]').dataset.copy = contact.phone;
  }

  function projectArt(id) {
    if (id === 'icu-delirium') {
      const labels = lang === 'ar'
        ? { stay: 'مدة الإقامة', age: 'العمر', icu: 'مدة العناية', factors: 'العوامل', scores: 'دون أرقام', explain: 'التفسير', note: 'تفسير الخصائص · مخطط توضيحي', foot: 'أسماء الخصائص فقط' }
        : { stay: 'STAY LENGTH', age: 'AGE', icu: 'ICU STAY', factors: 'FACTORS', scores: 'NO SCORES SHOWN', explain: 'INTERPRETATION', note: 'Feature interpretation · illustrative', foot: 'Illustrative · names only' };
      const rows = [
        [labels.stay, '62%'], [labels.age, '62%'], [labels.icu, '62%']
      ].map(([label, width], index) => `<div class="factor-row"><span>${label}</span><span class="factor-line"><i class="factor-fill" style="--bar:${width};--delay:${index * 140}ms"></i></span></div>`).join('');
      return `<div class="art-grid"></div><div class="icu-chart"><div class="chart-head"><span>SHAP / ${labels.factors}</span><span>${labels.explain}</span></div>${rows}<div class="chart-axis"><span>${labels.factors}</span><span>${labels.scores}</span></div><div class="chart-note">${labels.note}</div></div><span class="art-label">${labels.foot}</span>`;
    }
    if (id === 'car-rental') {
      return `<div class="art-grid" aria-hidden="true"></div><div class="car-preview"><div class="car-window"><div class="mini-toolbar"><i></i><i></i><i></i><span class="mini-title">${lang === 'ar' ? 'معاينة واجهة' : 'INTERFACE PREVIEW'}</span><span class="car-flow-badge">${lang === 'ar' ? 'مسار العميل' : 'CLIENT FLOW'}</span></div><div class="car-row"><div class="car-silhouette"><svg viewBox="0 0 60 30" aria-hidden="true"><path d="M7 20h46l-3-7a4 4 0 0 0-4-3H20l-7 4-6 1-2 5h2m40 0h4"/><circle cx="17" cy="21" r="4"/><circle cx="43" cy="21" r="4"/><path d="m18 10-4 5h29l-5-5"/></svg></div><div class="car-text" aria-hidden="true"><b></b><i></i><i></i></div><span class="car-pill" aria-hidden="true"></span></div></div><div class="car-steps"><span class="car-step"><i aria-hidden="true"></i>${lang === 'ar' ? 'المركبات' : 'Catalog'}</span><span class="car-step"><i aria-hidden="true"></i>${lang === 'ar' ? 'الحجز' : 'Booking'}</span><span class="car-step"><i aria-hidden="true"></i>${lang === 'ar' ? 'الفاتورة' : 'Invoice'}</span></div></div>`;
    }
      return `<div class="art-grid" aria-hidden="true"></div><a class="albir-preview-link" dir="rtl" href="https://strider047.github.io/ber" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(text('credentials.coop.previewAria'))}"><span class="albir-mini-header"><b class="albir-emblem" dir="rtl">البر</b><span class="albir-mini-name" dir="rtl">${escapeHtml(text('credentials.coop.previewName'))}</span><span class="albir-demo">DEMO</span></span><span class="albir-mini-copy" dir="rtl">${escapeHtml(text('credentials.coop.previewCopy'))}</span><span class="albir-mini-bottom"><span class="albir-mini-cta" dir="rtl">${escapeHtml(text('credentials.coop.previewCta'))}</span><span class="albir-stats"><span><bdi dir="ltr">+1,250</bdi><small>${escapeHtml(text('credentials.coop.statFamilies'))}</small></span><span><bdi dir="ltr">+45</bdi><small>${escapeHtml(text('credentials.coop.statProjects'))}</small></span><span><bdi dir="ltr">+120</bdi><small>${escapeHtml(text('credentials.coop.statVolunteers'))}</small></span></span></span></a>`;
  }

  function renderProjects() {
    const container = $('#project-grid');
    if (!container) return;
    const ids = ['icu-delirium', 'car-rental', 'al-bir'];
    container.innerHTML = ids.map((id, index) => {
      const project = data.getProject(id, lang);
      if (!project) return '';
      const cls = index === 0 ? 'project-card--featured' : `project-card--${id === 'car-rental' ? 'rental' : 'albir'}`;
      const technologies = project.technologies.map((tech) => techBadge(tech)).join('');
      const repositoryStatus = project.links.github ? '' : `<span class="private-note">${escapeHtml(text('work.privateRepo'))}</span>`;
      const demo = project.links.liveDemo ? `<a class="text-action" href="${escapeHtml(project.links.liveDemo)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(text('work.liveDemo'))}</span>${iconArrow}</a>` : '';
      const decorativeArt = id !== 'al-bir' ? ' aria-hidden="true"' : '';
      return `<article class="project-card ${cls} reveal" data-project="${escapeHtml(id)}"><div class="project-card-copy"><span class="project-eyebrow"><i class="eyebrow-dot"></i>${escapeHtml(project.eyebrow)}</span><h3 class="project-title">${escapeHtml(project.title)}</h3><p class="project-description">${safeHtmlWithBdi(project.summary)}</p><span class="project-meta">${escapeHtml(project.meta)}</span></div><div class="project-art"${decorativeArt}>${projectArt(id)}</div><div class="project-footer"><div class="badge-list tech-badges">${technologies}</div><div class="project-actions"><button type="button" class="text-action case-action" data-case="${escapeHtml(id)}">${iconCase}<span>${escapeHtml(text('work.viewCaseStudy'))}</span></button>${demo}${repositoryStatus}</div></div></article>`;
    }).join('');
    observeReveals(container);
    bindCardSpotlights();
    bindCaseButtons();
  }

  function skillIcon(type) {
    const icons = {
      network: '<path d="M20 5v30M5 20h30M9.4 9.4l21.2 21.2m0-21.2L9.4 30.6"/><circle cx="20" cy="20" r="7"/>',
      browser: '<rect x="5" y="7" width="30" height="25" rx="5"/><path d="M5 14h30M12 10.5h.01m4 0h.01M16 22l-4 4 4 4m8-8 4 4-4 4"/>',
      tools: '<path d="M20 5 35 13.5v13L20 35 5 26.5v-13L20 5Z"/><path d="m5 13.5 15 9 15-9m-15 9V35m-7.5-25.8 15 9"/>'
    };
    return `<svg viewBox="0 0 40 40" aria-hidden="true">${icons[type] || icons.network}</svg>`;
  }

  function renderSkills() {
    const container = $('#skill-grid');
    if (!container) return;
    container.innerHTML = data.skills.map((group, index) => {
      const tags = group.items.map((item) => `<span class="skill-tag" data-tech="${techKey(item.label)}"><span class="skill-logo" aria-hidden="true">${techSvg(item.label)}</span><bdi dir="ltr">${escapeHtml(item.label)}</bdi></span>`).join('');
      const number = String(index + 1).padStart(2, '0');
      return `<article class="skill-card glass-card reveal"><div class="skill-top">${skillIcon(group.icon)}</div><div class="skill-heading-row"><span class="section-kicker">${escapeHtml(text(`${group.key}.eyebrow`))}</span><span class="skill-number"><bdi dir="ltr">${number}</bdi></span></div><h3>${escapeHtml(text(`${group.key}.title`))}</h3><div class="skill-tags">${tags}</div><div class="skill-sheen" aria-hidden="true"></div></article>`;
    }).join('');
    observeReveals(container);
  }

  const dialog = $('#case-study-dialog') || $('#case-dialog');
  let isClosing = false;
  let currentProjectId = null;
  let isPointerDownOnSheet = false;

  function renderCase(projectId) {
    const project = data.getProject(projectId, lang);
    if (!project) return;
    currentProjectId = projectId;
    const titleEl = $('#dialog-title');
    if (titleEl) titleEl.textContent = project.title;

    const subsections = project.subsections.map((part, index) => {
      const num = String(index + 1).padStart(2, '0');
      return `<section class="dialog-subsection" style="--card-index:${index};"><div class="subsection-header"><span class="subsection-index" dir="ltr"><bdi>${num}</bdi></span><h3>${escapeHtml(part.title)}</h3></div><p>${safeHtmlWithBdi(part.content)}</p></section>`;
    }).join('');

    const tech = project.technologies.map((item) => techBadge(item, 'dialog')).join('');

    const links = [];
    if (project.links.liveDemo) {
      links.push(`<a class="dialog-cta dialog-btn-primary" href="${escapeHtml(project.links.liveDemo)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text('work.liveDemo'))}${iconArrow}</a>`);
      if (project.links.github) {
        links.push(`<a class="dialog-cta dialog-btn-secondary repo-link" href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener noreferrer">${iconGitHub}<span>${escapeHtml(text('work.githubRepo'))}</span>${iconArrow}</a>`);
      }
    } else if (project.links.github) {
      links.push(`<a class="dialog-cta dialog-btn-primary repo-link" href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener noreferrer">${iconGitHub}<span>${escapeHtml(text('work.githubRepo'))}</span>${iconArrow}</a>`);
    } else {
      links.push(`<span class="dialog-private-note"><svg class="private-lock-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span>${escapeHtml(text('work.privateRepo'))}</span></span>`);
    }

    const contentEl = $('#dialog-content');
    if (contentEl) {
      contentEl.innerHTML = `<p class="dialog-summary">${safeHtmlWithBdi(project.summary)}</p><p class="dialog-meta">${escapeHtml(project.meta)}</p><div class="dialog-subsections">${subsections}</div>`;
      contentEl.scrollTop = 0;
    }

    const footerEl = $('#dialog-footer');
    if (footerEl) {
      footerEl.innerHTML = `<div class="dialog-tech">${tech}</div><div class="dialog-links">${links.join('')}</div>`;
    }

    isolateArabicNumbers();
  }

  function openDialog(projectId) {
    if (!dialog) return;
    if (projectId) renderCase(projectId);
    isClosing = false;
    dialog.classList.remove('is-closing');
    html.classList.add('has-modal-open');
    document.body.classList.add('has-modal-open');
    if (!dialog.open) {
      dialog.showModal();
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        dialog.classList.add('is-open');
        $('.dialog-close', dialog)?.focus();
      });
    });
  }

  function closeDialogAnimated() {
    if (!dialog || !dialog.open || isClosing) return;
    isClosing = true;
    dialog.classList.remove('is-open');
    dialog.classList.add('is-closing');

    let finalized = false;
    const finishClose = () => {
      if (finalized) return;
      finalized = true;
      dialog.removeEventListener('transitionend', onTransitionEnd);
      clearTimeout(fallbackTimeout);
      if (dialog.open) dialog.close();
      dialog.classList.remove('is-closing');
      html.classList.remove('has-modal-open');
      document.body.classList.remove('has-modal-open');
      isClosing = false;
      previousFocus?.focus();
    };

    const onTransitionEnd = (e) => {
      if (e.target === $('.dialog-sheet', dialog) || e.target === dialog) {
        finishClose();
      }
    };

    dialog.addEventListener('transitionend', onTransitionEnd);
    const fallbackTimeout = setTimeout(finishClose, 250);
  }

  function bindCaseButtons() {
    $$('[data-case]').forEach((button) => {
      button.addEventListener('click', () => {
        previousFocus = button;
        openDialog(button.dataset.case);
      });
    });
  }

  $('.dialog-close', dialog)?.addEventListener('click', (event) => {
    event.preventDefault();
    closeDialogAnimated();
  });

  $('.dialog-sheet', dialog)?.addEventListener('pointerdown', () => {
    isPointerDownOnSheet = true;
  });

  dialog?.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.dialog-sheet')) {
      isPointerDownOnSheet = true;
    } else {
      isPointerDownOnSheet = false;
    }
  });

  dialog?.addEventListener('click', (event) => {
    if (event.target.closest('[data-dialog-close]')) {
      closeDialogAnimated();
      return;
    }
    if (!isPointerDownOnSheet && (event.target === dialog || event.target.classList.contains('dialog-backdrop'))) {
      closeDialogAnimated();
    }
    isPointerDownOnSheet = false;
  });

  dialog?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialogAnimated();
  });

  dialog?.addEventListener('close', () => {
    html.classList.remove('has-modal-open');
    document.body.classList.remove('has-modal-open');
    dialog.classList.remove('is-open', 'is-closing');
    isClosing = false;
    previousFocus?.focus();
  });

  dialog?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialogAnimated();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = $$('a[href],button:not(:disabled),[tabindex]:not([tabindex="-1"])', dialog).filter((node) => node.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  function bindCopyButtons() {
    const toast = $('#toast');
    $$('.copy-button').forEach((button) => button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      let copied = false;
      try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          copied = true;
        } else {
          const field = document.createElement('textarea');
          field.value = value;
          field.setAttribute('readonly', '');
          field.style.position = 'fixed';
          field.style.opacity = '0';
          document.body.append(field);
          field.select();
          copied = document.execCommand('copy');
          field.remove();
        }
      } catch { copied = false; }
      if (!copied) {
        toast.textContent = value;
        toast.classList.add('is-visible');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
        return;
      }
      button.classList.add('is-copied');
      const channelKey = button.closest('.contact-card').classList.contains('email-card') ? 'contact.emailLabel' : 'contact.phoneLabel';
      button.setAttribute('aria-label', `${text(channelKey)} — ${text('contact.copyEmailSuccess')}`);
      toast.textContent = text('contact.copyEmailSuccess');
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => { toast.classList.remove('is-visible'); button.classList.remove('is-copied'); button.setAttribute('aria-label', text(button.dataset.i18nAria)); }, 2100);
    }));
  }

  function bindHeroRoleReadout() {
    const pills = $$('.role-pill[data-focus]');
    const stage = $('#hero-stage');
    const orbitPills = $$('.float-chip[data-orbit]', stage);
    const controls = [...pills, ...orbitPills];
    if (!stage || !controls.length) return;
    let current = '';
    const setFocus = (key = '') => {
      if (current === key) return;
      current = key;
      pills.forEach((pill) => pill.classList.toggle('is-current', Boolean(key) && pill.dataset.focus === key));
      orbitPills.forEach((pill) => {
        const active = Boolean(key) && pill.dataset.orbit === key;
        pill.classList.toggle('is-current', active);
        pill.classList.toggle('is-expanded', active);
        pill.parentElement?.classList.toggle('is-active', active);
        pill.setAttribute('aria-expanded', String(active));
      });
      stage.classList.toggle('is-apps-focus', key === 'apps');
      stage.dataset.activeFocus = key;
    };
    let resetTimer = 0;
    const resetWhenIdle = () => {
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        const active = document.activeElement;
        const pointerTarget = document.querySelector('.role-pill:hover,.float-chip:hover');
        if (!controls.includes(active) && !pointerTarget) setFocus('');
      }, 90);
    };
    controls.forEach((control) => {
      const key = control.dataset.focus || control.dataset.orbit;
      let touchWasActive = false;
      control.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch') setFocus(key); });
      control.addEventListener('pointerdown', (event) => { if (event.pointerType === 'touch') touchWasActive = current === key; });
      control.addEventListener('pointerleave', resetWhenIdle);
      control.addEventListener('focus', () => setFocus(key));
      control.addEventListener('blur', resetWhenIdle);
      control.addEventListener('click', (event) => {
        if (!matchMedia('(hover: hover)').matches) {
          setFocus(event.detail === 0 ? key : touchWasActive ? '' : key);
          touchWasActive = false;
        }
      });
    });
  }

  function bindStandingTooltip() {
    const button = $('#standing-trigger');
    if (!button) return;
    button.addEventListener('click', () => button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true')));
    button.addEventListener('blur', () => button.setAttribute('aria-expanded', 'false'));
    document.addEventListener('pointerdown', (event) => {
      if (!event.target.closest('.honor-meta')) button.setAttribute('aria-expanded', 'false');
    });
  }

  function bindBackToTop() {
    const button = $('#back-to-top');
    if (!button) return;
    button.addEventListener('click', () => {
      if (window.lenis && typeof window.lenis.scrollTo === 'function') window.lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  }

  function bindNavigation() {
    const toggle = $('#menu-toggle');
    const mobileNav = $('#mobile-nav');
    toggle.addEventListener('click', () => {
      const opening = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', text(opening ? 'nav.menuClose' : 'nav.menuOpen'));
      mobileNav.hidden = !opening;
    });
    $$('.mobile-nav a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', text('nav.menuOpen'));
      mobileNav.hidden = true;
    }));
    $('#language-toggle').addEventListener('click', () => applyLanguage(lang === 'en' ? 'ar' : 'en'));
    $('#theme-toggle').addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !dialog.open && !mobileNav.hidden) {
        mobileNav.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', text('nav.menuOpen'));
        toggle.focus();
      }
    });

    const sections = ['work', 'skills', 'story', 'contact'].map((id) => document.getElementById(id));
    if ('IntersectionObserver' in window) {
      const activeObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        $$('.nav-link').forEach((link) => link.classList.toggle('is-active', link.dataset.section === visible.target.id));
      }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .2, .5, .8] });
      sections.forEach((section) => section && activeObserver.observe(section));
    }
  }

  function updateScrollState() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    $('#scroll-progress').style.transform = `scaleX(${progress})`;
    $('.scroll-track').setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    $('#nav-shell').classList.toggle('is-scrolled', window.scrollY > 34);
    const backToTop = $('#back-to-top');
    if (backToTop) {
      const visible = window.scrollY >= 420;
      backToTop.classList.toggle('is-visible', visible);
      backToTop.setAttribute('aria-hidden', String(!visible));
      backToTop.tabIndex = visible ? 0 : -1;
    }
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      window.requestAnimationFrame(updateScrollState);
    }
  }, { passive: true });

  function observeReveals(root = document) {
    const nodes = $$('.reveal:not([data-reveal-bound])', root);
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          current.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
    nodes.forEach((node) => {
      node.dataset.revealBound = 'true';
      observer.observe(node);
    });
  }

  function bindCardSpotlights() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    $$('.project-card').forEach((card) => card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--spot-x', `${x}px`);
      card.style.setProperty('--spot-y', `${y}px`);
      const rotateY = ((x / rect.width) - .5) * 3.2;
      const rotateX = (.5 - (y / rect.height)) * 2.5;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }));
    $$('.project-card').forEach((card) => card.addEventListener('pointerleave', () => { card.style.transform = ''; }));
  }

  function bindHeroMotion() {
    const stage = $('#hero-stage');
    if (!stage) return;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const nodes = $$('.orbit-node', stage).map((node, index) => ({
      node, key: node.querySelector('.float-chip')?.dataset.orbit,
      ax: [5.5, 6.5, 4.5, 6][index], ay: [7, 5.5, 8.5, 6.5][index],
      fx: [1, 1.19, .91, .74][index], fy: [.87, 1, 1.13, .82][index],
      phaseX: [.3, 2.1, 4.2, 5.4][index], phaseY: [1.7, 3.6, .8, 2.8][index],
      depth: [.55, .85, 1, 1.2][index], x: 0, y: 0
    }));
    let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0, frame = 0, started = performance.now();
    const onPointerMove = (event) => {
      const rect = stage.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;
    };
    const onPointerLeave = () => { pointerX = 0; pointerY = 0; };
    const draw = (now) => {
      const t = (now - started) / 1000;
      smoothX += (pointerX - smoothX) * .07;
      smoothY += (pointerY - smoothY) * .07;
      nodes.forEach((item) => {
        const locked = stage.dataset.activeFocus === item.key;
        const tx = locked ? 0 : item.ax * Math.sin(t * (Math.PI * 2 / 6.7) * item.fx + item.phaseX) + smoothX * 8 * item.depth;
        const ty = locked ? 0 : item.ay * Math.cos(t * (Math.PI * 2 / 8.3) * item.fy + item.phaseY) + smoothY * 8 * item.depth;
        item.x += (tx - item.x) * (locked ? .13 : .07);
        item.y += (ty - item.y) * (locked ? .13 : .07);
        item.node.style.transform = `translate3d(${item.x.toFixed(2)}px,${item.y.toFixed(2)}px,0)`;
      });
      frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches) {
        nodes.forEach(({ node }) => { node.style.transform = 'none'; });
        pointerX = pointerY = smoothX = smoothY = 0;
        return;
      }
      started = performance.now();
      frame = requestAnimationFrame(draw);
    };
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerleave', onPointerLeave);
    reduceMotion.addEventListener?.('change', start);
    start();
    $$('.magnetic').forEach((button) => {
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches || reduceMotion.matches) return;
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .075}px,${(event.clientY - rect.top - rect.height / 2) * .11}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }  bindNavigation();
  bindCopyButtons();
  bindHeroRoleReadout();
  bindStandingTooltip();
  bindBackToTop();
  bindHeroMotion();
  document.body.classList.add('motion-ready');
  observeReveals();
  applyTheme(theme);
  applyLanguage(lang);
  updateScrollState();
})();

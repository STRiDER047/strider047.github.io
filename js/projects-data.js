/**
 * Bilingual Portfolio Data Layer
 * Faris Yahya Ghazwani — Computer Science Graduate
 */

(function () {
  'use strict';

  // Bilingual UI Dictionary
  const ui = {
    en: {
      // Navigation
      'nav.brand': 'Faris Ghazwani',
      'nav.brandAria': 'Faris Ghazwani — Home',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.background': 'Background',
      'nav.contact': 'Contact',
      'nav.langToggle': 'عربي',
      'nav.langToggleAria': 'Switch language to Arabic',
      'nav.themeToggle': 'Toggle color theme',
      'nav.menuOpen': 'Open navigation',
      'nav.menuClose': 'Close navigation',
      'nav.main': 'Main navigation',
      'nav.mobile': 'Mobile navigation',
      'nav.scrollProjects': 'Scroll to projects',
      'a11y.skip': 'Skip to content',
      'a11y.scrollProgress': 'Page progress',
      'a11y.backToTop': 'Back to top',
      'contact.copyEmailAria': 'Copy email address',
      'contact.copyPhoneAria': 'Copy phone number',

      // Section 01 // OVERVIEW
      'hero.availability': 'Available for opportunities · Saudi Arabia',
      'hero.roles.ai': 'Applied AI / ML',
      'hero.roles.data': 'Data Analysis',
      'hero.roles.frontend': 'Front-End Development',
      'hero.roles.apps': 'AI-Powered Applications',
      'hero.name': 'Faris Yahya Ghazwani',
      'hero.statement': 'Computer Science graduate from Jazan University (Second-Class Honors). I work on applied machine learning projects and responsive front-end web applications.',
      'hero.focus.ai': 'Clinical risk prediction using XGBoost and SHAP interpretability.',
      'hero.focus.data': 'Data cleaning and EDA with Pandas, plus model evaluation using Scikit-learn.',
      'hero.focus.frontend': 'Responsive bilingual web interfaces and SPAs built with HTML, CSS, and JavaScript.',
      'hero.focus.apps': 'Using AI development tools and prompt engineering to build practical web interfaces.',
      'hero.stageAria': 'Interactive overview of focus areas',
      'hero.ctaProjects': 'Explore Projects',
      'hero.ctaCV': 'View Resume',
      'hero.snapshot.eyebrow': 'PROFILE // ACADEMIC SNAPSHOT',
      'hero.snapshot.degreeLabel': 'Degree',
      'hero.snapshot.degreeValue': 'B.Sc. in Computer Science (2026)',
      'hero.snapshot.uniLabel': 'University',
      'hero.snapshot.uniValue': 'Jazan University',
      'hero.snapshot.standingLabel': 'Standing',
      'hero.snapshot.standingValue': '4.37 / 5.00 GPA — Second-Class Honors',
      'hero.snapshot.recLabel': 'Recognition',
      'hero.snapshot.recValue': '5th Place — Graduation Projects Exhibition',
      'gpa.equivalentPrefix': '4.0 Scale Equivalent: ≈',

      // Section 02 // PORTFOLIO
      'work.index': '02 // PORTFOLIO',
      'work.title': 'Featured Projects',
      'work.subtitle': 'Applied machine learning research, single-page application architecture, and front-end interface engineering.',
      'work.viewCaseStudy': 'Project Details',
      'work.privateRepo': 'Private Research Repo',
      'work.githubRepo': 'GitHub Repository',
      'work.liveDemo': 'Live Demo',

      // Projects Card Copy
      'projects.icu.eyebrow': 'TEAM GRADUATION PROJECT // APPLIED ML',
      'projects.icu.title': 'Predictive Modelling of ICU Delirium',
      'projects.icu.period': '2025–2026 • 5th Place Winner',
      'projects.icu.description': 'Academic team graduation project predicting ICU delirium risk on the MIMIC-IV clinical dataset, covering data preprocessing, model evaluation (ROC-AUC), and SHAP explainability.',

      'projects.carRental.eyebrow': 'ACADEMIC TEAM PROJECT // SPA',
      'projects.carRental.title': 'Car Rental Single-Page Application',
      'projects.carRental.category': 'Front-End Development',
      'projects.carRental.description': 'A client-side car rental application featuring an interactive vehicle catalog, booking flow, and dynamic invoice generation.',

      'projects.alBir.eyebrow': 'COOPERATIVE TRAINING // PROTOTYPE',
      'projects.alBir.title': 'Al-Bir Charity Association Web Interface',
      'projects.alBir.category': '2025 • Cooperative Training',
      'projects.alBir.description': 'An Arabic-first (RTL) front-end prototype developed during cooperative training to showcase the association’s programs, featuring responsive layouts, dark/light theme support, and interactive navigation.',

      // Section 03 // TECH STACK
      'skills.index': '03 // TECH STACK',
      'skills.title': 'Technical Skills',
      'skills.subtitle': 'Focused technical toolkit spanning machine learning pipelines, modern front-end engineering, and development workflow tools.',
      'skills.cat1.eyebrow': 'CATEGORY 01',
      'skills.cat1.title': 'AI / ML & Data Analysis',
      'skills.cat2.eyebrow': 'CATEGORY 02',
      'skills.cat2.title': 'Front-End Development',
      'skills.cat3.eyebrow': 'CATEGORY 03',
      'skills.cat3.title': 'Tools & Workflow',

      // Section 04 // BACKGROUND
      'credentials.index': '04 // BACKGROUND',
      'credentials.title': 'Education & Experience',
      'credentials.subtitle': 'Academic foundation, competitive technical recognition, and cooperative industry training.',
      'credentials.col1.eyebrow': 'ACADEMIC FOUNDATION',
      'credentials.edu.degree': 'Bachelor of Computer Science',
      'credentials.edu.meta': 'Jazan University • 2026 • GPA 4.37 / 5.00 (Second-Class Honors)',
      'credentials.edu.desc': 'Comprehensive study of computer science foundations, algorithms, database systems, software engineering principles, and applied machine learning.',
      'credentials.rec.title': '5th Place — Graduation Projects Exhibition',
      'credentials.rec.meta': 'Jazan University • 2026',
      'credentials.rec.desc': 'Awarded fifth place across university-wide computer science graduation projects for the predictive clinical machine learning research on ICU delirium.',
      'credentials.rec.certificate': 'View Certificate ↗',
      'credentials.col2.eyebrow': 'INDUSTRY EXPERIENCE',
      'credentials.coop.title': 'Cooperative Training Intern',
      'credentials.coop.meta': 'Al-Bir Charity Association • Al-Eidabi, Saudi Arabia • June 2025',
      'credentials.coop.desc': 'Completed field training involving organizational operations, technical documentation, and front-end interface prototyping using AI development tools and GitHub Pages deployment.',
      'credentials.coop.previewAria': 'Open Al-Bir Charity Association demo website in a new tab',
      'credentials.coop.previewName': 'جمعية البر الخيرية • العيدابي',
      'credentials.coop.previewCopy': 'نغرس الأمل ونساند الأسر بمحافظة العيدابي',
      'credentials.coop.previewCta': 'تبرع الآن',
      'credentials.coop.statFamilies': 'أسرة',
      'credentials.coop.statProjects': 'مشروع',
      'credentials.coop.statVolunteers': 'متطوع',

      // Section 05 // DIRECT CHANNELS
      'contact.index': '05 // DIRECT CHANNELS',
      'contact.title': "Let's Connect",
      'contact.statement': 'Open to graduate and entry-level roles in machine learning, data analysis, and front-end development.',
      'contact.emailLabel': 'Email',
      'contact.copyEmail': 'Copy',
      'contact.copyEmailAria': 'Copy email address',
      'contact.copyEmailSuccess': 'Copied!',
      'contact.phoneLabel': 'Phone',
      'contact.copyPhone': 'Copy',
      'contact.copyPhoneAria': 'Copy phone number',
      'contact.copyPhoneSuccess': 'Copied!',
      'contact.linkedinLabel': 'LinkedIn',
      'contact.githubLabel': 'GitHub',
      'contact.cvLabel': 'Resume',
      'contact.cvValue': 'View Resume',
      'contact.phone': '+966 57 005 1298',

      // Dialog & Footer
      'dialog.close': 'Close',
      'dialog.eyebrow': 'PROJECT DETAILS',
      'footer.copy': '© 2026 Faris Yahya Ghazwani',

    },

    ar: {
      // Navigation
      'nav.brand': 'فارس غزواني',
      'nav.brandAria': 'فارس غزواني — الرئيسية',
      'nav.projects': 'المشاريع',
      'nav.skills': 'المهارات',
      'nav.background': 'التعليم والخبرة',
      'nav.contact': 'التواصل',
      'nav.langToggle': 'English',
      'nav.langToggleAria': 'التبديل إلى اللغة الإنجليزية',
      'nav.themeToggle': 'تبديل المظهر',
      'nav.menuOpen': 'فتح قائمة التنقل',
      'nav.menuClose': 'إغلاق قائمة التنقل',
      'nav.main': 'قائمة التنقل الرئيسية',
      'nav.mobile': 'قائمة التنقل للأجهزة المحمولة',
      'nav.scrollProjects': 'انتقل إلى المشاريع',
      'a11y.skip': 'تجاوز إلى المحتوى',
      'a11y.scrollProgress': 'التقدم في الصفحة',
      'a11y.backToTop': 'العودة إلى الأعلى',

      // Section 01 // OVERVIEW
      'hero.availability': 'متاح للفرص الوظيفية · السعودية',
      'hero.roles.ai': 'الذكاء الاصطناعي وتعلم الآلة',
      'hero.roles.data': 'تحليل البيانات',
      'hero.roles.frontend': 'تطوير الواجهات الأمامية',
      'hero.roles.apps': 'تطبيقات مدعومة بالذكاء الاصطناعي',
      'hero.name': 'فارس يحيى غزواني',
      'hero.statement': 'خريج علوم حاسب من جامعة جازان بمرتبة الشرف الثانية. أعمل على مشاريع تعلم الآلة التطبيقي وتطوير واجهات وتطبيقات الويب المتجاوبة.',
      'hero.focus.ai': 'النمذجة التنبؤية للمخاطر السريرية باستخدام XGBoost وتفسير النتائج عبر SHAP.',
      'hero.focus.data': 'تنظيف البيانات وتحليلها استكشافياً بـ Pandas، وتقييم النماذج عبر Scikit-learn.',
      'hero.focus.frontend': 'بناء واجهات ويب متجاوبة وتطبيقات صفحة واحدة باستخدام <bdi dir="ltr">HTML</bdi> و<bdi dir="ltr">CSS</bdi> و<bdi dir="ltr">JavaScript</bdi>.',
      'hero.focus.apps': 'توظيف أدوات الذكاء الاصطناعي وهندسة الأوامر لبناء واجهات وتطبيقات ويب عملية.',
      'hero.stageAria': 'عرض تفاعلي لمجالات التركيز التقني',
      'hero.ctaProjects': 'استعراض المشاريع',
      'hero.ctaCV': 'عرض السيرة الذاتية',
      'hero.snapshot.eyebrow': 'الملف التعريفي // لمحة أكاديمية',
      'hero.snapshot.degreeLabel': 'الدرجة العلمية',
      'hero.snapshot.degreeValue': 'بكالوريوس علوم الحاسب (2026)',
      'hero.snapshot.uniLabel': 'الجامعة',
      'hero.snapshot.uniValue': 'جامعة جازان',
      'hero.snapshot.standingLabel': 'المعدل والتكريم',
      'hero.snapshot.standingValue': '4.37 / 5.00 — مرتبة الشرف الثانية',
      'hero.snapshot.recLabel': 'التميز الأكاديمي',
      'hero.snapshot.recValue': 'المركز الخامس — معرض مشاريع التخرج',
      'gpa.equivalentPrefix': 'المعادل بمقياس 4.0: ≈',

      // Section 02 // PORTFOLIO
      'work.index': '02 // المعرض التقني',
      'work.title': 'أبرز المشاريع التقنية',
      'work.subtitle': 'أبحاث تعلم الآلة التطبيقي، هندسة تطبيقات الصفحة الواحدة (SPA)، وبناء واجهات الويب التفاعلية.',
      'work.viewCaseStudy': 'تفاصيل المشروع',
      'work.privateRepo': 'مستودع أبحاث خاص',
      'work.githubRepo': 'مستودع GitHub',
      'work.liveDemo': 'معاينة حية',

      // Projects Card Copy
      'projects.icu.eyebrow': 'مشروع تخرج جماعي // تعلم الآلة التطبيقي',
      'projects.icu.title': 'النمذجة التنبؤية لمخاطر الهذيان في العناية المركزة',
      'projects.icu.period': '2025–2026 • الفائز بالمركز الخامس',
      'projects.icu.description': 'مشروع تخرج جماعي للتنبؤ بمخاطر الهذيان في العناية المركزة باستخدام بيانات <bdi dir="ltr">MIMIC-IV</bdi> السريرية، شمل تجهيز البيانات ومقارنة نماذج تعلم الآلة (<bdi dir="ltr">ROC-AUC</bdi>) وتفسير النتائج عبر <bdi dir="ltr">SHAP</bdi>.',

      'projects.carRental.eyebrow': 'مشروع أكاديمي جماعي // تطبيق صفحة واحدة',
      'projects.carRental.title': 'تطبيق تأجير السيارات (Single-Page Application)',
      'projects.carRental.category': 'تطوير الواجهات الأمامية',
      'projects.carRental.description': 'تطبيق ويب من جانب العميل لتأجير السيارات يتضمن دليلاً تفاعلياً للمركبات، ومسار حجز متكامل، وتوليد فواتير ديناميكية قابلة للطباعة.',

      'projects.alBir.eyebrow': 'تدريب تعاوني // نموذج واجهة أمامية',
      'projects.alBir.title': 'واجهة موقع جمعية البر الخيرية',
      'projects.alBir.category': '2025 • تدريب تعاوني',
      'projects.alBir.description': 'نموذج أولي لواجهة ويب عربية (<bdi dir="ltr">RTL</bdi>) طُوّر خلال التدريب التعاوني لعرض معلومات وبرامج الجمعية، مع تصميم متجاوب ودعم للوضعين الداكن والفاتح.',

      // Section 03 // TECH STACK
      'skills.index': '03 // الأدوات والتقنيات',
      'skills.title': 'المهارات التقنية',
      'skills.subtitle': 'مجموعة أدوات تقنية تغطي مشاريع تعلم الآلة، وتطوير الواجهات الأمامية، وأدوات بيئة العمل والتطوير.',
      'skills.cat1.eyebrow': 'الفئة 01',
      'skills.cat1.title': 'الذكاء الاصطناعي وتعلم الآلة وتحليل البيانات',
      'skills.cat2.eyebrow': 'الفئة 02',
      'skills.cat2.title': 'تطوير الواجهات الأمامية',
      'skills.cat3.eyebrow': 'الفئة 03',
      'skills.cat3.title': 'الأدوات وبيئة العمل',

      // Section 04 // BACKGROUND
      'credentials.index': '04 // المسيرة الأكاديمية والعملية',
      'credentials.title': 'التعليم والتدريب التعاوني',
      'credentials.subtitle': 'الأساس الأكاديمي، والتميز التنافسي في مشاريع التخرج، والتدريب الميداني في بيئة العمل.',
      'credentials.col1.eyebrow': 'الأساس الأكاديمي',
      'credentials.edu.degree': 'بكالوريوس علوم الحاسب',
      'credentials.edu.meta': 'جامعة جازان • 2026 • المعدل 4.37 / 5.00 (مرتبة الشرف الثانية)',
      'credentials.edu.desc': 'دراسة شاملة لأسس علوم الحاسب والخوارزميات ونظم قواعد البيانات وهندسة البرمجيات وتطبيقات تعلم الآلة.',
      'credentials.rec.title': 'المركز الخامس — معرض مشاريع التخرج',
      'credentials.rec.meta': 'جامعة جازان • 2026',
      'credentials.rec.desc': 'تحقيق المركز الخامس على مستوى مشاريع تخرج علوم الحاسب بالجامعة عن بحث النمذجة التنبؤية السريرية لمخاطر الهذيان في العناية المركزة.',
      'credentials.rec.certificate': 'عرض الشهادة ↗',
      'credentials.col2.eyebrow': 'الخبرة الميدانية',
      'credentials.coop.title': 'متدرب — برنامج التدريب التعاوني',
      'credentials.coop.meta': 'جمعية البر الخيرية • العيدابي، المملكة العربية السعودية • يونيو 2025',
      'credentials.coop.desc': 'إتمام التدريب الميداني المتضمن التعامل مع الإجراءات المؤسسية، والتوثيق الفني، وتطوير نموذج أولي لواجهة ويب باستخدام أدوات الذكاء الاصطناعي والنشر عبر GitHub Pages.',
      'credentials.coop.previewAria': 'فتح الموقع التجريبي لجمعية البر الخيرية في تبويب جديد',
      'credentials.coop.previewName': 'جمعية البر الخيرية • العيدابي',
      'credentials.coop.previewCopy': 'نغرس الأمل ونساند الأسر بمحافظة العيدابي',
      'credentials.coop.previewCta': 'تبرع الآن',
      'credentials.coop.statFamilies': 'أسرة',
      'credentials.coop.statProjects': 'مشروع',
      'credentials.coop.statVolunteers': 'متطوع',

      // Section 05 // DIRECT CHANNELS
      'contact.index': '05 // قنوات التواصل',
      'contact.title': 'تواصل معي',
      'contact.statement': 'متاح لفرص حديثي التخرج والمشاريع في مجالات تعلم الآلة، وتحليل البيانات، وتطوير الواجهات الأمامية.',
      'contact.emailLabel': 'البريد الإلكتروني',
      'contact.copyEmail': 'نسخ',
      'contact.copyEmailAria': 'نسخ البريد الإلكتروني',
      'contact.copyEmailSuccess': 'تم النسخ!',
      'contact.phoneLabel': 'الهاتف',
      'contact.copyPhone': 'نسخ',
      'contact.copyPhoneAria': 'نسخ رقم الهاتف',
      'contact.copyPhoneSuccess': 'تم النسخ!',
      'contact.linkedinLabel': 'LinkedIn',
      'contact.githubLabel': 'GitHub',
      'contact.cvLabel': 'السيرة الذاتية',
      'contact.cvValue': 'عرض السيرة الذاتية',
      'contact.phone': '+966 57 005 1298',

      // Dialog & Footer
      'dialog.close': 'إغلاق',
      'dialog.eyebrow': 'تفاصيل المشروع',
      'footer.copy': '© 2026 فارس يحيى غزواني',

    }
  };

  // Structured Case Study Data
  const projects = {
    'icu-delirium': {
      id: 'icu-delirium',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'SHAP'],
      links: {
        github: null,
        statusText: 'Private Research Repo'
      },
      en: {
        title: 'Predictive Modelling of ICU Delirium',
        eyebrow: 'TEAM GRADUATION PROJECT // APPLIED ML',
        meta: '2025–2026 • 5th Place Winner — Jazan University Graduation Projects Exhibition',
        summary: 'Academic team graduation project predicting ICU delirium risk on the MIMIC-IV clinical dataset, covering data preprocessing, model evaluation (ROC-AUC), and SHAP explainability.',
        subsections: [
          {
            title: 'Objective',
            content: 'Predict intensive care unit (ICU) delirium risk using clinical data extracted from the MIMIC-IV database. The research focuses on identifying high-risk patients early during hospitalization to assist intensive care decision-support frameworks.'
          },
          {
            title: 'Data Preparation & Preprocessing',
            content: 'Exploratory data analysis (EDA) and clinical feature engineering were implemented using Python, Pandas, and NumPy. Missing values were addressed using dropna for high-sparsity clinical records, fillna(0) where clinically appropriate, and fold-wise mean imputation to prevent data leakage. Continuous clinical indicators were normalized via MinMaxScaler, and severe class imbalance was mitigated using controlled random undersampling.'
          },
          {
            title: 'Models & Evaluation',
            content: 'Developed and benchmarked multiple candidate architectures including XGBoost, Random Forest, Logistic Regression, and Deep Neural Networks (DNN). Models were validated across stratified 5-Fold Cross-Validation experiments as well as separate chronological 80/20 train/test splits. Model discrimination and classification performance were evaluated using ROC-AUC alongside precision, recall, and F1-score metrics.'
          },
          {
            title: 'Explainability & Feature Attribution',
            content: 'Integrated SHAP (SHapley Additive exPlanations) TreeExplainer and DeepExplainer to unpack model decisions and provide clinicians with transparent feature attributions. Analysis revealed duration of stay (duration_of_stay), patient age (anchor_age), and length of ICU stay (los) among the most influential physiological and demographic predictors.'
          },
          {
            title: 'Recognition & Academic Context',
            content: 'Awarded 5th Place across university-wide computer science graduation projects at the Jazan University Graduation Projects Exhibition (2026). This project was conducted strictly as an academic research graduation project and is not intended or deployed as a certified clinical diagnostic device.'
          }
        ]
      },
      ar: {
        title: 'النمذجة التنبؤية لمخاطر الهذيان في العناية المركزة',
        eyebrow: 'مشروع تخرج جماعي // تعلم الآلة التطبيقي',
        meta: '2025–2026 • المركز الخامس — معرض مشاريع تخرج جامعة جازان',
        summary: 'مشروع تخرج جماعي للتنبؤ بمخاطر الهذيان في العناية المركزة باستخدام بيانات <bdi dir="ltr">MIMIC-IV</bdi> السريرية، شمل تجهيز البيانات ومقارنة نماذج تعلم الآلة (<bdi dir="ltr">ROC-AUC</bdi>) وتفسير النتائج عبر <bdi dir="ltr">SHAP</bdi>.',
        subsections: [
          {
            title: 'الهدف من المشروع',
            content: 'التنبؤ بمخاطر إصابة مرضى العناية المركزة بالهذيان (ICU Delirium) باستخدام بيانات سريرية واقعية مستخرجة من قاعدة بيانات MIMIC-IV الطبية، مع التركيز على الاكتشاف المبكر للمرضى المعرضين لمخاطر عالية.'
          },
          {
            title: 'تجهيز ومعالجة البيانات',
            content: 'إجراء التحليل الاستكشافي للبيانات وهندسة الخصائص السريرية باستخدام Python وPandas وNumPy. شملت المعالجة استبعاد السجلات شديدة النقص (dropna)، والتعويض بالصفر (fillna(0)) عند ثبوت دلالتها السريرية، واستخدام المتوسط الحسابي داخل طيات التحقق (fold-wise mean imputation) لمنع تسرب البيانات. كما تمت معايرة المتغيرات المستمرة بواسطة MinMaxScaler ومعالجة عدم توازن الفئات عبر تقنيات تقليص العينة العشوائي المنضبط (random undersampling).'
          },
          {
            title: 'النماذج والتقييم',
            content: 'بناء ومقارنة أداء عدة خوارزميات تعلم آلة تشمل XGBoost، والغابات العشوائية (Random Forest)، والانحدار اللوجستي (Logistic Regression)، والشبكات العصبية العميقة (DNN). تم تقييم النماذج باستخدام التحقق المتقاطع خماسي الطيات (5-Fold Cross-Validation) واختبارات التقسيم الزمني بنسبة 80/20، واعتمد معيار ROC-AUC لقياس كفاءة التمييز والتصنيف.'
          },
          {
            title: 'قابلية التفسير (Explainability)',
            content: 'استخدام مكتبة SHAP لتفسير قرارات النماذج وتقديم رؤية واضحة وموثوقة لعوامل الخطر المؤثرة سريرياً. أظهرت النتائج أن مدة الإقامة بالمستشفى (duration_of_stay)، وعمر المريض (anchor_age)، وطول فترة المكوث في العناية (los) كانت من أبرز العوامل ذات التأثير التنبؤي الأعلى.'
          },
          {
            title: 'التكريم والسياق الأكاديمي',
            content: 'حصد المشروع المركز الخامس في معرض مشاريع تخرج جامعة جازان (2026). هذا العمل تم إنجازه كمشروع بحثي أكاديمي لنيل درجة البكالوريوس، ولا يُعد أداة تشخيص سريرية معتمدة أو مطبقة طبياً في المستشفيات.'
          }
        ]
      }
    },

    'car-rental': {
      id: 'car-rental',
      technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
      links: {
        github: 'https://github.com/STRiDER047/car-rental-web-project',
        liveDemo: 'https://strider047.github.io/car-rental-web-project/'
      },
      en: {
        title: 'Car Rental Single-Page Application',
        eyebrow: 'ACADEMIC TEAM PROJECT // SPA',
        meta: 'Front-End Development • Academic Project (Jazan University)',
        summary: 'A client-side car rental application featuring an interactive vehicle catalog, booking flow, and dynamic invoice generation.',
        subsections: [
          {
            title: 'Overview & Collaboration',
            content: 'A responsive client-side Single-Page Application (SPA) designed and developed as a collaborative academic project for the Web Programming course at Jazan University, featuring Faris Yahya Ghazwani on the core development team.'
          },
          {
            title: 'Front-End Architecture',
            content: 'Engineered using pure Vanilla JavaScript (ES6+), HTML5 semantic layout, and modern CSS3 with zero third-party framework dependencies. Built a custom client-side hash router (switchView) coordinating URL hashes with active view containers across 5 views (#view-home, #view-fleet, #view-about, #view-rental, #view-invoice).'
          },
          {
            title: 'State Management & Dynamic Invoicing',
            content: 'Implemented client-side session persistence and booking transaction records utilizing browser localStorage. Includes structured catalog mock data for vehicle specifications and pricing, dynamic input validation on rental duration (rentDays), and an automated invoice renderer that dynamically calculates total costs and triggers native browser printing via window.print().'
          }
        ]
      },
      ar: {
        title: 'تطبيق تأجير السيارات (Single-Page Application)',
        eyebrow: 'مشروع أكاديمي جماعي // تطبيق صفحة واحدة',
        meta: 'تطوير الواجهات الأمامية • مشروع أكاديمي (جامعة جازان)',
        summary: 'تطبيق ويب من جانب العميل لتأجير السيارات يتضمن دليلاً تفاعلياً للمركبات، ومسار حجز متكامل، وتوليد فواتير ديناميكية قابلة للطباعة.',
        subsections: [
          {
            title: 'نظرة عامة والعمل الجماعي',
            content: 'تطبيق صفحة واحدة (SPA) متجاوب من جانب العميل، تم تصميمه وتطويره كمشروع أكاديمي جماعي لمقرر برمجة الويب بجامعة جازان، وشارك في تطويره البرمجي فارس يحيى غزواني ضمن فريق العمل الطلابي.'
          },
          {
            title: 'البنية البرمجية للواجهة',
            content: 'تم بناء التطبيق بالكامل باستخدام جافاسكربت النقية (Vanilla JS ES6+)، وهيكلية HTML5 الدلالية، وتنسيقات CSS3 المتقدمة دون أي اعتماد على أطر عمل خارجية. يتضمن التطبيق موجه مسارات داخلي يعتمد على Hash (switchView) للتبديل السلس بين 5 شاشات تفاعلية (الرئيسية، الأسطول، نبذة عنا، الحجز، والفاتورة).'
          },
          {
            title: 'إدارة الحالة وتوليد الفواتير',
            content: 'إدارة حالة التطبيق محلياً وتخزين جلسات المستخدمين وسجلات الحجز عبر <bdi dir="ltr">localStorage</bdi> في المتصفح. يشمل ذلك كتالوج بيانات محلي لمواصفات وأسعار المركبات، وتحققاً تفاعلياً من صحة مدخلات فترة الإيجار (<bdi dir="ltr">rentDays</bdi>)، وتوليداً برمجياً ديناميكياً للفاتورة مع إمكانية الطباعة المباشرة عبر <bdi dir="ltr">window.print()</bdi>.'
          }
        ]
      }
    },

    'al-bir': {
      id: 'al-bir',
      technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'GitHub Pages'],
      links: {
        github: 'https://github.com/STRiDER047/ber',
        liveDemo: 'https://strider047.github.io/ber'
      },
      en: {
        title: 'Al-Bir Charity Association Web Interface',
        eyebrow: 'COOPERATIVE TRAINING // PROTOTYPE',
        meta: '2025 • Cooperative Training (Al-Eidabi, Saudi Arabia)',
        summary: 'An Arabic-first (RTL) front-end prototype developed during cooperative training to showcase the association’s programs, featuring responsive layouts, dark/light theme support, and interactive navigation.',
        subsections: [
          {
            title: 'Overview & Institutional Context',
            content: 'Developed during cooperative training (June 2025) at Al-Bir Charity Association in Al-Eidabi, Jazan Region, Saudi Arabia. Created as an applied training prototype to demonstrate modern front-end user experience concepts for institutional charity portals.'
          },
          {
            title: 'Scope & Technical Implementation',
            content: 'Built with an Arabic-first Right-to-Left (RTL) layout architecture using HTML5 and Tailwind CSS. The interface features a persistent dark/light theme toggle saved to localStorage, an accessible mobile drawer navigation with ARIA state tracking, an RTL-aware touch/click programs carousel slider with dynamic scroll calculations, and an accessible legal disclaimer modal dialog with backdrop dismiss and Escape key support.'
          },
          {
            title: 'Technical Scope & Compliance',
            content: 'Deployed and hosted publicly via GitHub Pages. Per the official project disclaimer, this interface was built strictly as a front-end training prototype and user interface concept; it does not process financial donations or connect to live payment gateways.'
          }
        ]
      },
      ar: {
        title: 'واجهة موقع جمعية البر الخيرية',
        eyebrow: 'تدريب تعاوني // نموذج واجهة أمامية',
        meta: '2025 • تدريب تعاوني (العيدابي، المملكة العربية السعودية)',
        summary: 'نموذج أولي لواجهة ويب عربية (<bdi dir="ltr">RTL</bdi>) طُوّر خلال التدريب التعاوني لعرض معلومات وبرامج الجمعية، مع تصميم متجاوب ودعم للوضعين الداكن والفاتح.',
        subsections: [
          {
            title: 'نظرة عامة وسياق التدريب',
            content: 'تم تطوير الواجهة خلال فترة التدريب التعاوني الميداني (يونيو 2025) لدى جمعية البر الخيرية بمحافظة العيدابي بمنطقة جازان، كنموذج تدريبي وتطبيقي لإعادة تصميم واجهة المستخدم وتقديم محتوى الجمعية بأسلوب رقمي حديث.'
          },
          {
            title: 'نطاق العمل والتنفيذ البرمجي',
            content: 'بُنيت الواجهة بالكامل بأسلوب الاتجاه من اليمين لليسار (RTL) للغة العربية باستخدام HTML5 وTailwind CSS. وتتضمن الواجهة تبديلاً للوضع الليلي والنهاري محفوظاً في localStorage، وقائمة جوال منبثقة متوافقة مع معايير الوصول (ARIA)، وسلايدر برامج ومشاريع تفاعلي يدعم التمرير المتوافق مع RTL، ونافذة حوارية منبثقة للإخلاء القانوني تدعم الإغلاق بمفتاح Escape والنقر الخارجي.'
          },
          {
            title: 'الحدود التقنية والمصداقية',
            content: 'تم نشر النموذج عبر GitHub Pages. وتأكيداً للشفافية وتماشياً مع إخلاء المسؤولية القانوني بالموقع، فإن هذا العمل هو مشروع تدريبي تطبيقي لواجهة المستخدم فقط ولا يجمع أو يعالج أي تبرعات مالية فعلية.'
          }
        ]
      }
    }
  };

  const skills = [
    {
      key: 'skills.cat1', icon: 'network',
      items: [
        { label: 'Python' }, { label: 'Pandas' }, { label: 'NumPy' }, { label: 'Scikit-learn' },
        { label: 'XGBoost' }, { label: 'SHAP' }
      ]
    },
    {
      key: 'skills.cat2', icon: 'browser',
      items: [
        { label: 'HTML5' }, { label: 'CSS3' }, { label: 'JavaScript' }
      ]
    },
    {
      key: 'skills.cat3', icon: 'tools',
      items: [
        { label: 'Git' }, { label: 'GitHub' }, { label: 'GitHub Pages' },
        { label: 'Jupyter Notebook' }, { label: 'VS Code' }, { label: 'Prompt Engineering' }
      ]
    }
  ];

  const contact = {
    email: 'faris.gh29@gmail.com',
    phone: '+966570051298',
    linkedin: { url: 'https://linkedin.com/in/faris-ghazwani', handle: 'faris-ghazwani' },
    github: { url: 'https://github.com/STRIDER047', handle: 'STRIDER047' },
    resume: './assets/Faris_Ghazwani_CV.pdf'
  };

  // Export Data Namespace
  const PORTFOLIO_DATA = {
    ui,
    projects,
    skills,
    contact,
    getText: function (key, lang = 'en') {
      const activeLang = lang === 'ar' ? 'ar' : 'en';
      if (ui[activeLang] && ui[activeLang][key] !== undefined) {
        return ui[activeLang][key];
      }
      return ui.en[key] || '';
    },
    getProject: function (id, lang = 'en') {
      const project = projects[id];
      if (!project) return null;
      const activeLang = lang === 'ar' ? 'ar' : 'en';
      return {
        id: project.id,
        technologies: project.technologies,
        links: project.links,
        ...project[activeLang]
      };
    }
  };

  if (typeof window !== 'undefined') {
    window.PORTFOLIO_DATA = PORTFOLIO_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_DATA;
  }
})();

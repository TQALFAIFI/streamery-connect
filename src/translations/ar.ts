
const translations = {
  // Common
  "app.name": "بث RTMP",
  "app.tagline": "بث كالمحترفين",
  "app.slogan": "بث RTMP احترافي بطريقة بسيطة",
  "app.description": "أسهل طريقة لبث محتواك على أي منصة. ابدأ البث في دقائق مع خدمة RTMP الموثوقة ذات التأخير المنخفض.",
  
  // Navigation
  "nav.home": "الرئيسية",
  "nav.dashboard": "لوحة التحكم",
  "nav.settings": "الإعدادات",
  "nav.get-started": "ابدأ الآن",
  "nav.learn-more": "تعرف على المزيد",
  "nav.sign-out": "تسجيل الخروج",
  "nav.profile": "الملف الشخصي",
  
  // Home Page
  "home.features.title": "ميزات قوية",
  "home.features.subtitle": "كل ما تحتاجه للبث الاحترافي في منصة واحدة",
  "home.feature1.title": "بث RTMP",
  "home.feature1.description": "قم بالبث مباشرة إلى خوادمنا باستخدام بروتوكول RTMP القياسي في الصناعة.",
  "home.feature2.title": "تأخير منخفض",
  "home.feature2.description": "استمتع بتأخير ضئيل مع بنية البث المحسنة لدينا.",
  "home.feature3.title": "مخرجات متعددة",
  "home.feature3.description": "بث إلى منصات متعددة في وقت واحد دون حاجة إلى نطاق ترددي إضافي.",
  "home.feature4.title": "بث آمن",
  "home.feature4.description": "محتواك محمي بأمان وتشفير على مستوى المؤسسات.",
  "home.cta.title": "جاهز لبدء البث؟",
  "home.cta.description": "انضم إلى آلاف من صانعي المحتوى الذين يثقون في منصتنا للبث الموثوق عالي الجودة.",
  "home.cta.button": "ابدأ الآن",
  "home.footer.rights": "جميع الحقوق محفوظة.",
  
  // Profile
  "profile.title": "الملف الشخصي",
  "profile.account": "إعدادات الحساب",
  "profile.info": "معلومات الملف الشخصي",
  "profile.email": "البريد الإلكتروني",
  "profile.username": "اسم المستخدم",
  "profile.type": "نوع الحساب",
  "profile.streaming": "معلومات البث",
  "profile.streaming.desc": "إدارة إعدادات وتفضيلات البث من لوحة التحكم الخاصة بك.",
  "profile.goto.dashboard": "الذهاب إلى لوحة التحكم",
  "profile.goto.settings": "إعدادات الحساب",
  
  // Dashboard
  "dashboard.title": "لوحة تحكم البث",
  "dashboard.tabs.stream": "البث",
  "dashboard.tabs.analytics": "التحليلات",
  "dashboard.tabs.destinations": "الوجهات",
  "dashboard.rtmp.title": "عنوان URL لخادم RTMP",
  "dashboard.rtmp.description": "استخدم عنوان URL هذا في برنامج البث الخاص بك مع مفتاح البث.",
  "dashboard.software.title": "برامج البث",
  "dashboard.guide": "دليل",
  "dashboard.howto": "كيفية الاستخدام",
  "dashboard.analytics.soon": "التحليلات قريبًا",
  "dashboard.analytics.description": "إحصاءات المشاهدين، ومقاييس صحة البث، والتحليلات التفصيلية ستكون متاحة في تحديث قادم.",
  "dashboard.destinations.title": "وجهات البث",
  "dashboard.destinations.intro": "أضف وجهات البث للبث على منصات متعددة في وقت واحد.",
  "dashboard.destinations.add": "إضافة وجهة",
  "dashboard.destinations.name": "اسم الوجهة",
  "dashboard.destinations.platform": "المنصة",
  "dashboard.destinations.url": "عنوان RTMP",
  "dashboard.destinations.streamKey": "مفتاح البث",
  "dashboard.destinations.added": "تمت إضافة وجهة البث بنجاح",
  "dashboard.destinations.removed": "تمت إزالة وجهة البث",
  "dashboard.destinations.copied": "تم نسخ عنوان URL إلى الحافظة",
  "dashboard.destinations.keyCopied": "تم نسخ مفتاح البث إلى الحافظة",
  "dashboard.destinations.empty": "لم تتم إضافة أي وجهات بعد. أضف وجهة البث الأولى أعلاه.",
  "dashboard.destinations.help.title": "إعداد وجهات البث",
  "dashboard.destinations.help.description": "لإعداد وجهة بث، ستحتاج إلى عنوان RTMP ومفتاح البث من منصة البث الخاصة بك.",
  
  // OBS Guide
  "obs.guide.title": "كيفية البث باستخدام OBS Studio",
  "obs.guide.step1.title": "1. تنزيل وتثبيت OBS Studio",
  "obs.guide.step1.desc": "قم بتنزيل وتثبيت أحدث إصدار من OBS Studio من الموقع الرسمي: ",
  "obs.guide.step2.title": "2. إعداد مصادر البث",
  "obs.guide.step2.desc": "قم بإضافة مصادر البث مثل التقاط الشاشة أو كاميرا الويب:",
  "obs.guide.step2.sub1": "انقر على زر '+' في قسم المصادر",
  "obs.guide.step2.sub2": "اختر نوع المصدر (مثل 'التقاط الشاشة' أو 'جهاز التقاط الفيديو')",
  "obs.guide.step2.sub3": "قم بتكوين الإعدادات حسب الحاجة",
  "obs.guide.step3.title": "3. تكوين إعدادات البث",
  "obs.guide.step3.sub1": "انتقل إلى 'الإعدادات' → 'البث'",
  "obs.guide.step3.sub2": "اختر 'خدمة مخصصة' كنوع الخدمة",
  "obs.guide.step3.sub3": "في حقل 'الخادم'، أدخل: rtmp://ingest.rtmpstream.io/live",
  "obs.guide.step3.sub4": "في حقل 'مفتاح البث'، انسخ مفتاح البث من لوحة التحكم أعلاه",
  "obs.guide.step3.sub5": "انقر على 'موافق' لحفظ الإعدادات",
  "obs.guide.step4.title": "4. تكوين إعدادات الإخراج",
  "obs.guide.step4.sub1": "انتقل إلى 'الإعدادات' → 'الإخراج'",
  "obs.guide.step4.sub1.1": "اختر وضع الإخراج: 'متقدم' للتحكم الكامل",
  "obs.guide.step4.sub1.2": "اختر برنامج الترميز: 'x264' (ترميز برمجي) أو 'NVENC' (لبطاقات NVIDIA) أو 'AMF' (لبطاقات AMD)",
  "obs.guide.step4.sub1.3": "معدل البت: 3000-6000 Kbps للبث 720p، أو 6000-8000 Kbps للبث 1080p",
  "obs.guide.step4.sub2": "انتقل إلى 'الإعدادات' → 'الفيديو'",
  "obs.guide.step4.sub2.1": "دقة الإخراج: 1280x720 (720p) أو 1920x1080 (1080p)",
  "obs.guide.step4.sub2.2": "معدل الإطارات: 30 أو 60 fps (حسب سرعة الإنترنت لديك)",
  "obs.guide.step5.title": "5. بدء البث",
  "obs.guide.step5.desc": "بعد تكوين كل الإعدادات:",
  "obs.guide.step5.sub1": "انقر على زر 'بدء البث' في الزاوية اليمنى السفلية",
  "obs.guide.step5.sub2": "تحقق من حالة البث في لوحة التحكم لدينا",
  "obs.guide.step5.sub3": "إذا واجهت مشاكل، تحقق من إعدادات جدار الحماية وتأكد من أن الوصول الصادر مسموح به",
  "obs.guide.tips.title": "نصائح للبث",
  "obs.guide.tips.1": "قم بإجراء بث تجريبي قبل البث الرسمي للتأكد من أن كل شيء يعمل بشكل صحيح",
  "obs.guide.tips.2": "إذا كان لديك اتصال إنترنت بطيء، قلل من دقة البث ومعدل البت",
  "obs.guide.tips.3": "تأكد من عدم تجاوز 80% من استخدام وحدة المعالجة المركزية أثناء البث",
  "obs.guide.tips.4": "استخدم شاشتين إن أمكن: واحدة للبث والأخرى للتحكم",
  
  // Stream Test
  "streamTest.title": "اختبار البث",
  "streamTest.connection": "الاتصال",
  "streamTest.bandwidth": "عرض النطاق الترددي",
  "streamTest.quality": "جودة البث",
  "streamTest.latency": "زمن الاستجابة",
  "streamTest.startTest": "بدء اختبار البث",
  "streamTest.testing": "جارٍ الاختبار...",
  "streamTest.connected": "متصل",
  "streamTest.failed": "فشل",
  "streamTest.qualityLow": "منخفضة (480p)",
  "streamTest.qualityMedium": "متوسطة (720p)",
  "streamTest.qualityHigh": "عالية (1080p)",
  "streamTest.success": "بيئة البث جاهزة!",
  "streamTest.warning": "قد تواجه بعض المشاكل في اتصالك أثناء البث.",
  "streamTest.recommendationGood": "بيئة البث مناسبة. يمكنك بدء البث.",
  "streamTest.recommendationPoor": "قد تواجه مشاكل في الاتصال. فكر في خفض جودة البث.",
  "streamTest.started": "بدأ اختبار البث...",
  
  // Language
  "language.select": "اللغة",
  "language.en": "English",
  "language.ar": "العربية",
  
  // Not Found
  "notfound.message": "عفواً! الصفحة غير موجودة",
  "notfound.return": "العودة إلى الصفحة الرئيسية",
  
  // Authentication
  "auth.signIn": "تسجيل الدخول",
  "auth.signUp": "تسجيل جديد",
  "auth.welcomeBack": "تسجيل الدخول أو التسجيل في الموقع",
  "auth.noAccount": "تسجيل في الموقع",
  "auth.backToHome": "العودة إلى الرئيسية",
  "auth.haveAccount": "تسجيل الدخول",
  "auth.username": "اسم المستخدم",
  "auth.createAccount": "إنشاء حساب البث الخاص بك"
};

export default translations;

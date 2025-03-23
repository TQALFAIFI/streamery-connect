
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

const OBSGuide = () => {
  const { t } = useLanguage();

  return (
    <GlassCard id="obs-guide" className="w-full">
      <h3 className="font-medium text-lg mb-4">{t('obs.guide.title') || 'كيفية البث باستخدام OBS Studio'}</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-2">{t('obs.guide.step1.title') || '1. تنزيل وتثبيت OBS Studio'}</h4>
          <p className="text-sm text-muted-foreground">
            {t('obs.guide.step1.desc') || 'قم بتنزيل وتثبيت أحدث إصدار من OBS Studio من الموقع الرسمي: '}
            <a href="https://obsproject.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">obsproject.com</a>
          </p>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">{t('obs.guide.step2.title') || '2. إعداد مصادر البث'}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {t('obs.guide.step2.desc') || 'قم بإضافة مصادر البث مثل التقاط الشاشة أو كاميرا الويب:'}
          </p>
          <ol className="list-decimal list-inside text-sm text-muted-foreground pl-2 space-y-1">
            <li>{t('obs.guide.step2.sub1') || 'انقر على زر "+" في قسم المصادر'}</li>
            <li>{t('obs.guide.step2.sub2') || 'اختر نوع المصدر (مثل "التقاط الشاشة" أو "جهاز التقاط الفيديو")'}</li>
            <li>{t('obs.guide.step2.sub3') || 'قم بتكوين الإعدادات حسب الحاجة'}</li>
          </ol>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">{t('obs.guide.step3.title') || '3. تكوين إعدادات البث'}</h4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground pl-2 space-y-1">
            <li>{t('obs.guide.step3.sub1') || 'انتقل إلى "الإعدادات" → "البث"'}</li>
            <li>{t('obs.guide.step3.sub2') || 'اختر "خدمة مخصصة" كنوع الخدمة'}</li>
            <li>{t('obs.guide.step3.sub3') || 'في حقل "الخادم"، أدخل: '} <code className="bg-background/50 px-1 py-0.5 rounded text-xs">rtmp://ingest.rtmpstream.io/live</code></li>
            <li>{t('obs.guide.step3.sub4') || 'في حقل "مفتاح البث"، انسخ مفتاح البث من لوحة التحكم أعلاه'}</li>
            <li>{t('obs.guide.step3.sub5') || 'انقر على "موافق" لحفظ الإعدادات'}</li>
          </ol>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">{t('obs.guide.step4.title') || '4. تكوين إعدادات الإخراج'}</h4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground pl-2 space-y-2">
            <li>
              {t('obs.guide.step4.sub1') || 'انتقل إلى "الإعدادات" → "الإخراج"'}
              <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
                <li>{t('obs.guide.step4.sub1.1') || 'اختر وضع الإخراج: "متقدم" للتحكم الكامل'}</li>
                <li>{t('obs.guide.step4.sub1.2') || 'اختر برنامج الترميز: "x264" (ترميز برمجي) أو "NVENC" (لبطاقات NVIDIA) أو "AMF" (لبطاقات AMD)'}</li>
                <li>{t('obs.guide.step4.sub1.3') || 'معدل البت: 3000-6000 Kbps للبث 720p، أو 6000-8000 Kbps للبث 1080p'}</li>
              </ul>
            </li>
            <li className="mt-2">
              {t('obs.guide.step4.sub2') || 'انتقل إلى "الإعدادات" → "الفيديو"'}
              <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
                <li>{t('obs.guide.step4.sub2.1') || 'دقة الإخراج: 1280x720 (720p) أو 1920x1080 (1080p)'}</li>
                <li>{t('obs.guide.step4.sub2.2') || 'معدل الإطارات: 30 أو 60 fps (حسب سرعة الإنترنت لديك)'}</li>
              </ul>
            </li>
          </ol>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">{t('obs.guide.step5.title') || '5. بدء البث'}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {t('obs.guide.step5.desc') || 'بعد تكوين كل الإعدادات:'}
          </p>
          <ol className="list-decimal list-inside text-sm text-muted-foreground pl-2 space-y-1">
            <li>{t('obs.guide.step5.sub1') || 'انقر على زر "بدء البث" في الزاوية اليمنى السفلية'}</li>
            <li>{t('obs.guide.step5.sub2') || 'تحقق من حالة البث في لوحة التحكم لدينا'}</li>
            <li>{t('obs.guide.step5.sub3') || 'إذا واجهت مشاكل، تحقق من إعدادات جدار الحماية وتأكد من أن الوصول الصادر مسموح به'}</li>
          </ol>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-4 mt-4">
          <h4 className="text-md font-medium mb-2 text-blue-500">{t('obs.guide.tips.title') || 'نصائح للبث'}</h4>
          <ul className="list-disc list-inside text-sm pl-2 space-y-1">
            <li>{t('obs.guide.tips.1') || 'قم بإجراء بث تجريبي قبل البث الرسمي للتأكد من أن كل شيء يعمل بشكل صحيح'}</li>
            <li>{t('obs.guide.tips.2') || 'إذا كان لديك اتصال إنترنت بطيء، قلل من دقة البث ومعدل البت'}</li>
            <li>{t('obs.guide.tips.3') || 'تأكد من عدم تجاوز 80% من استخدام وحدة المعالجة المركزية أثناء البث'}</li>
            <li>{t('obs.guide.tips.4') || 'استخدم شاشتين إن أمكن: واحدة للبث والأخرى للتحكم'}</li>
          </ul>
        </div>
      </div>
    </GlassCard>
  );
};

export default OBSGuide;

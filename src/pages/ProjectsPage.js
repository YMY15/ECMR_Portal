import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const projects = [
  {
    id: 'iron',
    titleEn: 'Iron Oxide',
    titleAr: 'أكسيد الحديد',
    date: 'Jan 2017 - Present',
    locationsEn: ['Her El Koffa (Wadi Allaki)', 'Abu Sebira (Aswan)'],
    locationsAr: ['حير القفة (وادي العلاقي)', 'أبو صبيرة (أسوان)'],
    detailsEn: [
      'Concentration: From 55% to 75%',
      'Production: Average 250 thousand ton per year',
      'Use: Cement, Iron and Paints',
      'Nearest Port: Safaga',
    ],
    detailsAr: [
      'التركيز: من %55 الي %75',
      'الإنتاج: متوسط 250 ألف طن سنوياً',
      'الاستخدام: الأسمنت، الحديد والدهانات',
      'أقرب ميناء: سفاجا',
    ],
  },
  {
    id: 'manganese',
    titleEn: 'Manganese Oxide',
    titleAr: 'أكسيد المنجنيز',
    date: 'Jan 2017 - Present',
    locationsEn: ['Abo Shaar (Hurghada)'],
    locationsAr: ['أبوشعر (الغردقة)'],
    detailsEn: [
      'Concentration: 35%',
      'Production: Minimum 12 thousand ton per year',
      'Use: Steel, Glass, Coins and Alloys',
      'Nearest Port: Safaga',
    ],
    detailsAr: [
      'التركيز: %35',
      'الإنتاج: حد أدنى 12 ألف طن سنوياً',
      'الاستخدام: الصلب، الزجاج، العملات المعدنية والسبائك',
      'أقرب ميناء: سفاجا',
    ],
  },
  {
    id: 'quartz',
    titleEn: 'Quartz',
    titleAr: 'الكوارتز',
    date: 'Jan 2017 - Present',
    locationsEn: ['Attalah (Al-Qusier)'],
    locationsAr: ['عطا الله (القصير)'],
    detailsEn: [
      'Production: Minimum 24 thousand ton per year',
      'Use: Glass Containers, Lenses, Photo-voltaic cells',
      'Nearest Port: Safaga',
      'Expansion: New sites south of Marsa Alam',
    ],
    detailsAr: [
      'الإنتاج: حد أدنى 24 ألف طن سنوياً',
      'الاستخدام: الحاويات الزجاجية، العدسات، الخلايا الضوئية',
      'أقرب ميناء: سفاجا',
      'التوسع: مناطق جديدة جنوب مرسى علم',
    ],
  },
  {
    id: 'talc',
    titleEn: 'Talc',
    titleAr: 'التلك',
    date: 'Jan 2017 - Present',
    locationsEn: ['Rod Kharouf (Aswan)'],
    locationsAr: ['روض خروف (أسوان)'],
    detailsEn: [
      'Production: Minimum 3 thousand ton per year',
      'Use: Paper, Plastics, Cosmetics, Cables, Paint, Ceramics, Powder',
      'Nearest Port: Safaga',
    ],
    detailsAr: [
      'الإنتاج: حد أدنى 3 آلاف طن سنوياً',
      'الاستخدام: الورق، البلاستيك، مستحضرات التجميل، الكابلات الكهربائية، الدهان، السيراميك، بودرة الأطفال',
      'أقرب ميناء: سفاجا',
    ],
  },
  {
    id: 'phosphate',
    titleEn: 'Phosphate',
    titleAr: 'الفوسفات',
    date: 'Jan 2003 - Present',
    locationsEn: ['Wadi El-Shaghab (Edfo)', 'Al-Sebaeya (Edfo)'],
    locationsAr: ['وادي الشغب (إدفو)', 'السباعية (إدفو)'],
    detailsEn: [
      'Concentration: From 24% to 32% P2O5',
      'Production: Average 1 million ton per year',
      'Use: Detergents, Fertilizers, Phosphoric Acid',
      'Nearest Port: Safaga',
    ],
    detailsAr: [
      'التركيز: من %24 الي %32 P2O5',
      'الإنتاج: متوسط 1 مليون طن سنوياً',
      'الاستخدام: المنظفات الصناعية، الأسمدة، حامض الفوسفوريك',
      'أقرب ميناء: سفاجا',
    ],
  },
  // Add Next Projects with IDs as well
  { id: 'lead', titleEn: 'Lead & Zinc', titleAr: 'الرصاص و الزنك', date: 'Next Project', locationsEn: ['Um Gij'], locationsAr: ['أم غيج'], detailsEn: ['Use: Galvanizing Iron, Car Batteries'], detailsAr: ['الاستخدام: جلفنة الحديد، بطاريات السيارات'] },
  { id: 'copper', titleEn: 'Copper', titleAr: 'النحاس', date: 'Next Project', locationsEn: ['Sadd'], locationsAr: ['سد'], detailsEn: ['Use: Electrical Wires'], detailsAr: ['الاستخدام: الأسلاك الكهربائية'] },
  { id: 'feldspar', titleEn: 'Feldspar', titleAr: 'فلسبار', date: 'Next Project', locationsEn: ['South Marsa Alam'], locationsAr: ['جنوب مرسي علم'], detailsEn: ['Use: Ceramics'], detailsAr: ['الاستخدام: السيراميك'] },
  { id: 'limestone', titleEn: 'Limestone', titleAr: 'الحجر الجيري', date: 'Next Project', locationsEn: ['Minya'], locationsAr: ['المنيا'], detailsEn: ['Use: Chemicals, Medicine, Paints'], detailsAr: ['الاستخدام: الكيماويات، الأدوية، الدهانات'] },
  { id: 'nepheline', titleEn: 'Nepheline Syenite', titleAr: 'نيفلين سينيت', date: 'Next Project', locationsEn: ['Abu Khruq'], locationsAr: ['أبو خروء'], detailsEn: ['Use: Glass, Ceramics'], detailsAr: ['الاستخدام: زجاج وخزف'] },
  { id: 'silica', titleEn: 'Silica Sand', titleAr: 'الرمال البيضاء', date: 'Next Project', locationsEn: ['Zaafarana'], locationsAr: ['الزعفرانة'], detailsEn: ['Use: Glassware, Fiberglass, Crystal, Optical Glass, Panels'], detailsAr: ['الاستخدام: الأواني الزجاجية، الألياف الزجاجية، زجاج الكريستال، زجاج البصريات، الألواح الزجاجية'] },
];

const ProjectsPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="py-16 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">
        {isArabic ? 'مشاريع الشركة' : 'Company Projects'}
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            id={proj.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              {isArabic ? proj.titleAr : proj.titleEn}
            </h2>
            <p className="text-gray-500 mb-2">{proj.date}</p>
            <ul className="mb-2 list-disc pl-5">
              {(isArabic ? proj.locationsAr : proj.locationsEn).map((loc, i) => (
                <li key={i} className="text-gray-700">{loc}</li>
              ))}
            </ul>
            <ul className="list-disc pl-5">
              {(isArabic ? proj.detailsAr : proj.detailsEn).map((d, i) => (
                <li key={i} className="text-gray-700">{d}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;

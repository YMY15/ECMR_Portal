import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const heroImage =
  '/images/Background.jpg';

const AboutPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl p-8 bg-white bg-opacity-90 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-yellow-600">
          {lang === "ar"
            ? "عن الشركة المصرية للثروات التعدينية"
            : "About Egyptian Company for Mineral Resources"}
        </h1>

        {/* Company Details */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {lang === "ar" ? "تفاصيل عن الشركة" : "Company Details"}
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">
            {lang === "ar"
              ? "تأسست الشركة المصرية للثروات التعدينية في مايو 2003 بهدف استكشاف واستغلال وإنتاج وتسويق الخامات في جمهورية مصر العربية داخلياً وخارجياً..."
              : "Egyptian Company for Mineral Resources (ECMR) was established in May 2003 with the aim of exploring, exploiting, producing, and marketing mineral ores inside and outside Egypt..."}
          </p>
        </motion.section>

        {/* Activities */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {lang === "ar" ? "نشاط الشركة" : "Company Activities"}
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2 leading-relaxed">
            {lang === "ar" ? (
              <>
                <li>الترويج لاستثمارات الثروة التعدينية داخلياً وخارجياً.</li>
                <li>إنتاج وتصنيع وتسويق وبيع وتصدير الخامات التعدينية.</li>
                <li>المساهمة في إنشاء شركات مشتركة.</li>
                <li>إعداد دراسات الجدوى للمشروعات الاستشارية.</li>
                <li>تنفيذ أعمال البحث عن الخامات التعدينية.</li>
                <li>إجراء البرامج التدريبية وتقديم الدعم الفني.</li>
              </>
            ) : (
              <>
                <li>Promoting mining investments locally and internationally.</li>
                <li>Producing, processing, marketing, and exporting minerals.</li>
                <li>Participating in establishing joint ventures.</li>
                <li>Preparing feasibility studies for projects.</li>
                <li>Conducting exploration of mineral resources.</li>
                <li>Providing training programs and technical support.</li>
              </>
            )}
          </ul>
        </motion.section>

        {/* Production & Export */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {lang === "ar" ? "الإنتاج والتصدير" : "Production & Export"}
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">
            {lang === "ar"
              ? "تنتج الشركة نحو ٥٠ ألف طن فوسفات شهرياً و٢٠ ألف طن منجنيز بالإضافة لـ٥٠ ألف طن حديد، كما تنتج خامات أخرى مثل الكوارتز والفلسبار والتلك، وتصدر معظم منتجاتها للأسواق العالمية."
              : "The company produces around 50,000 tons of phosphate and 20,000 tons of manganese monthly, along with 50,000 tons of iron. It also produces other minerals such as quartz, feldspar, and talc, exporting most of its products worldwide."}
          </p>
        </motion.section>

        {/* Staff */}
        <motion.section
          className="mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {lang === "ar" ? "الكادر الفني" : "Staff"}
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">
            {lang === "ar"
              ? "يرأس الشركة حالياً الجيولوجي هاني السيد مصطفى... وتضم الشركة نحو 150 موظفاً من تخصصات مختلفة تشمل الجيولوجيا، هندسة المناجم، المحاسبة والإدارة."
              : "The company is currently headed by geologist Hany El-Sayed Mostafa... ECMR has around 150 employees specializing in geology, mining engineering, accounting, and administration."}
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AboutPage;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const services = [
  {
    key: "investment",
    ar: "الاستثمار والترويج",
    en: "Investment & Promotion",
    img: '/images/promom.png',
    descAr: "الترويج للاستثمارات التعدينية داخليًا وخارجيًا.",
    descEn: "Promoting mining investments locally and internationally.",
  },
  {
    key: "production",
    ar: "الفرص استثمارية",
    en: "Production Investment",
    img: "https://static.srpcdigital.com/styles/1037xauto/public/2025-01/926240.jpeg.webp",
    descAr: "إنتاج وتصنيع وتسويق وتصدير الخامات التعدينية.",
    descEn: "Producing, processing, marketing, and exporting minerals.",
  },
  {
    key: "partnerships",
    ar: "الشراكات والمساهمات",
    en: "Partnerships & Contributions",
    img: "https://www.climate-service-center.de/imperia/md/images/csc/images/gerics/fittosize__680_0_eeefd9a6e5bcfa7dc1cac1893b6771bd_fotolia_93091492_l_c_maxsim_cut_2_1.jpg",
    descAr: "المساهمة في إنشاء شركات مشتركة.",
    descEn: "Participating in establishing joint ventures.",
  },
  {
    key: "consulting",
    ar: "الاستشارات والدراسات",
    en: "Consulting & Feasibility Studies",
    img: '/images/consult1.png',
    descAr: "إعداد دراسات جدوى وتقديم استشارات فنية واقتصادية.",
    descEn: "Preparing feasibility studies and providing consultancy.",
  },

  {
    key: "training",
    ar: "التدريب وبناء القدرات",
    en: "Training & Capacity Building",
    img: '/images/b1a.jpg',
    descAr: "تنظيم برامج تدريبية ونقل الخبرات الفنية.",
    descEn: "Organizing training programs and transferring expertise.",
  },
  {
    key: "support",
    ar: "الدعم الفني والخدمات",
    en: "Technical Support & Services",
    img: '/images/consult.png',
    descAr: "تقديم بيانات وخدمات فنية للشركات في مجال التعدين.",
    descEn: "Providing data and technical support for mining companies.",
  },
];

const ServicesPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="min-h-screen relative bg-gray-100 flex flex-col items-center justify-center p-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Background.jpg')",
            
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-yellow-400 drop-shadow-lg">
          {lang === "ar" ? "خدمات الشركة" : "Our Services"}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              {/* Image */}
              <img
                src={service.img}
                alt={lang === "ar" ? service.ar : service.en}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-yellow-600 mb-3 text-center">
                  {lang === "ar" ? service.ar : service.en}
                </h2>
                <p className="text-gray-700 text-sm mb-4">
                  {lang === "ar" ? service.descAr : service.descEn}
                </p>

                {/* Button to future page */}
                <div className="text-center">
                  <Link
                    to={`/services/${service.key}`}
                    className="inline-block px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
                  >
                    {lang === "ar" ? "اقرأ المزيد" : "Explore"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

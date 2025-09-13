import React from "react";
import { useTranslation } from "react-i18next";

const ProductionPage = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Services data
  const services = [
    { 
      nameEn: "Buy Commodity", 
      nameAr: "شراء الخام", 
      link: "/services/production/Commodity", 
      img: "https://www.mining-technology.com/wp-content/uploads/sites/19/2025/06/shutterstock_2206458177-1024x576.jpg" 
    },
    { 
      nameEn: "Production Process", 
      nameAr: "عملية الإنتاج", 
      link: "/services/process", 
      img: "https://www.mining-technology.com/wp-content/uploads/sites/19/2025/06/mining-operations.jpg" 
    },
    { 
      nameEn: "Export Minerals", 
      nameAr: "تصدير المعادن", 
      link: "/services/export", 
      img: "https://www.mining-technology.com/wp-content/uploads/sites/19/2025/06/mining-export.jpg" 
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isArabic ? "الإنتاج" : "Production"}
      </h1>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {services.map((service, idx) => (
          <a 
            key={idx} 
            href={service.link} 
            className="block bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img 
                src={service.img} 
                alt={service.nameEn} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">
                {isArabic ? service.nameAr : service.nameEn}
              </h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductionPage;

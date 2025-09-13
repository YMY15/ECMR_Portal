import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Parallax } from 'react-parallax';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // ✅ Swiper v10 compatible
import 'swiper/css';
import 'swiper/css/navigation';



const heroImage = '/images/project.jpg';

const servicesData = [
  { nameEn: 'Buy Commodity', nameAr: 'شراء الخام', link: '/services/production/Commodity', img:'https://www.mining-technology.com/wp-content/uploads/sites/19/2025/06/shutterstock_2206458177-1024x576.jpg'  },
  { nameEn: 'Apply for Production', nameAr: 'تقديم طلب إنتاج', link: '/services', img: 'https://en.amwalalghad.com/wp-content/uploads/2021/04/mining-industry-review.jpg' },
  { nameEn: 'Projects', nameAr: 'المشاريع', link: '/projects', img: 'http://emra.gov.eg/images/TDI/63a99b28-abc2-4200-9d72-283bf0719a70.jpg' },
];

const projectsData = [
  { nameEn: 'Iron Oxide', nameAr: 'أكسيد الحديد', locationEn: 'Her El Koffa, Abu Sebira', locationAr: 'حير القفة، أبو صبيرة', img: '/images/ironoxide.png' },
  { nameEn: 'Quartz', nameAr: 'الكوارتز', locationEn: 'Attalah (Al-Qusier)', locationAr: 'عطا الله (القصير)', img: '/images/quartz.jpg' },
  { nameEn: 'Phosphate', nameAr: 'الفوسفات', locationEn: 'Wadi El-Shaghab & Al-Sebaeya', locationAr: 'وادي الشغب والسباعية', img: '/images/phosphate.jpg' },
];

const HomePage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="font-sans">

      {/* Parallax Hero Section */}
      <Parallax bgImage={heroImage} strength={400}>
        <div className="h-screen flex items-center justify-center">
          <motion.div
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 ">{isArabic ? '' : ''}</h1>
            <p className="text-xl md:text-2xl font-bold mb-9 text-yellow-500">{isArabic ? 'رائدة في استكشاف واستغلال المعادن في مصر' : 'Leading in mineral exploration and production in Egypt'}</p>
            <Link to="/projects" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition">
              {isArabic ? 'اكتشف مشاريعنا' : 'Explore Our Projects'}
            </Link>
          </motion.div>
        </div>
      </Parallax>

      {/* About Section */}
      <motion.section className="py-16 bg-gray-100 text-center px-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-4xl font-bold mb-6">{isArabic ? 'من نحن' : 'About ECMR'}</h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-12">
          {isArabic
            ? 'الشركة المصرية للثروات التعدينية تعمل في مجال التعدين واستخراج المعادن مثل الحديد، المنجنيز، الكوارتز، التلك والفوسفات منذ عام 2003، ملتزمين بأعلى معايير الجودة والإنتاجية.'
            : 'ECMR operates in mining and extraction of minerals such as Iron, Manganese, Quartz, Talc, and Phosphate since 2003, committed to the highest standards of quality and production.'}
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">{isArabic ? 'سنوات الخبرة' : 'Years of Experience'}</h3>
            <p className="text-gray-700 text-xl"><CountUp end={25} duration={2} />+</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">{isArabic ? 'المناطق' : 'Locations'}</h3>
            <p className="text-gray-700 text-xl"><CountUp end={13} duration={2} /> {isArabic ? 'مواقع رئيسية' : 'Main Sites'}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-2">{isArabic ? 'الإنتاج السنوي' : 'Annual Production'}</h3>
            <p className="text-gray-700 text-xl"><CountUp end={1000000} duration={3} separator="," /> {isArabic ? 'طن' : 'tons'}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">{isArabic ? 'خدماتنا' : 'Our Services'}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {servicesData.map((service, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer">
              <Link to={service.link}>
                <img src={service.img} alt={service.nameEn} className="h-48 w-full object-cover" />
                <div className="p-4 font-bold text-lg">{isArabic ? service.nameAr : service.nameEn}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Carousel */}
      <motion.section className="py-16 bg-gray-100 px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">{isArabic ? 'أبرز المشاريع' : 'Featured Projects'}</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}       // ✅ enable arrows
          modules={[Navigation]}  // ✅ include Navigation module
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projectsData.map((project, idx) => (
            <SwiperSlide key={idx}>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={project.img} alt={project.nameEn} className="h-48 w-full object-cover" />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold mb-2">{isArabic ? project.nameAr : project.nameEn}</h3>
                  <p className="text-gray-700">{isArabic ? project.locationAr : project.locationEn}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/projects" className="mt-6 inline-block px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition">
          {isArabic ? 'المزيد من المشاريع' : 'View All Projects'}
        </Link>
      </motion.section>

      {/* Call to Action */}
      <motion.section className="py-16 text-center px-4">
        <h2 className="text-4xl font-bold mb-4">{isArabic ? 'ابدأ استثمارك معنا' : 'Start Investing with Us'}</h2>
        <p className="text-gray-700 mb-6">{isArabic ? 'تواصل معنا لمعرفة المزيد عن الفرص الاستثمارية المتاحة.' : 'Contact us to learn more about investment opportunities.'}</p>
        <Link to="/contact" className="px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition">{isArabic ? 'تواصل معنا' : 'Contact Us'}</Link>
      </motion.section>

    </div>
  );
};

export default HomePage;

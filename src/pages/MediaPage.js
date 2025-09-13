import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MediaCenterPage.js
 * A dynamic, professional media & blog page for ECMR (bilingual).
 *
 * Put local images / PDFs in public/images/ and public/docs/
 * Example: public/images/ecmr-site-1.jpg
 *
 * NOTE: This page uses sample (mock) content; replace items[] with live content later.
 */

const items = [
  // News / Press / Image / Video posts — bilingual fields
  {
    id: 'n1',
    type: 'news', // news | press | image | video
    date: '2025-08-18',
    titleEn: 'ECMR expands iron oxide production in Aswan',
    titleAr: 'توسعات في إنتاج أكسيد الحديد بأسوان',
    excerptEn:
      'ECMR announced a production capacity increase of iron oxide at the Abu Sebira site — investment and workforce expansion planned.',
    excerptAr:
      'أعلنت الشركة المصرية للثروات التعدينية عن زيادة قدرة إنتاج أكسيد الحديد في موقع أبو صبيرة — خطط للاستثمار وتوسيع القوى العاملة.',
    image: '/images/ecmr-iron-site.jpg', // put a fallback or external url
    contentEn:
      '<p>ECMR has completed phase 1 of the expansion at Abu Sebira (Aswan), increasing concentration processing to 75% for premium material used in cement and paints.</p>',
    contentAr:
      '<p>أنجزت ECMR المرحلة الأولى من التوسع في أبو صبيرة (أسوان)، مما رفع مستوى المعالجة إلى 75٪ لمواد ذات جودة عالية للاستخدام في الأسمنت والدهانات.</p>',
    attachments: [{ url: '/docs/ecmr-press-iron.pdf', labelEn: 'Press Release (PDF)', labelAr: 'البيان الصحفي (PDF)' }],
  },
  {
    id: 'v1',
    type: 'video',
    date: '2025-06-10',
    titleEn: 'ECMR companies receive a high-level Chinese delegation',
    titleAr: 'شركتى شلاتين و المصرية للثروات التعدينية تبحثان مع الوفد الصينى فرص الإستثمار التعدينى ونقل التكنولوجيا فى مجالات التعدين',
    excerptEn: 'ECMR companies receive a high-level Chinese delegation.',
    excerptAr: 'لليوم الثاني على التوالي؛ تستقبل هيئة الثروة المعدنية بمقرها الرئيسي بالعباسية الوفد الصيني رفيع المستوى وذلك في إطار استكمال برنامج الزيارة المتفق عليه بين الجانبين .. حيث قام الوفد بزيارة لشركتي شلاتين للثروة المعدنية والشركة المصرية للثروات التعدينية...',
    image: '/images/849939bb-00d3-469e-a382-822ec0d8e80b.jpeg',
    videoUrl: 'http://emra.gov.eg/UI/Lang1/TDIDataShow.aspx?ID=2217', // example embedable youtube (replace with real)
  },
  {
    id: 'i1',
    type: 'image',
    date: '2025-03-28',
    titleEn: 'General Assembly of the Egyptian Mineral Resources Company (EMRC), to discuss and approve the results of the 2023-2024 fiscal year.',
    titleAr: 'أعمال الجمعية العامة لـ الشركة المصرية للثروات التعدينية، وذلك لمناقشة واعتماد نتائج أعمال العام المالي 2023-2024.',
    excerptEn:
      'Engineer Karim Badawi affirmed the Egyptian staEngineer Karim Badawi affirmed the Egyptian states interest in the mining sector, and that the ministry is workingtes interest in the mining sector...',
    excerptAr:
      'أكد المهندس كريم بدوي، في بيان، اهتمام الدولة المصرية بقطاع التعدين، وهناك عدة محاور عمل تعمل عليها الوزارة لتعزيز الاستثمارات في هذا القطاع الحيوي من خلال تهيئة بيئة جاذبة للمستثمرين.',
      image: '/images/report.jpg',
  },

  {
    id: 'n2',
    type: 'news',
    date: '2025-01-15',
    titleEn: 'Egyptian Mineral Resources Company: Production of 700,000 tons of phosphate annually Represents 90% of the companys income',
    titleAr: 'المصرية للثروات التعدينية: إنتاج 700 ألف طن من الفوسفات سنويا يمثل 90% من دخل الشركة',
    excerptEn:
      'Dr. Amr Hassan Abdel Fattah, Chairman of the Board of Directors of the Egyptian Mineral Resources Company, confirmed that the company is continuing its efforts to maximize returns from the mineral resources it produces.',
    excerptAr:
      'أكد الدكتور عمرو حسن عبد الفتاح، رئيس مجلس إدارة الشركة المصرية للثروات التعدينية، أن الشركة تواصل جهودها لتعظيم العائد من الثروات المعدنية التي تنتجها.',
    image: '/images/999-5.png',
  },
  // add more items as needed...
];

/* Helper utilities */
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const truncate = (txt, n = 140) => (txt.length > n ? txt.slice(0, n) + '…' : txt);

/* Modal component to show image/video/full post */
function Lightbox({ open, onClose, item, isArabic }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
      >
        <div className="flex justify-between items-start p-4 border-b">
          <div>
            <h3 className="text-lg font-bold">{isArabic ? item.titleAr : item.titleEn}</h3>
            <p className="text-sm text-gray-600">{formatDate(item.date)}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Media */}
        <div className="p-4">
          {item.type === 'video' ? (
            <div className="aspect-video">
              <iframe
                title={item.titleEn}
                src={item.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : item.image ? (
            <img src={item.image} alt={isArabic ? item.titleAr : item.titleEn} className="w-full object-cover" />
          ) : null}

          {/* Content (if available) */}
          <div className="mt-4 text-gray-800">
            {item.contentEn || item.contentAr ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: isArabic ? item.contentAr || item.contentEn : item.contentEn || item.contentAr }}
              />
            ) : (
              <p className="text-gray-700">{isArabic ? item.excerptAr : item.excerptEn}</p>
            )}

            {/* attachments */}
            {item.attachments && item.attachments.length > 0 && (
              <div className="mt-4">
                {item.attachments.map((att, i) => (
                  <a
                    key={i}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mr-2 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {isArabic ? att.labelAr || att.labelEn || 'تحميل' : att.labelEn || att.labelAr || 'Download'}
                  </a>
                ))}
              </div>
            )}

            <div className="mt-4">
              <a
                href={item.permalink_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {isArabic ? 'عرض على فيسبوك' : 'View on Facebook'}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Main page */
export default function MediaCenterPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all'); // all | news | press | image | video
  const [selected, setSelected] = useState(null);
  const [lightOpen, setLightOpen] = useState(false);

  useEffect(() => {
    // if language direction needs switching at mount
    document.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (tab !== 'all' && it.type !== tab) return false;
      if (!q) return true;
      const title = (isArabic ? it.titleAr : it.titleEn).toLowerCase();
      const excerpt = (isArabic ? it.excerptAr || '' : it.excerptEn || '').toLowerCase();
      return title.includes(q) || excerpt.includes(q) || (it.contentEn || '').toLowerCase().includes(q);
    });
  }, [query, tab, isArabic]);

  function openItem(it) {
    setSelected(it);
    setLightOpen(true);
  }

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{isArabic ? 'المركز الإعلامى' : 'Media Center'}</h1>
          <p className="text-gray-600">{isArabic ? 'أخبار، مقالات، فيديوهات وصور عن نشاط الشركة' : 'News, articles, videos and images about the company'}</p>
        </div>

        <div className="flex items-center space-x-3">
          <input
            aria-label={isArabic ? 'بحث' : 'Search'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isArabic ? 'ابحث في الأخبار...' : 'Search posts...'}
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3">
        {['all', 'news', 'press', 'image', 'video'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}
          >
            {(() => {
              if (t === 'all') return isArabic ? 'الكل' : 'All';
              if (t === 'news') return isArabic ? 'أخبار' : 'News';
              if (t === 'press') return isArabic ? 'بيانات' : 'Press';
              if (t === 'image') return isArabic ? 'صور' : 'Images';
              if (t === 'video') return isArabic ? 'فيديو' : 'Videos';
            })()}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((it) => (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              {it.image ? (
                <div className="h-44 w-full overflow-hidden">
                  <img src={it.image} alt={isArabic ? it.titleAr : it.titleEn} className="w-full h-full object-cover" />
                </div>
              ) : it.type === 'video' ? (
                <div className="h-44 w-full bg-black flex items-center justify-center text-white">Video</div>
              ) : (
                <div className="h-44 w-full bg-gray-50 flex items-center justify-center text-gray-400">No media</div>
              )}

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{isArabic ? it.titleAr : it.titleEn}</h3>
                  <span className="text-sm text-gray-500">{formatDate(it.date)}</span>
                </div>

                <p className="text-sm text-gray-700 mt-2 flex-1">
                  {truncate(isArabic ? it.excerptAr || it.contentAr || '' : it.excerptEn || it.contentEn || '', 140)}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openItem(it)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      {isArabic ? 'اقرأ المزيد' : 'Read more'}
                    </button>
                    {it.attachments && it.attachments.length > 0 && (
                      <a
                        href={it.attachments[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:underline"
                      >
                        {isArabic ? it.attachments[0].labelAr || 'تحميل' : it.attachments[0].labelEn || 'Download'}
                      </a>
                    )}
                  </div>

                  <div className="text-sm text-gray-500">{it.type.toUpperCase()}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* pagination / load more area (placeholder) */}
      <div className="text-center mt-10">
        <button className="px-5 py-2 bg-gray-100 rounded hover:bg-gray-200">
          {isArabic ? 'تحميل المزيد' : 'Load more'}
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>{lightOpen && <Lightbox open={lightOpen} onClose={() => setLightOpen(false)} item={selected} isArabic={isArabic} />}</AnimatePresence>
    </div>
  );
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        services: "Services",
        map: "Investment Map",
        projects: "Projects",
        media: "Media Center",
        about: "About ECMR",
        contact: "Contact Us",
        welcome: "Invest in Egypt’s Mining Resources",
        explore_services: "Explore Services",

        // ✅ Commodity Workflow Page
        commodity: {
          instructionsTitle: "📝 Instructions",
          instructions: {
            step1: "Step 1: Select your area of interest on the map",
            step2: "Step 2: Fill in your personal and company information",
            step3: "Step 3: Upload the required documents",
            step4: "Step 4: Submit your application for review"
          },
          steps: {
            selectArea: "Select Area",
            fillInfo: "Fill Info",
            uploadDocs: "Upload Documents",
            submit: "Submit Request"
          },
          form: {
            fullName: "Full Name",
            company: "Company",
            commodityType: "Commodity Type",
            expectedQuantity: "Expected Quantity"
          },
          submitMessage: "Review your application and click submit to send it to our team.",
          submitButton: "Submit Application",
          havingIssues: "Having issues?",
          contactUs: "Contact us"
        }
      }
    },
    ar: {
      translation: {
        home: "الرئيسية",
        services: "الخدمات",
        map: "الخريطة الإستثمارية",
        projects: "المشاريع",
        media: "المركز الإعلامى",
        about: "من نحن",
        contact: "اتصل بنا",
        welcome: "استثمر في الثروات التعدينية المصرية",
        explore_services: "استكشف الخدمات",

        // ✅ Commodity Workflow Page
        commodity: {
          instructionsTitle: "📝 تعليمات",
          instructions: {
            step1: "الخطوة 1: اختر المنطقة المطلوبة من الخريطة",
            step2: "الخطوة 2: املأ بياناتك الشخصية وبيانات الشركة",
            step3: "الخطوة 3: قم برفع المستندات المطلوبة",
            step4: "الخطوة 4: قم بإرسال طلبك للمراجعة"
          },
          steps: {
            selectArea: "اختيار المنطقة",
            fillInfo: "تعبئة البيانات",
            uploadDocs: "رفع المستندات",
            submit: "إرسال الطلب"
          },
          form: {
            fullName: "الاسم الكامل",
            company: "الشركة",
            commodityType: "نوع الخام",
            expectedQuantity: "الكمية المتوقعة"
          },
          submitMessage: "راجع طلبك ثم اضغط إرسال لإرساله إلى فريقنا.",
          submitButton: "إرسال الطلب",
          havingIssues: "هل تواجه مشكلة؟",
          contactUs: "اتصل بنا"
        }
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;

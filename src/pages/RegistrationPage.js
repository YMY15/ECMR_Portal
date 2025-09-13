import React from "react";
import { useTranslation } from "react-i18next";

const RegistrationPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('http://emra.gov.eg/images/TDI/c76f6a6a-6d78-4528-b5d4-00cb890222a8.jpg')" }} // use your homepage background
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isArabic ? "تسجيل شركة جديدة" : "Register a New Company"}
        </h2>

        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder={isArabic ? "اسم الشركة" : "Company Name"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            placeholder={isArabic ? "العنوان" : "Address"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            placeholder={isArabic ? "اسم الممثل" : "Representative Name"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
            <input
            type="text"
            placeholder={isArabic ? "وظيفة الممثل" : "Representative Job"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="tel"
            placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {/* Upload PDF if needed */}
          <div>
            <label className="block mb-2 text-gray-700">
              {isArabic ? "رفع مستند (PDF)" : "Upload Document (PDF)"}
            </label>
            <input
              type="file"
              accept=".pdf"
              className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition">
            {isArabic ? "تقيدم طلب التسجيل" : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;

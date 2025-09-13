import React from "react";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Background.jpg')" }} // same as homepage background
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isArabic ? "تسجيل الدخول" : "Sign In"}
        </h2>

        <form className="grid grid-cols-1 gap-4">
          <input
            type="email"
            placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder={isArabic ? "كلمة المرور" : "Password"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          <button className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition">
            {isArabic ? "دخول" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

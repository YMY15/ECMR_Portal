import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

// Initialize Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const SignInPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      alert(isArabic ? "تم تسجيل الدخول بنجاح!" : "Login successful!");
      // Redirect to homepage or dashboard
      navigate("/"); // Change this to your desired page
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Background.jpg')" }} // same as homepage background
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isArabic ? "تسجيل الدخول" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="email"
            name="email"
            placeholder={isArabic ? "البريد الإلكتروني" : "Email"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={isArabic ? "كلمة المرور" : "Password"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition"
            disabled={loading}
          >
            {loading
              ? isArabic
                ? "جاري تسجيل الدخول..."
                : "Logging in..."
              : isArabic
              ? "دخول"
              : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const RegistrationPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    company_name: "",
    address: "",
    representative_name: "",
    representative_job: "",
    phone: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;

      const userId = authData.user.id;
      let documentUrl = null;

      // 2️⃣ Upload PDF to Storage
      if (form.document) {
        const fileExt = form.document.name.split(".").pop();
        const fileName = `${userId}_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("company-docs")
          .upload(fileName, form.document);

        if (uploadError) throw uploadError;

        documentUrl = supabase.storage
          .from("company-docs")
          .getPublicUrl(fileName).publicUrl;
      }

      // 3️⃣ Insert company details in the table using the user_id from auth
      const { error: insertError } = await supabase
        .from("companies")
        .insert([
          {
            user_id: userId, // matches RLS policy
            company_name: form.company_name,
            address: form.address,
            representative_name: form.representative_name,
            representative_job: form.representative_job,
            phone: form.phone,
            document_url: documentUrl,
          },
        ]);

      if (insertError) throw insertError;

      alert(isArabic ? "تم التسجيل بنجاح!" : "Registration successful!");
      setForm({
        email: "",
        password: "",
        company_name: "",
        address: "",
        representative_name: "",
        representative_job: "",
        phone: "",
        document: null,
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('http://emra.gov.eg/images/TDI/c76f6a6a-6d78-4528-b5d4-00cb890222a8.jpg')" }} // use your homepage background
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isArabic ? "تسجيل شركة جديدة" : "Register a New Company"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="company_name"
            placeholder={isArabic ? "اسم الشركة" : "Company Name"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.company_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder={isArabic ? "العنوان" : "Address"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.address}
            onChange={handleChange}
            required
          />
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
          <input
            type="text"
            name="representative_name"
            placeholder={isArabic ? "اسم الممثل" : "Representative Name"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.representative_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="representative_job"
            placeholder={isArabic ? "وظيفة الممثل" : "Representative Job"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.representative_job}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={isArabic ? "رقم الهاتف" : "Phone Number"}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block mb-2 text-gray-700">
              {isArabic ? "رفع مستند (PDF)" : "Upload Document (PDF)"}
            </label>
            <input
              type="file"
              name="document"
              accept=".pdf"
              className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition"
            disabled={loading}
          >
            {loading
              ? isArabic
                ? "جاري التسجيل..."
                : "Registering..."
              : isArabic
              ? "تقيدم طلب التسجيل"
              : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, UserPlus } from 'lucide-react';

// Import pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import MapPage from './pages/MapPage';
import ProjectsPage from './pages/ProjectsPage';
import MediaPage from './pages/MediaPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegistrationPage from './pages/RegistrationPage';
import SignInPage from './pages/SignInPage';
import ProductionPage from './pages/ProductionPage';
import CommodityPage from "./pages/CommodityPage";

// Admin Map Controller (shared state for admin and viewer)
import { useAdminMapController } from './admin/AdminMapController';

function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: "/", label: t("home") },
    { path: "/services", label: t("services") },
    { path: "/map", label: t("map") },
    { path: "/projects", label: t("projects") },
    { path: "/media", label: t("media") },
    { path: "/about", label: t("about") },
    { path: "/contact", label: t("contact") },
  ];

  return (
    <nav className="bg-gray-700 bg-opacity-50 text-white p-2 flex justify-center gap-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`hover:underline ${
            location.pathname === item.path
              ? "font-bold text-yellow-400 underline"
              : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function App() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  // Shared Admin Map Controller state
  const adminMap = useAdminMapController();

  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-100">
        {/* Header */}
        <header className="bg-white bg-opacity-50 shadow-md p-4 flex justify-between items-center">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo.jpg" alt="ECMR Logo" className="h-16 w-auto" />
          </Link>

          {/* Middle: Company Name */}
          <Link
            to="/"
            className="text-lg md:text-xl font-bold text-center hover:text-yellow-400 transition"
          >
            {i18n.language === 'ar'
              ? 'الشركة المصرية للثروات التعدينية'
              : 'Egyptian Company for Mineral Resources (ECMR)'}
          </Link>

          {/* Right: Auth + Language */}
          <div className="flex flex-col items-center space-y-2">
            {/* Top row: Register & Login */}
            <div className="flex space-x-4">
              <Link
                to="/signin"
                className="flex items-center space-x-1 text-gray-700 hover:text-yellow-500 transition"
              >
                <LogIn size={20} />
                <span className="hidden md:inline">
                  {i18n.language === 'ar' ? 'تسجيل دخول' : 'Sign In'}
                </span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 text-gray-700 hover:text-yellow-500 transition"
              >
                <UserPlus size={20} />
                <span className="hidden md:inline">
                  {i18n.language === 'ar' ? 'إنشاء حساب' : 'Register'}
                </span>
              </Link>
            </div>

            {/* Bottom row: Language toggle */}
            <button
              onClick={toggleLanguage}
              className="text-sm underline hover:text-yellow-500"
            >
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </header>

        {/* ✅ Navigation Tabs with active highlight */}
        <Navbar />

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/services/production" element={<ProductionPage />} />
          <Route path="/services/production/Commodity" element={<CommodityPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 text-center">
          <div className="flex justify-center items-center space-x-2">
            <img src="/images/logo.jpg" alt="ECMR Logo" className="h-8 w-auto" />
            <span>© 2025 ECMR</span>
          </div>
          <p>Email: info@ecmr.com | Phone: +20 100 000 0000</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

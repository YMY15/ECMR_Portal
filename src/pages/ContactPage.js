import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Phone, Mail } from "lucide-react";
import L from "leaflet";

// Custom marker icon (so Leaflet doesn’t break in React builds)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ContactPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const position = [30.06438056992492, 31.28417449097772];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-5xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center text-gray-800"
        >
          {isArabic ? "تواصل معنا" : "Contact Us"}
        </motion.h2>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="text-yellow-500" size={28} />
              <p className="text-lg">
                {isArabic
                  ? " طريق صلاح سالم - العباسية -القاهرة -مصر"
                  : " 3 Salahsalem street , Abbasia , Cairo, Egypt"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-yellow-500" size={28} />
              <p className="text-lg">+20 100 000 0000</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-yellow-500" size={28} />
              <p className="text-lg">info@ecmr.com</p>
            </div>
          </motion.div>

          {/* OpenStreetMap */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400 h-[300px]"
          >
            <MapContainer
              center={position}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={markerIcon}>
                <Popup>
                  {isArabic
                    ? "موقع الشركة المصرية للثروات التعدينية"
                    : "Egyptian Company for Mineral Resources"}
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;

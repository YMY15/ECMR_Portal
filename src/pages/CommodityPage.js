// src/pages/CommodityPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MapPage from "./MapPage";

const CommodityPage = () => {
  const [openStep, setOpenStep] = useState(1);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const { t } = useTranslation();

  const toggleStep = (step) => {
    setOpenStep(openStep === step ? null : step);
  };

  // ✅ Add ESC key support to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mapFullscreen) {
        setMapFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mapFullscreen]);

  const stepLabels = [
    t("commodity.steps.selectArea"),
    t("commodity.steps.fillInfo"),
    t("commodity.steps.uploadDocs"),
    t("commodity.steps.submit"),
  ];

  const instructions = [
    t("commodity.instructions.step1"),
    t("commodity.instructions.step2"),
    t("commodity.instructions.step3"),
    t("commodity.instructions.step4"),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar */}
      {!mapFullscreen && (
        <aside className="w-1/4 bg-white shadow-md border-r p-6 hidden md:block">
          <h2 className="text-xl font-bold mb-4">
            {t("commodity.instructionsTitle")}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {instructions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Progress Tracker */}
        {!mapFullscreen && (
          <div className="flex justify-between items-center mb-8">
            {["1", "2", "3", "4"].map((num, idx) => (
              <div key={idx} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold ${
                    openStep === idx + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {num}
                </div>
                <p className="mt-2 text-sm">{stepLabels[idx]}</p>
              </div>
            ))}
          </div>
        )}

        {/* Collapsible Sections */}
        <div className="space-y-6">
          {/* Step 1 */}
          <section className="border rounded-lg shadow bg-white relative">
            <header
              onClick={() => !mapFullscreen && toggleStep(1)}
              className={`cursor-pointer bg-gray-200 p-4 font-bold flex justify-between items-center ${
                mapFullscreen ? "hidden" : "flex"
              }`}
            >
              <span>{t("commodity.steps.selectArea")}</span>
              <div className="flex items-center gap-4">
                {openStep === 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapFullscreen(true);
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {t("FullScreen")}
                  </button>
                )}
                <span>{openStep === 1 ? "▲" : "▼"}</span>
              </div>
            </header>

            {/* Map Content */}
            {openStep === 1 && (
              <div
                className={`p-4 transition-all ${
                  mapFullscreen
                    ? "fixed inset-0 bg-white z-50 p-2"
                    : "relative"
                }`}
              >
                {/* ✅ Close button inside fullscreen */}
                {mapFullscreen && (
                  <button
                    onClick={() => setMapFullscreen(false)}
                    className="absolute top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
                  >
                    {t("Minimize")} (Esc)
                  </button>
                )}
                <div
                  className={`${
                    mapFullscreen
                      ? "h-[90vh] w-full"
                      : "h-[400px] border rounded-lg shadow"
                  } overflow-hidden`}
                >
                  <MapPage />
                </div>
              </div>
            )}
          </section>

          {/* Step 2 */}
          {!mapFullscreen && (
            <section className="border rounded-lg shadow bg-white">
              <header
                onClick={() => toggleStep(2)}
                className="cursor-pointer bg-gray-200 p-4 font-bold flex justify-between"
              >
                <span>{t("commodity.steps.fillInfo")}</span>
                <span>{openStep === 2 ? "▲" : "▼"}</span>
              </header>
              {openStep === 2 && (
                <div className="p-4">
                  <form className="space-y-4">
                    <div>
                      <label className="block font-bold">
                        {t("commodity.form.fullName")}
                      </label>
                      <input
                        type="text"
                        className="border rounded w-full p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold">
                        {t("commodity.form.company")}
                      </label>
                      <input
                        type="text"
                        className="border rounded w-full p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold">
                        {t("commodity.form.commodityType")}
                      </label>
                      <input
                        type="text"
                        className="border rounded w-full p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold">
                        {t("commodity.form.expectedQuantity")}
                      </label>
                      <input
                        type="number"
                        className="border rounded w-full p-2"
                        required
                      />
                    </div>
                  </form>
                </div>
              )}
            </section>
          )}

          {/* Step 3 */}
          {!mapFullscreen && (
            <section className="border rounded-lg shadow bg-white">
              <header
                onClick={() => toggleStep(3)}
                className="cursor-pointer bg-gray-200 p-4 font-bold flex justify-between"
              >
                <span>{t("commodity.steps.uploadDocs")}</span>
                <span>{openStep === 3 ? "▲" : "▼"}</span>
              </header>
              {openStep === 3 && (
                <div className="p-4">
                  <input
                    type="file"
                    multiple
                    className="border rounded w-full p-2"
                  />
                </div>
              )}
            </section>
          )}

          {/* Step 4 */}
          {!mapFullscreen && (
            <section className="border rounded-lg shadow bg-white">
              <header
                onClick={() => toggleStep(4)}
                className="cursor-pointer bg-gray-200 p-4 font-bold flex justify-between"
              >
                <span>{t("commodity.steps.submit")}</span>
                <span>{openStep === 4 ? "▲" : "▼"}</span>
              </header>
              {openStep === 4 && (
                <div className="p-4">
                  <p className="mb-2 text-gray-600">
                    {t("commodity.submitMessage")}
                  </p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {t("commodity.submitButton")}
                  </button>
                  <p className="mt-4 text-sm text-gray-500">
                    {t("commodity.havingIssues")}{" "}
                    <Link to="/contact" className="text-blue-600 hover:underline">
                      {t("commodity.contactUs")}
                    </Link>
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default CommodityPage;

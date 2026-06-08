"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Maximize,
  Minimize,
  Eye,
  EyeOff,
  Compass,
} from "lucide-react";
import { tourConfig, type ActionVariant } from "@/config/tour.config";
import { useTourStore } from "@/store/tour-store";

type HeaderLink = {
  id: string;
  label: string;
  variant: ActionVariant;
  popupMessage?: string;
  url?: string;
  targetScene?: string;
  modalContent?: string;
  modalImage?: string;
};

const CTA_VARIANTS: ActionVariant[] = ["whatsapp", "url"];

export default function TourHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const showHotspots = useTourStore((s) => s.showHotspots);
  const useGyro = useTourStore((s) => s.useGyro);
  const toggleGyro = useTourStore((s) => s.toggleGyro);
  const toggleHotspots = useTourStore((s) => s.toggleHotspots);
  const setNextScene = useTourStore((s) => s.setNextScene);
  const setTransitionType = useTourStore((s) => s.setTransitionType);

  const header = tourConfig.header;
  const brand = tourConfig.brand;
  const theme = tourConfig.theme;
  const features = tourConfig.features;
  const ui = tourConfig.ui;

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  if (!header.enabled) return null;

  const handleAction = (action: HeaderLink) => {
    setIsOpen(false);
    switch (action.variant) {
      case "popup":
        alert(action.popupMessage || action.label);
        break;
      case "whatsapp":
        window.open(`https://wa.me/${tourConfig.contact.whatsapp.number}`, "_blank");
        break;
      case "url":
        window.open(action.url || tourConfig.contact.booking.url, "_blank");
        break;
      case "scene":
        if (action.targetScene) {
          setTransitionType("zoom");
          setNextScene(action.targetScene);
        }
        break;
      case "modal":
        setActiveModal(action.id);
        break;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen?.();
    }
  };

  const renderUtilityBtns = (mobile = false) => (
    <div
      className={`flex items-center gap-0.5 ${mobile ? "flex-wrap px-3 pb-3 pt-1" : ""}`}
    >
      <button
        onClick={toggleHotspots}
        className={`p-2.5 rounded-xl transition-all ${
          !showHotspots
            ? "bg-white/20 text-white/40"
            : "text-white/60 hover:bg-white/10 hover:text-white"
        } ${mobile ? "flex-1 justify-center flex items-center gap-2 py-3" : ""}`}
        title={showHotspots ? ui.hideNavigation : ui.showNavigation}
      >
        {showHotspots ? <Eye size={18} /> : <EyeOff size={18} />}
        {mobile && (
          <span className="text-xs">
            {showHotspots ? "Sembunyikan" : "Tampilkan"}
          </span>
        )}
      </button>

      {features.gyro.enabled && (
        <button
          onClick={toggleGyro}
          className={`p-2.5 rounded-xl transition-all ${
            features.gyro.showOnDesktop ? "hidden md:flex" : "flex md:hidden"
          } ${
            useGyro
              ? "text-white shadow-[0_0_15px_rgba(239,120,69,0.3)]"
              : "text-white/60 hover:bg-white/10 hover:text-white"
          } ${mobile ? "flex-1 justify-center flex items-center gap-2 py-3" : ""}`}
          style={{ backgroundColor: useGyro ? theme.primary : "transparent" }}
          title={useGyro ? ui.gyroOff : ui.gyroOn}
        >
          <Compass size={18} />
          {mobile && (
            <span className="text-xs">
              {useGyro ? "Gerak ON" : "Gerak OFF"}
            </span>
          )}
        </button>
      )}

      {features.fullscreen.enabled && (
        <button
          onClick={toggleFullscreen}
          className={`p-2.5 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all ${features.fullscreen.showOnMobile ? "" : "hidden md:block"} ${mobile ? "flex-1 justify-center flex items-center gap-2 py-3" : ""}`}
          title={isFullscreen ? ui.exitFullscreen : ui.fullscreen}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          {mobile && (
            <span className="text-xs">
              {isFullscreen ? "Keluar" : "Fullscreen"}
            </span>
          )}
        </button>
      )}
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-[99999] will-change-transform px-4 pt-3"
      >
        <div
          className="flex items-center justify-between px-5 py-3 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-full max-w-5xl mx-auto"
          style={{
            backgroundColor: theme.glassBg,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            {header.logo.image ? (
              <img
                src={header.logo.image}
                alt={header.logo.alt || brand.name}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-white font-bold text-lg tracking-wide">
                {brand.name}
              </span>
            )}
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {header.links.map((link) => {
              const isCta = CTA_VARIANTS.includes(link.variant);
              return (
                <button
                  key={link.id}
                  onClick={() => handleAction(link)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isCta
                      ? "text-white shadow-[0_0_20px_rgba(239,120,69,0.2)]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{
                    backgroundColor: isCta ? theme.primary : "transparent",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop utility buttons */}
          <div className="hidden md:block">{renderUtilityBtns()}</div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-4 z-[99998] md:hidden"
          >
            <div
              className="backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden"
              style={{
                backgroundColor: theme.glassBg,
                border: `1px solid ${theme.glassBorder}`,
              }}
            >
              {/* Nav links */}
              {header.links.map((link) => {
              const isCta = CTA_VARIANTS.includes(link.variant);
                return (
                  <button
                    key={link.id}
                    onClick={() => handleAction(link)}
                    className={`w-full text-left px-5 py-4 text-sm font-medium transition-all border-b border-white/5 ${
                      isCta
                        ? "text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                    style={{
                      backgroundColor: isCta ? theme.primary : "transparent",
                    }}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* Separator */}
              <div className="h-px bg-white/10 mx-3" />

              {/* Utility buttons in mobile */}
              {renderUtilityBtns(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal overlay */}
      <AnimatePresence>
        {activeModal && (() => {
          const link = header.links.find((l) => l.id === activeModal);
          if (!link) return null;
          const isImage = !!link.modalImage;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={isImage ? { opacity: 0, scale: 1.05 } : { opacity: 0, scale: 0.9, y: 20 }}
                animate={isImage ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={isImage ? { opacity: 0, scale: 1.05 } : { opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative ${isImage ? "max-w-3xl w-full" : "w-full max-w-md"} rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"`}
                style={{
                  backgroundColor: isImage ? "transparent" : theme.glassBg,
                  border: isImage ? "none" : `1px solid ${theme.glassBorder}`,
                }}
              >
                {isImage ? (
                  <>
                    <img
                      src={link.modalImage}
                      alt={link.label}
                      className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                    />
                    <button
                      onClick={() => setActiveModal(null)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-all"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/10">
                      <span className="text-white font-semibold text-lg">{link.label}</span>
                      <button
                        onClick={() => setActiveModal(null)}
                        className="p-1.5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div
                      className="px-6 py-5 text-white/80 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: (link as HeaderLink).modalContent || "" }}
                    />
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}

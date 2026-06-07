"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map, Maximize, Minimize, MapPin, X, ChevronUp,
  Utensils, CalendarDays, BedDouble, Info, Phone,
  LayoutDashboard, Eye, EyeOff, Compass,
} from "lucide-react";
import { tourConfig, type ActionVariant } from "@/config/tour.config";
import { sceneKeys, sceneLookup } from "@/config/scenes.config";
import { useTourStore } from "@/store/tour-store";

const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
  Utensils, CalendarDays, BedDouble, Info, Phone, LayoutDashboard,
};

type ActionItem = {
  id: string;
  label: string;
  icon: string;
  variant: ActionVariant;
  popupMessage?: string;
  url?: string;
};

export default function TourNavbar() {
  const [isSceneMenuOpen, setIsSceneMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const currentScene = useTourStore((s) => s.currentScene);
  const showHotspots = useTourStore((s) => s.showHotspots);
  const useGyro = useTourStore((s) => s.useGyro);
  const toggleGyro = useTourStore((s) => s.toggleGyro);
  const toggleHotspots = useTourStore((s) => s.toggleHotspots);
  const setNextScene = useTourStore((s) => s.setNextScene);
  const setTransitionType = useTourStore((s) => s.setTransitionType);

  const ui = tourConfig.ui;
  const features = tourConfig.features;
  const theme = tourConfig.theme;
  const actions = tourConfig.experiences.restoran as ActionItem[];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleAction = (action: ActionItem) => {
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
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSceneMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSceneMenuOpen(false)}
            className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSceneMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 300, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 300, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[99999] w-[calc(100%-2rem)] max-w-xs bg-black/60 backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden"
            style={{ borderColor: `${theme.primary}30` }}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/10">
              <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
                {ui.sceneMenuTitle}
              </span>
              <button onClick={() => setIsSceneMenuOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
                <X size={16} />
              </button>
            </div>
            <div className="p-2 max-h-[50vh] overflow-y-auto">
              {sceneKeys.map((sceneKey) => {
                const isActive = currentScene === sceneKey;
                const scene = sceneLookup[sceneKey];
                return (
                  <button
                    key={sceneKey}
                    onClick={() => {
                      if (!isActive) {
                        setNextScene(sceneKey);
                        setTransitionType("fade");
                        setIsSceneMenuOpen(false);
                      }
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 text-sm font-medium flex items-center gap-3 ${
                      isActive
                        ? "text-white shadow-[0_0_20px_rgba(239,120,69,0.15)]"
                        : "text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                    style={{ backgroundColor: isActive ? theme.primary : "transparent" }}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-white" : "bg-white/20"}`} />
                    <span>{scene?.name || sceneKey}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[99999] md:hidden flex items-center gap-2 overflow-x-auto max-w-[calc(100%-2rem)]"
          >
            {actions.map((action) => {
              const IconComp = iconComponents[action.icon];
              const isCta = action.variant === "whatsapp" || action.variant === "url";
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  className={`flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isCta
                      ? "text-white shadow-[0_0_20px_rgba(239,120,69,0.3)]"
                      : "bg-black/50 text-white border backdrop-blur-md hover:bg-black/70"
                  }`}
                  style={{
                    backgroundColor: isCta ? theme.primary : undefined,
                    borderColor: isCta ? "transparent" : theme.glassBorder,
                  }}
                >
                  {IconComp && <IconComp size={14} />}
                  {action.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-6 inset-x-0 z-[99999] will-change-transform px-3"
      >
        <div
          className="flex items-center gap-1.5 px-2 py-1.5 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-full max-w-lg mx-auto"
          style={{
            backgroundColor: theme.glassBg,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          <button
            onClick={() => setIsSceneMenuOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-white/10 transition-all text-white/80 hover:text-white min-w-0 flex-1"
          >
            <MapPin size={16} className="shrink-0 text-white/50" />
            <span className="text-sm font-medium">
              {sceneLookup[currentScene]?.name || currentScene}
            </span>
            <ChevronUp size={14} className="shrink-0 text-white/40" />
          </button>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsSceneMenuOpen(!isSceneMenuOpen)}
              className={`p-2.5 rounded-xl transition-all ${
                isSceneMenuOpen
                  ? "text-white shadow-[0_0_15px_rgba(239,120,69,0.2)]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              style={{ backgroundColor: isSceneMenuOpen ? theme.primary : "transparent" }}
              title={ui.sceneMenuTitle}
            >
              <Map size={18} />
            </button>

            <button
              onClick={toggleHotspots}
              className={`p-2.5 rounded-xl transition-all ${
                !showHotspots
                  ? "bg-white/20 text-white/40"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              title={showHotspots ? ui.hideNavigation : ui.showNavigation}
            >
              {showHotspots ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>

            {features.gyro.enabled && (
              <button
                onClick={toggleGyro}
                className={`p-2.5 rounded-xl transition-all ${
                  features.gyro.showOnDesktop ? "" : "md:flex hidden"
                } ${
                  useGyro ? "text-white shadow-[0_0_15px_rgba(239,120,69,0.3)]" : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
                style={{ backgroundColor: useGyro ? theme.primary : "transparent" }}
                title={useGyro ? ui.gyroOff : ui.gyroOn}
              >
                <Compass size={18} />
              </button>
            )}

            {features.fullscreen.enabled && (
              <button
                onClick={toggleFullscreen}
                className={`p-2.5 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all ${features.fullscreen.showOnMobile ? "" : "hidden md:block"}`}
                title={isFullscreen ? ui.exitFullscreen : ui.fullscreen}
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            )}

            {actions.length > 0 && <div className="md:hidden w-px h-5 bg-white/10 mx-0.5" />}
            {actions.length > 0 && (
              <button
                onClick={() => setShowActions(!showActions)}
                className={`p-2.5 rounded-xl transition-all md:hidden ${
                  showActions
                    ? "text-white shadow-[0_0_15px_rgba(239,120,69,0.2)]"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
                style={{ backgroundColor: showActions ? theme.primary : "transparent" }}
              >
                <ChevronUp size={18} className={`transition-transform duration-200 ${showActions ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-8 right-8 z-[99999] hidden md:flex flex-col gap-3 will-change-transform"
      >
        {actions.map((action) => {
          const IconComp = iconComponents[action.icon];
          const isCta = action.variant === "whatsapp" || action.variant === "url";
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-lg ${
                isCta
                  ? "text-white shadow-[0_0_30px_rgba(239,120,69,0.25)]"
                  : "text-white border backdrop-blur-md hover:bg-black/60"
              }`}
              style={{
                backgroundColor: isCta ? theme.primary : theme.glassBg,
                borderColor: isCta ? "transparent" : theme.glassBorder,
              }}
            >
              {IconComp && <IconComp size={18} />}
              {action.label}
            </button>
          );
        })}
      </motion.div>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Info } from "lucide-react";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { tourConfig } from "@/config/tour.config";

type SocialPlatform = "instagram" | "facebook" | "tiktok" | "twitter" | "youtube" | "whatsapp";

const socialIcons: Record<SocialPlatform, React.ComponentType<{ size?: number; stroke?: number }>> = {
  instagram: IconBrandInstagram,
  facebook: IconBrandFacebook,
  tiktok: IconBrandTiktok,
  twitter: IconBrandTwitter,
  youtube: IconBrandYoutube,
  whatsapp: IconBrandWhatsapp,
};

type SocialModal = "info" | "location" | null;

export default function TourSocial() {
  const [activeModal, setActiveModal] = useState<SocialModal>(null);

  const social = tourConfig.social;
  const theme = tourConfig.theme;

  if (!social.enabled) return null;

  const hasLinks = social.links.length > 0;
  const hasInfo = social.info.enabled;
  const hasLocation = social.location.enabled;
  const hasAny = hasLinks || hasInfo || hasLocation;
  if (!hasAny) return null;

  const position = social.position as "left" | "right" | "bottom";
  const isBottom = position === "bottom";
  const isLeft = position === "left";

  const renderSeparator = () => <div className="w-px h-5 bg-white/10 shrink-0" />;

  const renderSocialLinks = () =>
    social.links.map((link) => {
      const IconComp = socialIcons[link.platform as SocialPlatform];
      if (!IconComp) return null;
      return (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          className="p-2 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
        >
          <IconComp size={18} stroke={1.5} />
        </a>
      );
    });

  return (
    <>
      <motion.div
        initial={isBottom ? { y: 60, opacity: 0 } : { x: isLeft ? -60 : 60, opacity: 0 }}
        animate={isBottom ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className={`fixed ${isBottom ? "bottom-3 left-1/2 -translate-x-1/2" : `${isLeft ? "left-3" : "right-3"} top-1/2 -translate-y-1/2`} z-[99998] will-change-transform`}
      >
        <div
          className={`backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${isBottom ? "flex flex-row items-center px-3 py-1.5 gap-1" : "flex flex-col items-center px-1.5 py-3 gap-1"}`}
          style={{
            backgroundColor: theme.glassBg,
            border: `1px solid ${theme.glassBorder}`,
          }}
        >
          {/* Info button — first */}
          {hasInfo && (
            <>
              <button
                onClick={() => setActiveModal("info")}
                title={social.info.label}
                className="p-2 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Info size={18} />
              </button>
              {hasLinks && renderSeparator()}
            </>
          )}

          {/* Social links — middle */}
          {hasLinks && renderSocialLinks()}

          {/* Location button — last */}
          {hasLocation && (
            <>
              {hasLinks && renderSeparator()}
              <button
                onClick={() => setActiveModal("location")}
                title={social.location.label}
                className="p-2 rounded-xl text-white/50 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <MapPin size={18} />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={activeModal === "location" ? { opacity: 0, scale: 1.05 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={activeModal === "location" ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={activeModal === "location" ? { opacity: 0, scale: 1.05 } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative ${activeModal === "location" ? "w-full max-w-[1000px]" : "w-full max-w-[764px]"} rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]`}
              style={{
                backgroundColor: activeModal === "location" ? "transparent" : theme.glassBg,
                border: activeModal === "location" ? "none" : `1px solid ${theme.glassBorder}`,
              }}
            >
              {activeModal === "location" ? (
                <>
                  <iframe
                    src={social.location.mapsUrl}
                    width="100%"
                    height="650"
                    className="max-h-[80vh]"
                    style={{ border: 0, borderRadius: "1rem" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={social.location.label}
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
                    <span className="text-white font-semibold text-lg">{social.info.label}</span>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="p-1.5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div
                    className="px-6 py-5 text-white/80 text-sm leading-relaxed max-h-[65vh] overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: social.info.content }}
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

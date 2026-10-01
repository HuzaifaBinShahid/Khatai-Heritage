"use client";

import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappUrl } from "@/lib/site";
import { useIntroDone } from "@/lib/use-intro-done";

export function WhatsAppButton() {
  const introDone = useIntroDone();

  return (
    <AnimatePresence>
      {introDone && (
        <motion.a
          href={whatsappUrl("Hi! I'd like to place an order.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 260, damping: 20, delay: 1.6 },
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(20,17,13,0.45)] md:bottom-8 md:right-8"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

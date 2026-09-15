import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "shammah-cookie-choice";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // storage blocked — stay hidden
    }
  }, []);

  function choose(choice: "accepted" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="region"
          aria-label="Cookie notice"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-gold bg-navy-deep px-4 py-4 text-primary-foreground shadow-2xl"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-primary-foreground/85">
              <Cookie className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                We use essential cookies to run this website and, with your consent, analytics
                cookies to improve it. Read our{" "}
                <Link to="/privacy" className="text-gold underline">
                  Privacy Notice
                </Link>{" "}
                to see how we process personal information under POPIA.
              </span>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("essential")}
                className="border border-white/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide hover:border-gold hover:text-gold"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-navy-deep hover:bg-gold-soft"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

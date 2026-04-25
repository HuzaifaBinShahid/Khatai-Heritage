"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { Curtains } from "@/components/intro/curtains";

const IntroCanvas = dynamic(() => import("@/components/intro/intro-canvas"), {
  ssr: false,
  loading: () => null,
});

type Stage = "rolling" | "parting" | "done";

export function IntroOverlay() {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = React.useState<Stage>(
    reduceMotion ? "done" : "rolling",
  );

  React.useEffect(() => {
    if (reduceMotion || stage === "done") return;
    document.body.classList.add("intro-lock");
    return () => {
      document.body.classList.remove("intro-lock");
    };
  }, [reduceMotion, stage]);

  React.useEffect(() => {
    if (stage === "done") {
      document.body.classList.remove("intro-lock");
      window.dispatchEvent(new CustomEvent("khatai:intro-done"));
    }
  }, [stage]);

  if (reduceMotion || stage === "done") {
    return null;
  }

  return (
    <div
      aria-hidden
      className="fixed inset-0 select-none"
      style={{
        pointerEvents: stage === "parting" ? "none" : "auto",
        zIndex: 9999,
      }}
    >
      {/* Curtains form the dark backdrop and slide apart on parting. */}
      <Curtains parted={stage === "parting"} />

      {/* Canvas sits above curtains while the biscuit performs. The instant
          stage flips to "parting", we hide the canvas so the user never sees
          the broken halves drift across the revealed page — the GSAP timeline
          keeps running so onComplete still fires, but visually it's gone. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10000,
          opacity: stage === "parting" ? 0 : 1,
          transition: "opacity 80ms linear",
        }}
      >
        <IntroCanvas
          onSplitStart={() => setStage("parting")}
          onComplete={() => {
            window.setTimeout(() => setStage("done"), 200);
          }}
        />
      </div>
    </div>
  );
}

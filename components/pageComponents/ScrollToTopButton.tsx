"use client";

import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        setIsVisible(true);
      } else setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {isVisible ? (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-6 right-6 bg-cs-bg-border rounded-full w-12 h-12 shadow-lg transition hover:bg-cs-bg-base"
        >
          ↑
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

/**
 * Retorna true quando a janela é menor que `breakpoint` px.
 * Inicia como false (SSR-safe) e atualiza após a montagem.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

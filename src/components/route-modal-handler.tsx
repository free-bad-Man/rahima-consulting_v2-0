"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ServiceDetail from "./ServiceDetail";

export default function RouteModalHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const lastPathRef = useRef<string | null>(null);
  const [overlayData, setOverlayData] = useState<any>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const prev = lastPathRef.current;
    // update last path
    lastPathRef.current = pathname;

    // If navigated from another internal page (prev !== null) to a service page -> show overlay
    if (prev && pathname?.startsWith("/services/") && prev !== pathname) {
      // If this navigation was triggered by our modal pushState (history.state.modal === 'service'),
      // don't open the overlay here because the ServiceModal component is already handling it.
      try {
        // If the page code explicitly set a flag to indicate it is opening the modal,
        // skip opening the overlay here to avoid duplicate modals.
        const openingFlag = (window as any).__openingServiceModal;
        if (openingFlag) {
          return;
        }
        const hs = (history && history.state) || {};
        if (hs && hs.modal === "service") {
          // skip overlay since page component already opened modal
          return;
        }
      } catch (err) {
        // ignore and continue
      }
      const slug = pathname.split("/services/")[1];
      if (slug) {
        // fetch service data
        fetch(`/api/services/${slug}`)
          .then((r) => r.json())
          .then((json) => {
            setOverlayData(json?.data || null);
            setIsOverlayOpen(true);
          })
          .catch((e) => {
            console.error("Failed to fetch overlay data:", e);
          });
      }
    } else {
      // If pathname is not a service page, ensure overlay closed
      if (!pathname?.startsWith("/services/")) {
        setIsOverlayOpen(false);
        setOverlayData(null);
      }
    }
  }, [pathname]);

  const close = () => {
    setIsOverlayOpen(false);
    setOverlayData(null);
    // go back to previous page if possible
    if (history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (!isOverlayOpen || !overlayData) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[210] bg-black/50 backdrop-blur-sm"
        onClick={close}
      />
      <div
        className="fixed z-[211] inset-0 flex items-start justify-center p-4 md:p-12 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-4xl bg-[#0A0A0A]/95 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{overlayData?.subtitle || "Услуга"}</h2>
            <button onClick={close} className="px-3 py-1 rounded bg-white/5">Закрыть</button>
          </div>
          <ServiceDetail data={overlayData} />
        </div>
      </div>
    </>
  );
}



"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  PIX8_HANDOFF_EVENT,
  startPix8EcosystemBridge,
} from "@/lib/ecosystem/bridge";
import { useToast } from "@/components/ui/ToastProvider";
import { useLanguage } from "@/components/i18n/LanguageProvider";

function EcosystemHandoffReceiverInner() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const active =
    searchParams.get("ecosystem") === "1" ||
    searchParams.get("ecosystemHandoff") === "1";

  useEffect(() => startPix8EcosystemBridge(), []);

  useEffect(() => {
    if (!active) return;
    const onHandoff = () => {
      showToast(t("ecosystem.receivedFromJoinMyPdf"));
    };
    window.addEventListener(PIX8_HANDOFF_EVENT, onHandoff);
    return () => window.removeEventListener(PIX8_HANDOFF_EVENT, onHandoff);
  }, [active, showToast, t]);

  return null;
}

/** Global Pix-8 receiver for JoinMyPDF postMessage handoffs. */
export function EcosystemHandoffReceiver() {
  return (
    <Suspense fallback={null}>
      <EcosystemHandoffReceiverInner />
    </Suspense>
  );
}

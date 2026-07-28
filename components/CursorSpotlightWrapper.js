"use client";
import dynamic from "next/dynamic";

const CursorSpotlight = dynamic(() => import("@/components/ui/CursorSpotlight"), { ssr: false });

export default function CursorSpotlightWrapper() {
  return <CursorSpotlight />;
}

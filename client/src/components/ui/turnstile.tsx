"use client"
import Script from "next/script";
import { useEffect, useRef } from "react";


interface TurnstileProps {
//   siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
//   theme?: "light" | "dark";
//   size?: "normal" | "compact";
}



export default function Turnstile({  onVerify, onExpire }: TurnstileProps) {

  const ref = useRef<HTMLDivElement>(null);
  const widgetId= useRef<string | null>(null);
  const renderWidget = () => {
    if (!ref.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      callback: onVerify,
      "expired-callback": onExpire,
    });
  };
 useEffect(()=>{
if (window.turnstile) renderWidget();
 },[])

 return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={ref} />
    </>
  );
}

declare global {
  interface Window {
    turnstile: any;
  }



















}


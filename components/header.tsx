"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { Phone } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState, useState as useStateHook } from "react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useStateHook(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppContact = () => {
    const message = "Hi! I have a question about your products.";
    const whatsappUrl = `https://wa.me/+8801595078408?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMessengerContact = () => {
    const message = "Hi! I have a question about your products.";
    const messengerUrl = `https://m.me/giftnest?text=${encodeURIComponent(
      message
    )}`;
    window.open(messengerUrl, "_blank");
  };

  const handlePhoneCall = () => {
    // For mobile devices, use tel: protocol
    if (!isDesktop) {
      window.location.href = "tel:+8801752087454";
    } else {
      // For desktop, open a dialog or copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText("01752087454");
        alert("Phone number copied to clipboard: 01752087454");
      } else {
        // Fallback for browsers without clipboard API
        alert("Call us at: 01752087454");
      }
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between lg:items-center text-sm">
            <div className="w-full flex items-center">
              <p className="font-semibold w-full">
                🎉 ১,০০০৳ এর বেশি অর্ডারে বিনামূল্যে শিপিং! সীমিত সময়ের অফার!
              </p>
            </div>
            <div className="w-40 md:w-full flex justify-end items-center md:gap-2 flex-wrap md:flex-nowrap">
              <button
                onClick={handleWhatsAppContact}
                className="flex items-center gap-1 hover:bg-white/20 px-2 py-1 rounded transition-all">
                <Image src={"/whatsapp.svg"} alt="w" width={20} height={20} />
                {isDesktop && `WhatsApp`}
              </button>
              <button
                onClick={handleMessengerContact}
                className="flex items-center gap-1 hover:bg-white/20 px-2 py-1 rounded transition-all">
                <Image src={"/messenger.svg"} alt="w" width={20} height={20} />
                {isDesktop && `Messenger`}
              </button>
              <button
                onClick={handlePhoneCall}
                className="flex items-center gap-1 hover:bg-white/20 px-2 py-1 rounded transition-all">
                <Phone className="h-4 w-4" />
                {isDesktop && `01752087454`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

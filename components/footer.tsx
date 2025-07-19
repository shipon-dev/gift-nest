"use client";

import Link from "next/link";
import {
  Gift,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Footer() {
  const handleWhatsAppContact = () => {
    const message = "Hi! I have a question about your services.";
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMessengerContact = () => {
    const message = "Hi! I have a question about your services.";
    const messengerUrl = `https://m.me/giftnest?text=${encodeURIComponent(
      message
    )}`;
    window.open(messengerUrl, "_blank");
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
        <div className="flex gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex flex-row items-center gap-2">
                <div className="w-44 h-14 aspect-[2606/544] flex items-center">
                  <Link href="/" className="flex items-center gap-2 group">
                    <Image
                      src={"/main.svg"}
                      width={2606}
                      height={544}
                      alt="GiftNest"
                    />
                  </Link>
                </div>
              </div>
              <div className="max-w-sm mt-4">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  অসাধারণ উপহার তৈরি করা যা স্থায়ী স্মৃতি তৈরি করে।
                  ব্যক্তিগতকৃত ধন থেকে শুরু করে অনন্য আবিষ্কার পর্যন্ত, আমরা
                  আপনাকে জীবনের বিশেষ মুহূর্তগুলি উদযাপন করতে সহায়তা করি।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-center md:text-left">
              <p>
                &copy; {new Date().getFullYear()} GiftNest - সর্বস্বত্ব
                সংরক্ষিত।
              </p>
            </div>
            <div className="flex flex-col gap-6 text-sm">
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                  { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                  { icon: Twitter, href: "#", color: "hover:text-blue-300" },
                  { icon: Youtube, href: "#", color: "hover:text-red-400" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`bg-white/10 hover:bg-white/20 ${social.color} transition-all duration-300 hover:scale-110`}>
                    <social.icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

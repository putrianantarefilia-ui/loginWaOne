"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#005C4B] text-white flex flex-col shrink-0">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden relative">
          <Image
            src="/loginWaOne/logo.jpg"
            alt="Wa One Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight">Wa One</h1>
          <p className="text-[10px] tracking-widest uppercase opacity-70">Messaging</p>
        </div>
      </div>

      {/* New Message Button */}
      <div className="px-4 mb-8">
        <button className="w-full bg-[#25D366] hover:bg-green-500 text-[#004A3C] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          New Message
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
            pathname === "/dashboard"
              ? "bg-white/10 text-[#25D366] font-semibold"
              : "text-white/70 hover:text-white"
          }`}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Overview
        </Link>

        {[
          {
            label: "Devices",
            href: "/devices",
            icon: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
          },
          {
            label: "Contacts",
            href: "/contacts",
            icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
          },
          {
            label: "Groups",
            href: "/groups",
            icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
          },
          {
            label: "Campaign",
            href: "#",
            icon: <path d="M11 5.882V19.24a1 1 0 001.447.894l4.105-2.053a1 1 0 011.342.447l.894 1.789A1 1 0 0020.684 21H21a1 1 0 001-1v-5.684a1 1 0 00-.553-.894l-8-4A1 1 0 0012 10V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1v-4.118z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
          },
          {
            label: "Forum",
            href: "#",
            icon: <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
          },
          {
            label: "Settings",
            href: "#",
            icon: (
              <>
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </>
            ),
          },
        ].map(({ label, href, icon }) => {
          const isActive = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-white/10 text-[#25D366] font-semibold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {icon}
              </svg>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6">
        <a className="flex items-center gap-3 text-red-400 font-bold hover:text-red-300 transition-colors" href="#">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          Logout
        </a>
      </div>
    </aside>
  );
}

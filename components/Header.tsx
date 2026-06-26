"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  let title = "Overview";
  if (pathname?.startsWith("/devices")) title = "Devices";
  else if (pathname?.startsWith("/contacts")) title = "Contacts";
  else if (pathname?.startsWith("/groups")) title = "Group Contacts";

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold text-[#005C4B]">{title}</h2>
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
          <input
            className="block w-full pl-10 pr-3 py-2 border-none bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#005C4B]"
            placeholder="Search analytics..."
            type="text"
          />
        </div>

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-[#005C4B] transition-colors">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">Refilia Putri Ananta</p>
            <p className="text-[10px] text-gray-500">putrianantarefilia@gmail.com</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/a/default-user"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

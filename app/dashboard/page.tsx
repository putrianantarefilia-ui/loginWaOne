"use client";

import React from "react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden font-sans">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-[#005C4B] text-white flex flex-col shrink-0">

        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden relative">
            <Image
              src="/logo.jpg"
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

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-2">
          <a className="flex items-center gap-3 bg-white/10 text-[#25D366] p-3 rounded-xl font-semibold" href="#">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </a>

          {[
            {
              label: "Devices",
              icon: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
            },
            {
              label: "Contacts",
              icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
            },
            {
              label: "Campaign",
              icon: <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
            },
            {
              label: "Forum",
              icon: <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
            },
            {
              label: "Settings",
              icon: (
                <>
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </>
              ),
            },
          ].map(({ label, icon }) => (
            <a key={label} className="flex items-center gap-3 text-white/70 hover:text-white p-3 rounded-xl transition-colors" href="#">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {icon}
              </svg>
              {label}
            </a>
          ))}
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

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-[#005C4B]">Overview</h2>
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F0F2F5]">

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Messages", value: "1,284",
                trend: "↑ +12%", trendColor: "text-[#25D366]",
                sub: "dari bulan lalu",
                bg: "bg-teal-50", iconColor: "text-[#005C4B]",
                icon: <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
              },
              {
                label: "Success Delivery", value: "1,261",
                trend: "↑ 98.2%", trendColor: "text-[#25D366]",
                sub: "berhasil terkirim",
                bg: "bg-teal-50", iconColor: "text-[#005C4B]",
                icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
              },
              {
                label: "Failed Messages", value: "23",
                trend: "↓ -4%", trendColor: "text-red-500",
                sub: "perbaikan sistem",
                bg: "bg-red-50", iconColor: "text-red-500",
                icon: <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
              },
              {
                label: "Active Devices", value: "05",
                trend: "Online", trendColor: "text-[#25D366]",
                sub: "saat ini",
                bg: "bg-green-50", iconColor: "text-[#25D366]",
                icon: <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
              },
            ].map((card, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
                  <div className={`p-2 ${card.bg} rounded-full`}>
                    <svg className={`w-5 h-5 ${card.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {card.icon}
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800">{card.value}</div>
                <div className="text-xs mt-2">
                  <span className={`${card.trendColor} font-bold`}>{card.trend}</span>
                  <span className="text-gray-400"> {card.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-3 gap-6">

            {/* Bar Chart */}
            <div className="col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#005C4B]">Messaging Usages</h3>
                  <p className="text-xs text-gray-400">Real-time data for the last 7 days</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">
                  Last 7 Days
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex items-end justify-between gap-4 px-2 mb-6" style={{ height: "200px" }}>
                {[
                  { day: "Mon", h: "40%", active: false },
                  { day: "Tue", h: "60%", active: false },
                  { day: "Wed", h: "45%", active: false },
                  { day: "Thu", h: "75%", active: false },
                  { day: "Fri", h: "90%", active: true },
                  { day: "Sat", h: "50%", active: false },
                  { day: "Sun", h: "55%", active: false },
                ].map(({ day, h, active }) => (
                  <div key={day} className="flex flex-col items-center flex-1 gap-4 h-full justify-end">
                    <div
                      className={`w-full rounded-lg transition-all ${active ? "bg-[#25D366]" : "bg-gray-200"}`}
                      style={{ height: h }}
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="col-span-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-[#005C4B]">Recent Activity</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Last 24 Hours Logs</p>
              </div>

              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {[
                  {
                    title: "Broadcast Success", desc: "Marketing Campaign A", time: "2 MINS AGO",
                    bg: "bg-green-50",
                    icon: <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
                    iconColor: "text-[#25D366]",
                  },
                  {
                    title: "Device Disconnected", desc: "Work Laptop (WA-004)", time: "15 MINS AGO",
                    bg: "bg-red-50",
                    icon: <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
                    iconColor: "text-red-500",
                  },
                  {
                    title: "New Device Linked", desc: "iPhone 15 Pro Max", time: "1 HOUR AGO",
                    bg: "bg-blue-50",
                    icon: <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
                    iconColor: "text-blue-500",
                  },
                  {
                    title: "Message Queued", desc: "Auto-reply System", time: "2 HOURS AGO",
                    bg: "bg-yellow-50",
                    icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
                    iconColor: "text-yellow-600",
                  },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-full ${act.bg} flex items-center justify-center`}>
                      <svg className={`w-6 h-6 ${act.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {act.icon}
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{act.title}</h4>
                      <p className="text-xs text-gray-500">{act.desc}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                        <span className="text-[10px] font-bold text-[#25D366]">{act.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <button className="w-full bg-[#004A3C] hover:bg-[#005C4B] text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors uppercase tracking-widest">
                  View All Activity
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
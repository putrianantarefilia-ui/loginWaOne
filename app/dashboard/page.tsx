"use client";

import React from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    // Container Utama: Hijau WhatsApp Background & h-screen (Pas Layar)
    <div className="bg-[#F0F2F5] text-slate-800 h-screen overflow-hidden flex font-sans">

      {/* --- SideNavBar: Tema Hijau WhatsApp Tua --- */}
      <aside className="h-full flex flex-col py-6 px-4 bg-[#075E54] border-r border-white/10 w-[260px] shrink-0 shadow-xl">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="relative w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
            <Image src="/loginWaOne/logo.jpg" alt="Logo" fill className="object-contain p-1" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white leading-tight">Wa One</h1>
            <p className="text-[10px] font-bold text-[#25D366] uppercase tracking-wider">Messaging</p>
          </div>
        </div>

        <button className="mx-2 mb-6 py-3 px-4 bg-[#25D366] text-[#075E54] rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-[#1ebe57] transition-all shadow-md">
          <span className="material-symbols-outlined text-sm">add</span>
          New Message
        </button>

        <nav className="flex-grow space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <a className="flex items-center gap-4 bg-white/10 text-[#25D366] rounded-xl px-4 py-3 border-l-4 border-[#25D366] transition-all font-bold text-sm" href="#">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span>Overview</span>
          </a>
          {['devices', 'contacts', 'campaign', 'forum', 'settings'].map((icon) => (
            <a key={icon} className="flex items-center gap-4 text-white/70 px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl transition-all capitalize text-sm font-medium" href="#">
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              <span>{icon}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10">
          <a className="flex items-center gap-4 text-red-300 px-4 py-3 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold" href="#">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col h-full min-w-0">

        {/* TopNavBar */}
        <header className="flex justify-between items-center w-full px-8 h-16 bg-white border-b border-gray-200 shrink-0">
          <h2 className="text-2xl font-black text-[#075E54]">Overview</h2>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input className="w-72 pl-11 pr-4 py-2.5 bg-[#F0F2F5] border-none rounded-full text-sm focus:ring-2 focus:ring-[#25D366]/30 transition-all" placeholder="Search analytics..." type="text" />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 hover:bg-[#F0F2F5] rounded-full cursor-pointer relative text-gray-600">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#25D366] rounded-full border-2 border-white"></span>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-gray-800 leading-tight">Refilia Putri Ananta</p>
                  <p className="text-[11px] text-gray-500 font-medium tracking-tight">putrianantarefilia@gmail.com</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#25D366] bg-gray-200 overflow-hidden relative shadow-sm">
                  <Image src="https://lh3.googleusercontent.com/a/default-user" alt="User" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 space-y-6 flex flex-col overflow-hidden">

          {/* Summary Cards: Ikon di Kanan sesuai image_56083c.png */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 shrink-0">
            {[
              { label: 'Total Messages', val: '1,284', trend: '↑ +12%', sub: 'dari bulan lalu', icon: 'send', color: '#075E54', bg: '#E7F3F0' },
              { label: 'Success Delivery', val: '1,261', trend: '↑ 98.2%', sub: 'berhasil terkirim', icon: 'check_circle', color: '#128C7E', bg: '#D1EBE7' },
              { label: 'Failed Messages', val: '23', trend: '↓ -4%', sub: 'perbaikan sistem', icon: 'error', color: '#EA0038', bg: '#FFEBEE' },
              { label: 'Active Devices', val: '05', trend: 'Online', sub: 'saat ini', icon: 'devices', color: '#25D366', bg: '#DCF8C6' },
            ].map((card, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest">{card.label}</p>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: card.bg, color: card.color }}>
                    <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{card.val}</h3>
                  <p className="text-[12px] mt-1 font-bold">
                    <span style={{ color: card.color }}>{card.trend}</span>
                    <span className="text-gray-400 ml-1 font-medium">{card.sub}</span>
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Bottom Section */}
          <section className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

            {/* Chart Area: Hijau Gradasi WhatsApp */}
            <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 p-7 flex flex-col shadow-sm">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h3 className="text-xl font-black text-[#075E54]">Messaging Usages</h3>
                  <p className="text-xs text-gray-400 font-medium">Real-time data for the last 7 days</p>
                </div>
                <select className="bg-[#F0F2F5] border border-gray-200 rounded-xl text-xs font-bold px-4 py-2 outline-none cursor-pointer hover:bg-gray-200 transition-all">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>

              <div className="flex-1 flex items-end gap-4 px-2 pt-4">
                {[35, 55, 40, 75, 95, 50, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${i === 4 ? 'bg-[#25D366]' : 'bg-[#075E54]/20 group-hover:bg-[#075E54]/40'}`}
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="text-[10px] mt-3 font-black text-gray-400 uppercase tracking-widest group-hover:text-[#075E54]">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[24px] border border-gray-100 flex flex-col shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 shrink-0 bg-[#F0F2F5]/50">
                <h3 className="font-black text-[#075E54]">Recent Activity</h3>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter">Last 24 hours logs</p>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
                {[
                  { title: 'Broadcast Success', desc: 'Marketing Campaign A', time: '2 mins ago', icon: 'done', color: 'bg-[#DCF8C6] text-[#075E54]' },
                  { title: 'Device Disconnected', desc: 'Work Laptop (WA-004)', time: '15 mins ago', icon: 'warning', color: 'bg-red-100 text-red-600' },
                  { title: 'New Device Linked', desc: 'iPhone 15 Pro Max', time: '1 hour ago', icon: 'link', color: 'bg-blue-100 text-blue-600' },
                  { title: 'Message Queued', desc: 'Auto-reply System', time: '2 hours ago', icon: 'schedule', color: 'bg-yellow-100 text-yellow-700' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`w-9 h-9 shrink-0 rounded-full ${act.color} flex items-center justify-center shadow-sm`}>
                      <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                    </div>
                    <div className="border-b border-gray-50 pb-3 flex-1">
                      <p className="text-sm font-black text-gray-800 leading-tight group-hover:text-[#128C7E] transition-colors">{act.title}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{act.desc}</p>
                      <p className="text-[10px] text-[#25D366] font-black mt-1.5 flex items-center gap-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span> {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-white shrink-0">
                <button className="w-full py-3 bg-[#075E54] text-white text-xs font-black rounded-xl hover:bg-[#128C7E] transition-all shadow-md uppercase tracking-widest">
                  View All Activity
                </button>
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <>

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
    </>
  );
}
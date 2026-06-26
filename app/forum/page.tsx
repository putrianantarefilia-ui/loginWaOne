"use client";

import React from "react";
import Link from "next/link";

export default function ForumPage() {
  return (
    <>
      <div className="max-w-[1400px] mx-auto flex gap-8">
        {/* Discussion List Section */}
        <section className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Community Forum</h2>
              <p className="text-sm text-gray-500 mt-1">Connect, share, and grow with other Wa One users.</p>
            </div>
            <button className="bg-[#005C4B] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#004A3C] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Start Discussion
            </button>
          </div>

          {/* Forum Thread List */}
          <div className="space-y-4">
            {/* Thread Item 1 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#005C4B]/10 flex items-center justify-center flex-shrink-0 text-[#005C4B] font-bold text-lg">
                  AR
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#005C4B] transition-colors">
                      Best practices for automating customer broadcasts?
                    </h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Tips &amp; Tricks</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span><span className="font-bold text-gray-700">Alex Rivera</span> • 2 hours ago</span>
                    <div className="flex items-center gap-4 ml-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                        <span>24 replies</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>1.2k views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thread Item 2 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 text-teal-700 font-bold text-lg">
                  SC
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#005C4B] transition-colors">
                      Proposal: Dark mode enhancements for desktop app
                    </h3>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Feature Request</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span><span className="font-bold text-gray-700">Sarah Chen</span> • 5 hours ago</span>
                    <div className="flex items-center gap-4 ml-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                        <span>8 replies</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>456 views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thread Item 3 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#005C4B] flex items-center justify-center text-white flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">campaign</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#005C4B] transition-colors">
                      Quarterly Product Update - Q3 2024
                    </h3>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Announcements</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span><span className="font-bold text-gray-700">Wa One Team</span> • Yesterday</span>
                    <div className="flex items-center gap-4 ml-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                        <span>112 replies</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>8.9k views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thread Item 4 */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group shadow-sm">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-lg">
                  MT
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 gap-3">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#005C4B] transition-colors">
                      How to handle API rate limits during peak hours?
                    </h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Q&amp;A</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span><span className="font-bold text-gray-700">Marcus Thorne</span> • 1 day ago</span>
                    <div className="flex items-center gap-4 ml-auto">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                        <span>15 replies</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>210 views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="mt-8 flex justify-center">
            <button className="border border-gray-200 text-[#005C4B] font-bold text-sm px-8 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Discussions
            </button>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-[300px] shrink-0 space-y-6">
          {/* Categories */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Forum Categories</h4>
            </div>
            <div className="p-2">
              {[
                { icon: "campaign", label: "Announcements", count: 12, color: "text-[#005C4B]" },
                { icon: "update", label: "Product Updates", count: 45, color: "text-teal-600" },
                { icon: "quiz", label: "Q&A", count: 328, color: "text-blue-600" },
                { icon: "auto_awesome", label: "User Stories", count: 89, color: "text-amber-500" },
              ].map(({ icon, label, count, color }) => (
                <Link
                  key={label}
                  href="#"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${color}`}>{icon}</span>
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-medium">{count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trending</h4>
            </div>
            <div className="p-5 space-y-4">
              {[
                { title: "Integrating WhatsApp with Salesforce CRM effectively", meta: "42 comments • Trending today" },
                { title: "Creative ways to use interactive buttons in messages", meta: "28 comments • Hot this week" },
                { title: "Handling compliance and opt-out requirements", meta: "15 comments • Highly active" },
              ].map(({ title, meta }) => (
                <div key={title} className="group cursor-pointer">
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#005C4B] transition-colors line-clamp-2">
                    {title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-[#005C4B] p-6 rounded-xl text-white">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-80">Community Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <p className="text-xl font-extrabold">12.4k</p>
                <p className="text-xs opacity-80 mt-0.5">Total Members</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <p className="text-xl font-extrabold">842</p>
                <p className="text-xs opacity-80 mt-0.5">Discussions</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg col-span-2 flex items-center justify-between">
                <div>
                  <p className="text-xl font-extrabold">156</p>
                  <p className="text-xs opacity-80 mt-0.5">Online Now</p>
                </div>
                <div className="w-3 h-3 bg-[#25D366] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

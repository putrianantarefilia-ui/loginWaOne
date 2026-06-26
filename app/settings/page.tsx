"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("api");

  const tabs = [
    { id: "general", label: "General" },
    { id: "profile", label: "Profile" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "api", label: "API & Integrations" },
    { id: "security", label: "Security" },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Page Title & Tabs */}
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-6">Settings</h3>
          <div className="flex items-center border-b border-gray-200 gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-[#005C4B] border-b-2 border-[#005C4B]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Layout Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* API Management — Left 8 cols */}
          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* API Keys Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">API Keys</h4>
                  <p className="text-sm text-gray-500 mt-1">Manage your authentication tokens for production and testing environments.</p>
                </div>
                <button className="bg-[#005C4B] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#004A3C] transition-colors flex items-center gap-2 active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add New API Key
                </button>
              </div>

              <div className="space-y-4">
                {/* Production Key */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#005C4B]/30 transition-colors">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#005C4B]">
                      <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Production Key</p>
                      <p className="font-mono text-xs text-gray-400 tracking-wider mt-0.5">wa_live_••••••••••••••••4f2a</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors" title="Copy">
                      <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    </button>
                    <button className="px-3 py-1.5 text-red-500 text-sm font-bold hover:bg-red-50 rounded-lg transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>

                {/* Test Key */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#005C4B]/30 transition-colors">
                  <div className="flex items-center gap-4 mb-3 md:mb-0">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <span className="material-symbols-outlined text-[20px]">biotech</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Sandbox / Test Key</p>
                      <p className="font-mono text-xs text-gray-400 tracking-wider mt-0.5">wa_test_••••••••••••••••99x1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 transition-colors" title="Copy">
                      <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    </button>
                    <button className="px-3 py-1.5 text-red-500 text-sm font-bold hover:bg-red-50 rounded-lg transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Webhooks Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h4 className="text-lg font-bold text-gray-900">Webhooks</h4>
                <button className="text-[#005C4B] text-sm font-bold hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">add_link</span>
                  Add Webhook
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-bold">Endpoint URL</th>
                      <th className="px-6 py-4 font-bold">Events</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-gray-800 truncate max-w-[200px]">https://api.acme.co/v1/hooks</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-medium">message.sent</span>
                          <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-medium">message.received</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-[#005C4B] font-semibold text-xs">
                          <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></span>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-700">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs text-gray-800 truncate max-w-[200px]">https://dev-hook.internal.io/log</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-medium">delivery.update</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                          Inactive
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-700">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar — 4 cols */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Developer Quickstart Card */}
            <div className="bg-[#005C4B] text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-5">
                <span className="material-symbols-outlined text-[#25D366]">menu_book</span>
                <h4 className="text-base font-bold">Developer Quickstart</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/50 block mb-1.5">Base API URL</label>
                  <div className="bg-black/20 p-2.5 rounded-lg flex justify-between items-center gap-2">
                    <code className="text-xs text-green-300 overflow-hidden truncate">https://api.wa-one.com/v2</code>
                    <button className="text-white/50 hover:text-white shrink-0">
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/50 block mb-1.5">Example Request</label>
                  <div className="bg-black/20 p-3 rounded-lg font-mono text-[11px] leading-relaxed relative group">
                    <pre className="text-green-300 whitespace-pre-wrap">{`curl -X POST \\
  https://api.wa-one.com/v2/messages \\
  -H 'Authorization: Bearer YOUR_KEY' \\
  -d '{ "to": "+123456789", "body": "Hello World" }'`}</pre>
                    <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#004A3C] p-1 rounded text-white shadow">
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <a
                  href="#"
                  className="block text-center py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors"
                >
                  View Full Documentation
                </a>
              </div>
            </div>

            {/* API Usage Stats */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#005C4B]">analytics</span>
                API Usage (Last 24h)
              </h4>
              <div className="flex items-end gap-1 h-24 mb-3">
                {[40, 60, 85, 95, 70, 50].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-grow rounded-t transition-all ${h > 70 ? "bg-[#005C4B]" : "bg-gray-100"}`}
                    style={{ height: `${h}%` }}
                    title={["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"][i]}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                <span>Requests</span>
                <span className="text-[#005C4B]">12,401 Total</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-[10px]">Avg Response</p>
                  <p className="text-gray-800 font-bold text-sm mt-0.5">142ms</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">Error Rate</p>
                  <p className="text-gray-800 font-bold text-sm mt-0.5">0.04%</p>
                </div>
              </div>
            </div>

            {/* Integration Health Card */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005C4B] border border-gray-200 shadow-sm">
                  <span className="material-symbols-outlined">sync_alt</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Integration Sync</p>
                  <p className="text-[#005C4B] text-xs font-semibold mt-0.5">All systems operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

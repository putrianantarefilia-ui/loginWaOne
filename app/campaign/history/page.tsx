import React from "react";
import Link from "next/link";

export default function CampaignHistoryPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-lg text-2xl text-gray-900 font-extrabold tracking-tight">Campaign History</h2>
            <p className="font-body-md text-sm text-gray-500 mt-1">Review performance logs of your past messaging campaigns.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-[#004A3C] text-sm font-bold rounded-lg hover:brightness-95 transition-all shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-[20px]" data-icon="add">add</span>
              New Campaign
            </button>
          </div>
        </section>

        {/* Metrics Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl flex flex-col gap-2 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Historical Success Rate</span>
              <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                <span className="material-symbols-outlined text-[20px]" data-icon="check_circle">check_circle</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl text-gray-900 font-extrabold">98.4%</span>
              <div className="flex items-center gap-1 text-green-600 mt-1">
                <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
                <span className="text-xs">+1.2% from last month</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl flex flex-col gap-2 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Messages Sent</span>
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <span className="material-symbols-outlined text-[20px]" data-icon="send">send</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl text-gray-900 font-extrabold">428,091</span>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <span className="material-symbols-outlined text-[16px]" data-icon="history">history</span>
                <span className="text-xs">Lifetime volume</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl flex flex-col gap-2 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Failed</span>
              <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                <span className="material-symbols-outlined text-[20px]" data-icon="error">error</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl text-gray-900 font-extrabold">6,820</span>
              <div className="flex items-center gap-1 text-red-600 mt-1">
                <span className="material-symbols-outlined text-[16px]" data-icon="warning">warning</span>
                <span className="text-xs">1.5% Failure Average</span>
              </div>
            </div>
          </div>
        </section>

        {/* Table Section with Filters */}
        <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
                <span className="text-sm font-bold">Oct 1, 2023 - Oct 31, 2023</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select className="bg-transparent border-none text-sm text-gray-700 font-bold focus:ring-0 cursor-pointer outline-none">
                <option>Recent First</option>
                <option>Success Rate</option>
                <option>Volume</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="px-6 py-4 text-xs text-gray-400 uppercase tracking-wider font-bold">Campaign Name</th>
                  <th className="px-6 py-4 text-xs text-gray-400 uppercase tracking-wider font-bold">Date</th>
                  <th className="px-6 py-4 text-xs text-gray-400 uppercase tracking-wider font-bold">Total Recipients</th>
                  <th className="px-6 py-4 text-xs text-gray-400 uppercase tracking-wider font-bold">Success Rate</th>
                  <th className="px-6 py-4 text-xs text-gray-400 uppercase tracking-wider font-bold">Open Rate</th>
                  <th className="px-6 py-4 text-xs text-gray-400 uppercase tracking-wider font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Campaign Item 1 */}
                <tr className="hover:bg-gray-50/50 transition-colors group relative">
                  <td className="px-6 py-5 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#25D366]"></div>
                    <div className="flex flex-col pl-2">
                      <span className="text-sm text-gray-900 font-bold">Fall Product Launch 2023</span>
                      <span className="text-xs text-gray-400 mt-0.5">ID: #99281-W</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">Oct 24, 2023</td>
                  <td className="px-6 py-5 text-sm text-gray-700">45,000</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#25D366]" style={{ width: "98.5%" }}></div>
                      </div>
                      <span className="text-sm text-gray-900 font-bold">98.5%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">72.4%</td>
                  <td className="px-6 py-5 text-right">
                    <Link href="#" className="inline-flex items-center gap-1 text-[#005C4B] font-bold text-sm hover:underline">
                      View Report
                      <span className="material-symbols-outlined text-[18px]" data-icon="open_in_new">open_in_new</span>
                    </Link>
                  </td>
                </tr>

                {/* Campaign Item 2 */}
                <tr className="hover:bg-gray-50/50 transition-colors group relative">
                  <td className="px-6 py-5">
                    <div className="flex flex-col pl-2">
                      <span className="text-sm text-gray-900 font-bold">Weekly Newsletter - Oct Week 3</span>
                      <span className="text-xs text-gray-400 mt-0.5">ID: #99102-M</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">Oct 18, 2023</td>
                  <td className="px-6 py-5 text-sm text-gray-700">122,400</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#25D366]" style={{ width: "99.1%" }}></div>
                      </div>
                      <span className="text-sm text-gray-900 font-bold">99.1%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">54.0%</td>
                  <td className="px-6 py-5 text-right">
                    <Link href="#" className="inline-flex items-center gap-1 text-[#005C4B] font-bold text-sm hover:underline">
                      View Report
                      <span className="material-symbols-outlined text-[18px]" data-icon="open_in_new">open_in_new</span>
                    </Link>
                  </td>
                </tr>

                {/* Campaign Item 3 */}
                <tr className="hover:bg-gray-50/50 transition-colors group relative">
                  <td className="px-6 py-5">
                    <div className="flex flex-col pl-2">
                      <span className="text-sm text-gray-900 font-bold">Customer Loyalty Flash Sale</span>
                      <span className="text-xs text-gray-400 mt-0.5">ID: #98871-F</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">Oct 12, 2023</td>
                  <td className="px-6 py-5 text-sm text-gray-700">12,500</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "82.0%" }}></div>
                      </div>
                      <span className="text-sm text-gray-900 font-bold">82.0%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">88.2%</td>
                  <td className="px-6 py-5 text-right">
                    <Link href="#" className="inline-flex items-center gap-1 text-[#005C4B] font-bold text-sm hover:underline">
                      View Report
                      <span className="material-symbols-outlined text-[18px]" data-icon="open_in_new">open_in_new</span>
                    </Link>
                  </td>
                </tr>

                {/* Campaign Item 4 */}
                <tr className="hover:bg-gray-50/50 transition-colors group relative">
                  <td className="px-6 py-5">
                    <div className="flex flex-col pl-2">
                      <span className="text-sm text-gray-900 font-bold">System Maintenance Notice</span>
                      <span className="text-xs text-gray-400 mt-0.5">ID: #98552-S</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">Oct 05, 2023</td>
                  <td className="px-6 py-5 text-sm text-gray-700">250,000</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#25D366]" style={{ width: "97.2%" }}></div>
                      </div>
                      <span className="text-sm text-gray-900 font-bold">97.2%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">31.5%</td>
                  <td className="px-6 py-5 text-right">
                    <Link href="#" className="inline-flex items-center gap-1 text-[#005C4B] font-bold text-sm hover:underline">
                      View Report
                      <span className="material-symbols-outlined text-[18px]" data-icon="open_in_new">open_in_new</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Showing 1-4 of 128 campaigns</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-lg hover:bg-gray-200 disabled:opacity-30 text-gray-600" disabled={true}>
                <span className="material-symbols-outlined text-[20px]" data-icon="chevron_left">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded-lg bg-[#25D366] text-[#004A3C] font-bold text-sm">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-gray-200 text-sm text-gray-600">2</button>
              <button className="px-3 py-1 rounded-lg hover:bg-gray-200 text-sm text-gray-600">3</button>
              <button className="p-1 rounded-lg hover:bg-gray-200 text-gray-600">
                <span className="material-symbols-outlined text-[20px]" data-icon="chevron_right">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

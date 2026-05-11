import React from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-6 px-4 bg-surface-container-lowest border-r border-outline-variant w-[280px] z-50">
        {/* Logo Section dengan Gambar */}
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center">
            {/* Ganti src="/logo.png" dengan path file logomu di folder public */}
            <Image
              src="/logo.jpg"
              alt="Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-[#075E54] leading-tight">Wa One</h1>
            <p className="text-[11px] font-medium text-on-surface-variant leading-tight">Messaging Dashboard</p>
          </div>
        </div>

        <button className="mx-4 mb-6 py-3 px-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">add</span>
          New Message
        </button>

        <nav className="flex-grow space-y-1 overflow-y-auto custom-scrollbar">
          <a className="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-lg px-4 py-3 border-l-4 border-primary transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span>Overview</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">devices</span>
            <span>Devices</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">contacts</span>
            <span>Contacts</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">campaign</span>
            <span>Broadcast</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">forum</span>
            <span>Messages</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto border-t border-outline-variant pt-4 space-y-1">
          <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">help</span>
            <span>Help</span>
          </a>
          <a className="flex items-center gap-4 text-error px-4 py-3 hover:bg-error-container transition-all duration-200 ease-in-out font-label-md text-label-md" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="ml-[280px] bg-surface">
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex justify-between items-center w-full px-8 h-14 bg-surface border-b border-outline-variant transition-colors duration-200">
          <div className="flex items-center gap-4">
            <h2 className="text-headline-lg font-headline-lg font-black text-primary">Overview</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <input className="w-64 pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md focus:ring-2 focus:ring-primary-container transition-all" placeholder="Search analytics..." type="text" />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
              <div className="h-8 w-px bg-outline-variant mx-2"></div>
              <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-surface-container p-1 rounded-lg transition-colors">
                <div className="text-right hidden sm:block">
                  <p className="text-label-md font-bold text-on-surface leading-tight">Refilia Putri Ananta</p>
                  <p className="text-label-sm text-on-surface-variant leading-tight">putrianantarefilia@gmail.com</p>
                </div>
                <div className="relative w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
                  <Image
                    alt="User profile"
                    fill
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMzHqwNHt9BrL8AeBLJsPWuTrkZVXtiTjRIkBIVKQiLieeWRSx6UBNu_M-fuIoven2WPlh7hmSZHOw6m5JLnBe9cw_0BgK-xO76tLiNwanK4VKZSvXn8uG3M383kMRQe609MBAUwlVCeivdYGoE_WweOJ4khRcgulasabhVwLbMn-d678unxv4lSVbosfGN9khChkVoXF2QiOkK0t4SacUTKGFB9s5yt6nat-qYru5cwQb1jIZ4ZspRRvjLHnaXIo1Ik_1RsAzKTI"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </div>
                <span className="text-primary font-bold text-label-md bg-primary-container/20 px-2 py-1 rounded-full">+12%</span>
              </div>
              <h3 className="text-headline-lg font-black text-on-surface leading-none">1,284</h3>
              <p className="text-on-surface-variant text-label-md mt-1 font-medium">Total Messages</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary-container/30 rounded-xl flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <span className="text-secondary font-bold text-label-md bg-secondary-container/40 px-2 py-1 rounded-full">98.2%</span>
              </div>
              <h3 className="text-headline-lg font-black text-on-surface leading-none">1,261</h3>
              <p className="text-on-surface-variant text-label-md mt-1 font-medium">Success Delivery</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-error-container/20 rounded-xl flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                </div>
                <span className="text-error font-bold text-label-md bg-error-container/40 px-2 py-1 rounded-full">-4%</span>
              </div>
              <h3 className="text-headline-lg font-black text-on-surface leading-none">23</h3>
              <p className="text-on-surface-variant text-label-md mt-1 font-medium">Failed Messages</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-on-surface-variant font-bold text-label-md">Online</span>
                </div>
              </div>
              <h3 className="text-headline-lg font-black text-on-surface leading-none">05</h3>
              <p className="text-on-surface-variant text-label-md mt-1 font-medium">Active Devices</p>
            </div>
          </section>

          {/* Main Visual Section - Menggunakan h-fit agar Recent Activity tidak terpotong */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant p-8 relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-headline-md font-bold text-on-surface">Messaging Usages</h3>
                  <p className="text-label-md text-on-surface-variant">Real-time throughput data for the last 7 days</p>
                </div>
                <select className="bg-surface border border-outline-variant rounded-lg text-label-md px-4 py-2 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full flex items-end gap-3 px-4 relative">
                {[
                  { day: 'Mon', height: '45%' },
                  { day: 'Tue', height: '65%' },
                  { day: 'Wed', height: '50%' },
                  { day: 'Thu', height: '85%' },
                  { day: 'Fri', height: '95%', active: true },
                  { day: 'Sat', height: '60%' },
                  { day: 'Sun', height: '70%' },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center group h-full justify-end">
                    <div
                      className={`w-full ${item.active ? 'bg-primary' : 'bg-primary-container opacity-40'} rounded-t-lg transition-opacity`}
                      style={{ height: item.height }}
                    ></div>
                    <span className={`text-label-sm mt-3 ${item.active ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'}`}>{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity - Menggunakan h-fit agar box memanjang sesuai isi */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col h-fit overflow-visible">
              <div className="p-6 border-b border-outline-variant bg-surface-container-low/50">
                <h3 className="text-headline-md font-bold text-on-surface">Recent Activity</h3>
                <p className="text-label-sm text-on-surface-variant">Last 24 hours</p>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg">
                  <div className="mt-1 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined text-sm">done</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-body-md font-bold text-on-surface leading-tight">Broadcast Success</p>
                    <p className="text-label-sm text-on-surface-variant">Marketing Campaign A - 450 recipients</p>
                    <p className="text-label-sm font-medium text-primary mt-1">2 mins ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg border-l-4 border-error/40">
                  <div className="mt-1 w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-sm">warning</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-body-md font-bold text-on-surface leading-tight">Device Disconnected</p>
                    <p className="text-label-sm text-on-surface-variant">Work Laptop (WA-Web-004)</p>
                    <p className="text-label-sm font-medium text-error mt-1">15 mins ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg">
                  <div className="mt-1 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-body-md font-bold text-on-surface leading-tight">New Contacts Imported</p>
                    <p className="text-label-sm text-on-surface-variant">128 new entries from CSV</p>
                    <p className="text-label-sm font-medium text-on-surface-variant mt-1">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 hover:bg-surface-container transition-colors rounded-lg">
                  <div className="mt-1 w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined text-sm">done</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-body-md font-bold text-on-surface leading-tight">System Update</p>
                    <p className="text-label-sm text-on-surface-variant">API connectivity optimized</p>
                    <p className="text-label-sm font-medium text-on-surface-variant mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface border-t border-outline-variant rounded-b-xl">
                <button className="w-full py-2 bg-surface-container-high text-on-surface-variant text-label-md font-bold rounded-lg hover:bg-outline-variant transition-colors">
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
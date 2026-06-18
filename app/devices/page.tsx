"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScanQrCode } from "lucide-react";
import { usePathname } from "next/navigation";

interface Device {
  id: string;
  sessionCode: string;
  name: string;
  type: "laptop" | "smartphone" | "tablet" | "desktop";
  status: "Connected" | "Linking" | "Disconnected";
  created: string;
  updated: string;
}

export default function DevicesPage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      sessionCode: "SESS-7721-X",
      name: "MacBook Pro - Chrome",
      type: "laptop",
      status: "Connected",
      created: "Oct 24, 2023",
      updated: "2 mins ago",
    },
    {
      id: "2",
      sessionCode: "SESS-8812-Y",
      name: "iPhone 15 Pro Max",
      type: "smartphone",
      status: "Linking",
      created: "Nov 12, 2023",
      updated: "Just now",
    },
    {
      id: "3",
      sessionCode: "SESS-1092-A",
      name: "Samsung Galaxy Tab S9",
      type: "tablet",
      status: "Disconnected",
      created: "Sep 05, 2023",
      updated: "3 days ago",
    },
    {
      id: "4",
      sessionCode: "SESS-4432-P",
      name: "Windows Desktop App",
      type: "desktop",
      status: "Connected",
      created: "Jan 10, 2024",
      updated: "1 hour ago",
    },
  ]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedDevices(devices.map((d) => d.id));
    } else {
      setSelectedDevices([]);
    }
  };

  const handleSelectDevice = (id: string) => {
    setSelectedDevices((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleToggleConnection = (id: string) => {
    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === id) {
          return {
            ...device,
            status:
              device.status === "Connected"
                ? "Disconnected"
                : "Connected",
            updated: "Just now",
          };
        }
        return device;
      })
    );
  };

  const filteredDevices = devices.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.sessionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#005C4B] text-white flex flex-col shrink-0">
        {/* Logo */}
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
            <p className="text-[10px] tracking-widest uppercase opacity-70">
              Messaging
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="px-4 mb-8">
          <button className="w-full bg-[#25D366] hover:bg-green-500 text-[#004A3C] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 4v16m8-8H4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            New Message
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === "/dashboard"
              ? "bg-white/10 text-[#25D366] font-semibold"
              : "text-white/70 hover:text-white"
              }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </Link>

          <Link
            href="/devices"
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === "/devices"
              ? "bg-white/10 text-[#25D366] font-semibold"
              : "text-white/70 hover:text-white"
              }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Devices
          </Link>

          <Link
            href="/contacts"
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === "/contacts"
              ? "bg-white/10 text-[#25D366] font-semibold"
              : "text-white/70 hover:text-white"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.287-.24-1.891M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.287.24-1.891m0 0a5.002 5.002 0 019.52 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM6 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Contacts
          </Link>

          <Link
            href="/groups"
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === "/groups"
              ? "bg-white/10 text-[#25D366] font-semibold"
              : "text-white/70 hover:text-white"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Groups
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 text-white/70 hover:text-white p-3 rounded-xl transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5.882V19.24a1 1 0 001.447.894l4.105-2.053a1 1 0 011.342.447l.894 1.789A1 1 0 0020.684 21H21a1 1 0 001-1v-5.684a1 1 0 00-.553-.894l-8-4A1 1 0 0012 10V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1v-4.118z"
              />
            </svg>
            Campaign
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 text-white/70 hover:text-white p-3 rounded-xl transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Forum
          </Link>

          <Link
            href="#"
            className="flex items-center gap-3 text-white hover:text-white p-3 rounded-xl transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.591c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.591 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.591-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.591c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.591-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Settings
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-6">
          <button className="flex items-center gap-3 text-red-400 font-bold hover:text-red-300 transition-colors">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-[#005C4B]">Devices</h2>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#F0F2F5]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Devices Management
                </h2>

                <p className="text-gray-500 text-sm">
                  Manage your connected devices
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#005C4B] hover:bg-[#004A3C] text-white rounded-xl font-bold"
              >
                Add New Device
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b">
                      <th className="p-4 w-12 text-center">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectedDevices.length === devices.length}
                        />
                      </th>

                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                        Action
                      </th>

                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                        Session Code
                      </th>

                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                        Device Name
                      </th>

                      <th className="p-4 text-center text-xs font-bold text-gray-400 uppercase">
                        Status
                      </th>

                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                        Created
                      </th>

                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">
                        Updated
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">
                    {filteredDevices.map((device) => {
                      const isSelected = selectedDevices.includes(device.id);

                      return (
                        <tr
                          key={device.id}
                          className="h-16 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                handleSelectDevice(device.id)
                              }
                            />
                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-4 w-[100px]">
                            <div className="flex items-center gap-2">
                              {/* Edit */}
                              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#005C4B] transition-colors">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>

                              {/* Delete */}
                              <button className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                                  />
                                </svg>
                              </button>

                              {/* Scan QR */}
                              <button
                                onClick={() => setShowQrModal(true)}
                                className="p-2 rounded-lg hover:bg-green-50 text-gray-500 hover:text-[#005C4B] transition-colors"
                                title="Scan QR Code"
                              >
                                <ScanQrCode
                                  size={20}
                                  className="w-5 h-5"
                                />
                              </button>
                            </div>
                          </td>

                          <td className="p-4 font-mono text-sm font-bold text-gray-600">
                            {device.sessionCode}
                          </td>

                          <td className="p-4">
                            <span className="text-sm font-semibold text-gray-800">
                              {device.name}
                            </span>
                          </td>

                          <td className="p-4">
                            <div className="flex justify-center">
                              {device.status === "Connected" && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCF8C6] text-[#075E54]">
                                  Connected
                                </span>
                              )}

                              {device.status === "Disconnected" && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-600">
                                  Disconnected
                                </span>
                              )}

                              {device.status === "Linking" && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                                  Linking
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-4 text-sm text-gray-500">
                            {device.created}
                          </td>

                          <td className="p-4 text-sm text-gray-500">
                            {device.updated}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t bg-white flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">
                  Showing 1-{filteredDevices.length} of {devices.length} devices
                </span>

                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-[#005C4B] text-white rounded-lg font-bold">
                    1
                  </button>

                  <button className="w-10 h-10 hover:bg-white text-gray-500 rounded-lg">
                    2
                  </button>

                  <button className="w-10 h-10 hover:bg-white text-gray-500 rounded-lg">
                    3
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white w-[500px] rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-[#005C4B]">
                  Add New Device
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-2xl text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Device Name
                  </label>

                  <input
                    type="text"
                    placeholder="Example: iPhone 15"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="08xxxxxxxxxxx"
                    value={phoneNumber}
                    onChange={(e) => {
                      const numbersOnly = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(numbersOnly);
                    }}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button className="px-5 py-2 rounded-xl bg-[#25D366] text-white hover:bg-green-500">
                  Save Device
                </button>
              </div>
            </div>
          </div>
        )}
        {/* QR Modal */}
        {showQrModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-[#005C4B]">
                  Connect Device
                </h2>

                <button
                  onClick={() => setShowQrModal(false)}
                  className="text-2xl text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-8 text-center">

                {/* Fake QR */}
                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border">
                  <Image
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=WA-ONE-CONNECT"
                    alt="QR Code"
                    width={250}
                    height={250}
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-800">
                  Scan QR with WaOne
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Open WaOne → Linked Devices → Link a Device
                </p>

                {/* Status */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                  Waiting for scan...
                </div>

                {/* Button */}
                <button
                  onClick={() => setShowQrModal(false)}
                  className="mt-8 w-full bg-[#005C4B] hover:bg-[#004A3C] text-white py-3 rounded-xl font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
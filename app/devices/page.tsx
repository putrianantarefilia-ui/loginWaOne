"use client";

import React, { useState } from "react";
import Image from "next/image";

import { ScanQrCode } from "lucide-react";


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
    <>
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
                    <tr className="bg-gray-50 border-b border-gray-100">
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
                          className={`hover:bg-gray-50/50 transition-colors group cursor-pointer`}
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
                          <td className="px-3 py-3 text-center">
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
    </>
  );
}
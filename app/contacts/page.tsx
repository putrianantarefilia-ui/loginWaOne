"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Upload, Users, Activity, Ban, PenSquare, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";



interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  label: "VIP Client" | "Internal" | "Partner" | "Standard";
  createdDate: string;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function ContactsPage() {
  const pathname = usePathname();
  // --- Core State ---
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alex Thompson",
      phone: "087745673456",
      avatar: "",
      label: "VIP Client",
      createdDate: "01 Jun 2026"
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      phone: "085345689234",
      avatar: "",
      label: "Internal",
      createdDate: "04 Jun 2026"
    },
    {
      id: "3",
      name: "Michael Kuan",
      phone: "089756849010",
      avatar: "",
      label: "Partner",
      createdDate: "13 Jun 2026"
    },
    {
      id: "4",
      name: "Jessica Wu",
      phone: "087711342235",
      avatar: "",
      label: "Standard",
      createdDate: "20 Jun 2026"
    },
  ]);

  // --- Filtering & Selection & Search States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Modal Dialog States ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQuickMessageModal, setShowQuickMessageModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // --- Form Input States ---
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formLabel, setFormLabel] = useState<Contact["label"]>("Standard");
  const [quickMessageText, setQuickMessageText] = useState("");

  // --- Toast Notification System ---
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Search & Filter Logic ---
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {

      const query = searchTerm.toLowerCase();
      if (!query) return true;

      return (
        contact.name.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query) ||
        contact.label.toLowerCase().includes(query)
      );
    });
  }, [contacts, searchTerm]);

  // Reset page if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);
  // --- Dynamic Stats Counting ---
  const totalContactsCount = 12480 + contacts.length;

  // --- Pagination Slice ---
  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredContacts.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredContacts, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / rowsPerPage));

  // --- Checkbox Selection Handlers ---
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredContacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRowClick = (e: React.MouseEvent, id: string) => {
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLInputElement).type === "checkbox"
    ) {
      return;
    }
    handleSelectOne(id);
  };

  // --- CRUD Operations ---
  const handleOpenAddModal = () => {
    setFormName("");
    setFormPhone("");
    setFormLabel("Standard");
    setShowAddModal(true);
  };

  const handleSaveContact = () => {
    if (!formName.trim() || !formPhone.trim()) {
      addToast("Name and Phone Number are required fields.", "error");
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: formName,
      phone: formPhone,
      avatar: "",
      label: formLabel,
      createdDate: new Date().toLocaleDateString("id-ID"),
    };

    setContacts((prev) => [newContact, ...prev]);
    setShowAddModal(false);
    addToast(`Contact "${formName}" created successfully!`, "success");
  };

  const handleOpenEditModal = (contact: Contact) => {
    setEditingContact(contact);
    setFormName(contact.name);
    setFormPhone(contact.phone);
    setFormLabel(contact.label);
    setShowEditModal(true);
  };

  const handleUpdateContact = () => {
    if (!editingContact) return;
    if (!formName.trim() || !formPhone.trim()) {
      addToast("Name and Phone Number are required fields.", "error");
      return;
    }

    setContacts((prev) =>
      prev.map((c) =>
        c.id === editingContact.id
          ? {
            ...c,
            name: formName,
            phone: formPhone,
            label: formLabel,
          }
          : c
      )
    );
    setShowEditModal(false);
    setEditingContact(null);
    addToast(`Contact "${formName}" updated successfully!`, "success");
  };

  const handleDeleteContact = (contact: Contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      setContacts((prev) => prev.filter((c) => c.id !== contact.id));
      setSelectedIds((prev) => prev.filter((id) => id !== contact.id));
      addToast(`Contact "${contact.name}" removed from database.`, "info");
    }
  };

  const handleImportClick = () => {
    addToast("CSV Import feature coming soon!", "info");
  };

  const handleQuickMessageSend = () => {
    if (!quickMessageText.trim()) {
      addToast("Please write a message content to send.", "error");
      return;
    }
    addToast(`Broadcast message queued for delivery!`, "success");
    setQuickMessageText("");
    setShowQuickMessageModal(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-[#1E293B]">

      {/* ── Toast Notifications ── */}
      <div className="fixed top-5 right-5 z-50 space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl pointer-events-auto transition-all duration-300 transform text-sm font-semibold max-w-sm text-white ${toast.type === "success"
              ? "bg-[#00A86B]"
              : toast.type === "error"
                ? "bg-[#EF4444]"
                : "bg-[#3B82F6]"
              }`}
          >
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white transition-colors font-bold">
              ✕
            </button>
          </div>
        ))}
      </div>

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
            className="flex items-center gap-3 text-white/70 hover:text-white p-3 rounded-xl transition-colors"
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
            className="flex items-center gap-3 bg-white/10 text-[#25D366] p-3 rounded-xl font-semibold"
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
                d="M17 16l4-4m0 0l-4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Dashboard Canvas ── */}
      <main className="flex-1 h-full flex flex-col overflow-hidden">

        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-[#005C4B]">
            Contacts
          </h2>

          <div className="flex items-center gap-6">

            {/* Search */}
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
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
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>

              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  Refilia Putri Ananta
                </p>

                <p className="text-[10px] text-gray-500">
                  putrianantarefilia@gmail.com
                </p>
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

        {/* Scrollable Main Layout Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 [scrollbar-width:thin]">

          {/* Header Title & Bento Stats */}
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-stretch">
            <div className="flex flex-col justify-center max-w-xl">
              <h2 className="text-2xl font-extrabold text-[#0A3D2E] tracking-tight mb-1">Contacts Management</h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                Manage your communication network, track engagement status, and organize contact groups for targeted campaigns.
              </p>
            </div>

            {/* Bento Dynamic Cards Layout */}
            <div className="flex items-center gap-4 w-full xl:w-auto shrink-0">
              <div className="bg-white px-5 py-4 rounded-xl border border-gray-200/60 shadow-sm flex items-center gap-4 min-w-[150px]">
                <div className="text-2xl">👥</div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Total Contacts</p>
                  <h3 className="text-lg font-extrabold text-gray-800">{totalContactsCount.toLocaleString("id-ID")}</h3>
                </div>
              </div>

            </div>
          </div>

          {/* Action Row Filters */}
          <div className="bg-white p-3 rounded-xl border border-gray-200/60 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAddModal}
                className="bg-[#0A3D2E] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all"
              >
                ➕ Add New Contact
              </button>

              <button
                onClick={handleImportClick}
                className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all"
              >
                📤 Import
              </button>
            </div>


          </div>

          {/* Data Table Shell */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200/80">
                    <th className="p-4 w-12 text-center">
                      <input
                        className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                        type="checkbox"
                        checked={filteredContacts.length > 0 && selectedIds.length === filteredContacts.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Contact Name</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Group/Label</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider">Date Added</th>
                    <th className="px-3 py-3 font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedContacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">
                        No contacts found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedContacts.map((contact) => {
                      const isSelected = selectedIds.includes(contact.id);
                      return (
                        <tr
                          key={contact.id}
                          onClick={(e) => handleRowClick(e, contact.id)}
                          className={`hover:bg-gray-50/50 transition-colors group cursor-pointer ${isSelected ? "bg-emerald-50/30 hover:bg-emerald-50/50" : ""
                            }`}
                        >
                          <td className="p-4 text-center">
                            <input
                              className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectOne(contact.id)}
                            />
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0A3D2E]/10 text-[#0A3D2E] flex items-center justify-center font-bold text-xs">
                                {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">{contact.name}</p>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 font-medium text-gray-500 font-mono">{contact.phone}</td>

                          <td className="p-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${contact.label === "VIP Client"
                                ? "bg-purple-100 text-purple-700"
                                : contact.label === "Internal"
                                  ? "bg-gray-100 text-gray-600"
                                  : contact.label === "Partner"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                            >
                              {contact.label}
                            </span>
                          </td>

                          <td className="p-4 text-gray-400">{contact.createdDate}</td>

                          <td className="px-3 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => handleOpenEditModal(contact)}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <PenSquare size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteContact(contact)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Compact Custom Pagination Bar */}
            <div className="px-6 py-3.5 bg-gray-50/50 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
              <p>
                Showing <b>{filteredContacts.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, filteredContacts.length)}</b> of <b>{filteredContacts.length}</b> contacts
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40"
                >
                  ◀ Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 font-bold rounded-md border ${currentPage === idx + 1
                      ? "bg-[#0A3D2E] text-white border-[#0A3D2E]"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40"
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Add Contact Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-xs">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-bold text-[#0A3D2E]">Add New Contact</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0A3D2E] bg-gray-50/50"
                  required
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">Phone Number *</label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0A3D2E] bg-gray-50/50"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-bold text-gray-700">Group Label</label>
                  <select
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value as Contact["label"])}
                    className="w-full border border-gray-200 rounded-lg p-2.5 outline-none bg-gray-50/50 cursor-pointer"
                  >
                    <option value="Standard">Standard</option>
                    <option value="VIP Client">VIP Client</option>
                    <option value="Internal">Internal</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/50">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-all">Cancel</button>
              <button onClick={handleSaveContact} className="px-5 py-2 rounded-lg bg-[#0A3D2E] text-white font-bold hover:brightness-110 transition-all">Save Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Contact Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-xs">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-bold text-[#0A3D2E]">Edit Contact Details</h3>
              <button onClick={() => { setShowEditModal(false); setEditingContact(null); }} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0A3D2E] bg-gray-50/50"
                  required
                />
              </div>
              <div>
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">Phone Number *</label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0A3D2E] bg-gray-50/50"
                  required
                />
              </div>
              <div className="grid grid-cols-1">
                <div>
                  <label className="block mb-1.5 font-bold text-gray-700">Group Label</label>
                  <select
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value as Contact["label"])}
                    className="w-full border border-gray-200 rounded-lg p-2.5 outline-none bg-gray-50/50"
                  >
                    <option value="Standard">Standard</option>
                    <option value="VIP Client">VIP Client</option>
                    <option value="Internal">Internal</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/50">
              <button onClick={() => { setShowEditModal(false); setEditingContact(null); }} className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-all">Cancel</button>
              <button onClick={handleUpdateContact} className="px-5 py-2 rounded-lg bg-[#0A3D2E] text-white font-bold hover:brightness-110 transition-all">Apply Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Message Modal ── */}
      {showQuickMessageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-xs">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-sm font-bold text-[#0A3D2E]">New Broadcast Message</h3>
              <button onClick={() => setShowQuickMessageModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">Target Audience Group</label>
                <select className="w-full border border-gray-200 rounded-lg p-2.5 outline-none bg-gray-50/50">
                  <option>All Dynamic Contacts ({filteredContacts.length} selected)</option>
                  <option>VIP Clients Only ({contacts.filter(c => c.label === "VIP Client").length} selected)</option>
                </select>
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">Message Content *</label>
                <textarea
                  rows={4}
                  placeholder="Type your message here..."
                  value={quickMessageText}
                  onChange={(e) => setQuickMessageText(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#0A3D2E] bg-gray-50/50"
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/50">
              <button onClick={() => setShowQuickMessageModal(false)} className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-all">Cancel</button>
              <button onClick={handleQuickMessageSend} className="px-5 py-2 rounded-lg bg-[#00E676] text-[#0A3D2E] font-bold hover:brightness-105 transition-all">Queue Broadcast</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  Plus,
  PenSquare,
  Trash2,
  Search,
  Check,
  FolderPlus,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from "lucide-react";

// --- Types & Interfaces ---
interface Contact {
  id: string;
  name: string;
  phone: string;
  label: "VIP Client" | "Internal" | "Partner" | "Standard";
  avatar: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  contactIds: string[]; // List of contact IDs belonging to this group
  createdDate: string;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export default function GroupsPage() {
  const pathname = usePathname();

  // --- Dummy Contacts Data (consistent with contacts page) ---
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alex Thompson",
      phone: "087745673456",
      label: "VIP Client",
      avatar: ""
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      phone: "085345689234",
      label: "Internal",
      avatar: ""
    },
    {
      id: "3",
      name: "Michael Kuan",
      phone: "089756849010",
      label: "Partner",
      avatar: ""
    },
    {
      id: "4",
      name: "Jessica Wu",
      phone: "087711342235",
      label: "Standard",
      avatar: ""
    },
    {
      id: "5",
      name: "David Miller",
      phone: "081234567890",
      label: "Standard",
      avatar: ""
    },
    {
      id: "6",
      name: "Elena Rostova",
      phone: "081198765432",
      label: "VIP Client",
      avatar: ""
    }
  ]);

  // --- Dummy Groups Data ---
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Broadcast VIP Client",
      description: "Group khusus untuk broadcast penawaran VIP dan diskon spesial.",
      contactIds: ["1", "6"],
      createdDate: "01 Jun 2026"
    },
    {
      id: "2",
      name: "Internal WAOne",
      description: "Anggota internal team pengembang aplikasi WAOne.",
      contactIds: ["2"],
      createdDate: "04 Jun 2026"
    },
    {
      id: "3",
      name: "Partner Distributor",
      description: "Group untuk mitra distributor dan suplai logistik utama.",
      contactIds: ["3"],
      createdDate: "13 Jun 2026"
    },
    {
      id: "4",
      name: "Promo Broadcast Umum",
      description: "Broadcast promo reguler dan info fitur update WAOne ke client standard.",
      contactIds: ["4", "5"],
      createdDate: "18 Jun 2026"
    }
  ]);

  // --- State Variables ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Modal Dialog States
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  // Form Input States
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [contactSearchTerm, setContactSearchTerm] = useState("");

  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  // --- Toast Functions ---
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
  const filteredGroups = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return groups;
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.description.toLowerCase().includes(query)
    );
  }, [groups, searchTerm]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // --- Stats Calculations ---
  const totalGroups = groups.length;
  const totalUniqueMembers = useMemo(() => {
    const allIds = groups.flatMap((g) => g.contactIds);
    return new Set(allIds).size;
  }, [groups]);
  const averageMembers = useMemo(() => {
    if (totalGroups === 0) return 0;
    const totalMemberships = groups.reduce((sum, g) => sum + g.contactIds.length, 0);
    return Math.round((totalMemberships / totalGroups) * 10) / 10;
  }, [groups, totalGroups]);

  // --- Pagination Slice ---
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredGroups.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredGroups, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredGroups.length / rowsPerPage));

  // --- Group Row Selection ---
  const handleSelectAllGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedGroupIds(filteredGroups.map((g) => g.id));
    } else {
      setSelectedGroupIds([]);
    }
  };

  const handleSelectOneGroup = (id: string) => {
    setSelectedGroupIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- Contact Selector Logic (inside modal) ---
  const filteredContacts = useMemo(() => {
    const query = contactSearchTerm.toLowerCase().trim();
    if (!query) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.label.toLowerCase().includes(query)
    );
  }, [contacts, contactSearchTerm]);

  const handleToggleContact = (contactId: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAllContacts = () => {
    const visibleIds = filteredContacts.map((c) => c.id);
    setSelectedContactIds((prev) => {
      // Add any visible IDs that aren't already selected
      const newSelection = [...prev];
      visibleIds.forEach((id) => {
        if (!newSelection.includes(id)) {
          newSelection.push(id);
        }
      });
      return newSelection;
    });
    addToast("Selected all filtered contacts", "info");
  };

  const handleDeselectAllContacts = () => {
    const visibleIds = filteredContacts.map((c) => c.id);
    setSelectedContactIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    addToast("Deselected all filtered contacts", "info");
  };

  // --- CRUD Modals Handlers ---
  const handleOpenAddModal = () => {
    setEditingGroup(null);
    setFormName("");
    setFormDescription("");
    setSelectedContactIds([]);
    setContactSearchTerm("");
    setShowModal(true);
  };

  const handleOpenEditModal = (group: Group) => {
    setEditingGroup(group);
    setFormName(group.name);
    setFormDescription(group.description);
    setSelectedContactIds([...group.contactIds]);
    setContactSearchTerm("");
    setShowModal(true);
  };

  const handleSaveGroup = () => {
    if (!formName.trim()) {
      addToast("Group Name is required.", "error");
      return;
    }

    if (editingGroup) {
      // Edit mode
      setGroups((prev) =>
        prev.map((g) =>
          g.id === editingGroup.id
            ? {
              ...g,
              name: formName.trim(),
              description: formDescription.trim(),
              contactIds: selectedContactIds
            }
            : g
        )
      );
      addToast(`Group "${formName}" updated successfully!`, "success");
    } else {
      // Create mode
      const newGroup: Group = {
        id: Date.now().toString(),
        name: formName.trim(),
        description: formDescription.trim(),
        contactIds: selectedContactIds,
        createdDate: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      };
      setGroups((prev) => [newGroup, ...prev]);
      addToast(`Group "${formName}" created successfully!`, "success");
    }

    setShowModal(false);
  };

  const handleDeleteGroup = (group: Group) => {
    if (confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
      setGroups((prev) => prev.filter((g) => g.id !== group.id));
      setSelectedGroupIds((prev) => prev.filter((id) => id !== group.id));
      addToast(`Group "${group.name}" deleted.`, "info");
    }
  };

  const handleBulkDelete = () => {
    if (selectedGroupIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedGroupIds.length} selected groups?`)) {
      setGroups((prev) => prev.filter((g) => !selectedGroupIds.includes(g.id)));
      setSelectedGroupIds([]);
      addToast("Selected groups deleted successfully.", "info");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-[#1E293B] font-sans">

      {/* ── Toast Notifications ── */}
      <div className="fixed top-5 right-5 z-50 space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl pointer-events-auto transition-all duration-300 transform text-sm font-semibold max-w-sm text-white animate-fade-in ${toast.type === "success"
              ? "bg-[#00A86B]"
              : toast.type === "error"
                ? "bg-[#EF4444]"
                : "bg-[#3B82F6]"
              }`}
          >
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/80 hover:text-white transition-colors font-bold pl-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ── Left Sidebar Navigation ── */}
      <aside className="w-64 bg-[#005C4B] text-white flex flex-col shrink-0">

        {/* Brand/Logo Header */}
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

        {/* New Message Quick Action Button */}
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

        {/* Sidebar Nav Links */}
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
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pathname === "/groups" || pathname?.startsWith("/groups")
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

        {/* Logout Bottom Action */}
        <div className="p-6">
          <button className="flex items-center gap-3 text-red-400 font-bold hover:text-red-300 transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Panel Canvas ── */}
      <main className="flex-1 h-full flex flex-col overflow-hidden">

        {/* Header Ribbon */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <Users className="text-[#005C4B] w-6 h-6" />
            <h2 className="text-2xl font-bold text-[#005C4B]">Group Contacts</h2>
          </div>

          <div className="flex items-center gap-6">

            {/* Search Analytics input bar placeholder */}
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={16} className="text-gray-400" />
              </span>
              <input
                className="block w-full pl-10 pr-3 py-2 border-none bg-gray-100 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#005C4B]"
                placeholder="Search groups..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notification Alert Bell */}
            <button className="relative text-gray-600 hover:text-[#005C4B] transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* User Profile Info */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">
                  Refilia Putri Ananta
                </p>
                <p className="text-[10px] text-gray-500">
                  putrianantarefilia@gmail.com
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden relative bg-gray-200">
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

        {/* Scrollable Layout Canvas */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 [scrollbar-width:thin]">

          {/* Header Title Section & Stats Bento Layout */}
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-stretch">
            <div className="flex flex-col justify-center max-w-xl">
              <h2 className="text-2xl font-extrabold text-[#0A3D2E] tracking-tight mb-1">
                Broadcast Groups Management
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed">
                Create contact segments to easily broadcast updates, newsletters, or marketing promos. Contacts can belong to multiple groups simultaneously.
              </p>
            </div>

            {/* Stats Cards Row */}
            <div className="flex items-center gap-4 flex-wrap w-full xl:w-auto shrink-0">

              {/* Stat: Total Groups */}
              <div className="bg-white px-5 py-4 rounded-xl border border-gray-200/60 shadow-sm flex items-center gap-4 min-w-[150px] flex-1 sm:flex-initial">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-xl">
                  📁
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Total Groups
                  </p>
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {totalGroups}
                  </h3>
                </div>
              </div>

              {/* Stat: Total Members */}
              <div className="bg-white px-5 py-4 rounded-xl border border-gray-200/60 shadow-sm flex items-center gap-4 min-w-[150px] flex-1 sm:flex-initial">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-xl">
                  👥
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Unique Members
                  </p>
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {totalUniqueMembers}
                  </h3>
                </div>
              </div>

              {/* Stat: Avg Members */}
              <div className="bg-white px-5 py-4 rounded-xl border border-gray-200/60 shadow-sm flex items-center gap-4 min-w-[150px] flex-1 sm:flex-initial">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-xl">
                  📊
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    Avg Members / Group
                  </p>
                  <h3 className="text-lg font-extrabold text-gray-800">
                    {averageMembers}
                  </h3>
                </div>
              </div>

            </div>
          </div>

          {/* Action Row & Bulk Operations */}
          <div className="bg-white p-3 rounded-xl border border-gray-200/60 shadow-sm flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAddModal}
                className="bg-[#0A3D2E] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-sm"
              >
                <FolderPlus size={14} />
                Create New Group
              </button>

              {selectedGroupIds.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-50 text-red-600 border border-red-200 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-red-100 active:scale-95 transition-all"
                >
                  <Trash2 className="inline mr-1" size={12} />
                  Delete Selected ({selectedGroupIds.length})
                </button>
              )}
            </div>

            {/* Quick group table search bar */}
            <div className="relative w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={14} className="text-gray-400" />
              </span>
              <input
                className="block w-full pl-9 pr-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#005C4B]"
                placeholder="Filter groups..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>

          {/* Group Data Table Container */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200/80">
                    <th className="p-4 w-12 text-center">
                      <input
                        className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                        type="checkbox"
                        checked={filteredGroups.length > 0 && selectedGroupIds.length === filteredGroups.length}
                        onChange={handleSelectAllGroups}
                      />
                    </th>
                    <th className="px-3 py-3 w-1/4 font-bold text-gray-500 uppercase tracking-wider">
                      Group Name
                    </th>
                    <th className="px-3 py-3 w-[180px] font-bold text-gray-500 uppercase tracking-wider text-center">
                      Members
                    </th>
                    <th className="px-3 py-3 w-5/12 font-bold text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-3 py-3 w-1/10 font-bold text-gray-500 uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedGroups.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 font-medium">
                        No groups found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedGroups.map((group) => {
                      const isSelected = selectedGroupIds.includes(group.id);

                      // Map contact IDs to actual contact names for avatars
                      const groupContacts = group.contactIds
                        .map((id) => contacts.find((c) => c.id === id))
                        .filter(Boolean) as Contact[];

                      return (
                        <tr
                          key={group.id}
                          className={`hover:bg-gray-50/50 transition-colors group cursor-pointer ${isSelected ? "bg-emerald-50/30 hover:bg-emerald-50/50" : ""
                            }`}
                          onClick={(e) => {
                            // Prevent row click if clicked on action buttons or checkboxes
                            const target = e.target as HTMLElement;
                            if (
                              target.closest("button") ||
                              target.closest("a") ||
                              (target as HTMLInputElement).type === "checkbox"
                            ) {
                              return;
                            }
                            handleSelectOneGroup(group.id);
                          }}
                        >
                          {/* Selection Checkbox */}
                          <td className="p-4 text-center">
                            <input
                              className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectOneGroup(group.id)}
                            />
                          </td>

                          {/* Group Name */}
                          <td className="p-4 font-bold text-gray-800">
                            <div className="flex flex-col">
                              <span>{group.name}</span>
                              <span className="text-[10px] text-gray-400 font-medium normal-case mt-0.5">
                                Created on {group.createdDate}
                              </span>
                            </div>
                          </td>

                          {/* Member Count */}
                          <td className="p-4 text-center">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DCF8C6] text-[#075E54]">
                              {group.contactIds.length} members
                            </span>
                          </td>

                          {/* Description */}
                          <td className="p-4 text-gray-500 font-medium leading-relaxed truncate max-w-xs">
                            {group.description || <span className="text-gray-300 italic">No description provided</span>}
                          </td>

                          {/* Action Controls */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal(group)}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Edit Group"
                              >
                                <PenSquare size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteGroup(group)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete Group"
                              >
                                <Trash2 size={16} />
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

            {/* Custom Pagination Footer Bar */}
            <div className="px-6 py-3.5 bg-gray-50/50 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
              <p>
                Showing <b>{filteredGroups.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, filteredGroups.length)}</b> of <b>{filteredGroups.length}</b> groups
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 text-[11px]"
                >
                  <ChevronLeft size={12} />
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-7 h-7 font-bold rounded-md border text-[11px] ${currentPage === idx + 1
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
                  className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 text-[11px]"
                >
                  Next
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Add / Edit Group Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 text-xs flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Users className="text-[#0A3D2E] w-5 h-5" />
                <h3 className="text-sm font-bold text-[#0A3D2E]">
                  {editingGroup ? "Edit Group Contact" : "Create New Group"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">

              {/* Group Name Field */}
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">
                  Group Name (Nama Group) *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. VIP Clients Jawa Timur"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#0A3D2E] focus:border-[#0A3D2E] bg-gray-50/50 font-semibold"
                  required
                />
              </div>

              {/* Group Description Field */}
              <div>
                <label className="block mb-1.5 font-bold text-gray-700">
                  Description (Deskripsi)
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Description of group purpose, e.g. broadcast promo..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#0A3D2E] focus:border-[#0A3D2E] bg-gray-50/50"
                />
              </div>

              {/* Contact Members Checklist Selector */}
              <div className="border border-gray-200/80 rounded-xl p-4 space-y-3 bg-gray-50/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                      <UserPlus size={14} className="text-[#005C4B]" />
                      Select Contacts ({selectedContactIds.length} selected)
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Check contacts to add to this broadcast group.
                    </p>
                  </div>

                  {/* Select/Deselect All buttons */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSelectAllContacts}
                      className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-600 transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={handleDeselectAllContacts}
                      className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-600 transition-colors"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                {/* Contact Search Sub-bar */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center">
                    <Search size={12} className="text-gray-400" />
                  </span>
                  <input
                    type="text"
                    value={contactSearchTerm}
                    onChange={(e) => setContactSearchTerm(e.target.value)}
                    placeholder="Search contact name or number..."
                    className="w-full border border-gray-200 rounded-lg pl-8 pr-2.5 py-1.5 outline-none text-[11px] bg-white"
                  />
                </div>

                {/* Checklist list */}
                <div className="divide-y divide-gray-100 overflow-y-auto max-h-48 border border-gray-100 rounded-lg bg-white">
                  {filteredContacts.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 italic">
                      No contacts found matching search.
                    </div>
                  ) : (
                    filteredContacts.map((contact) => {
                      const isChecked = selectedContactIds.includes(contact.id);
                      return (
                        <div
                          key={contact.id}
                          onClick={() => handleToggleContact(contact.id)}
                          className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-50/80 cursor-pointer transition-colors ${isChecked ? "bg-emerald-50/20" : ""
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => { }} // Controlled by row click handleToggleContact
                            className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                          />
                          <div className="w-7 h-7 rounded-full bg-[#0A3D2E]/10 text-[#0A3D2E] flex items-center justify-center font-bold text-[10px] shrink-0">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 truncate">
                              {contact.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono">
                              {contact.phone}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${contact.label === "VIP Client"
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
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGroup}
                className="px-5 py-2 rounded-lg bg-[#0A3D2E] text-white font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Check size={14} />
                {editingGroup ? "Apply Changes" : "Save Group"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

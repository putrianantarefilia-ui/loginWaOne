"use client";

import React, { useState, useMemo, useEffect } from "react";


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
    <>

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

          <div className="max-w-7xl mx-auto space-y-8">

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
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 w-12 text-center">
                        <input
                          className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                          type="checkbox"
                          checked={filteredGroups.length > 0 && selectedGroupIds.length === filteredGroups.length}
                          onChange={handleSelectAllGroups}
                        />
                      </th>
                      <th className="p-4 w-1/4 text-xs font-bold text-gray-400 uppercase">
                        Group Name
                      </th>
                      <th className="p-4 w-[180px] text-xs font-bold text-gray-400 uppercase text-center">
                        Members
                      </th>
                      <th className="p-4 w-5/12 text-xs font-bold text-gray-400 uppercase">
                        Description
                      </th>
                      <th className="p-4 w-1/10 text-xs font-bold text-gray-400 uppercase text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">
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
              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                <span className="text-xs font-bold text-gray-400">
                  Showing 1-{filteredGroups.length} of {groups.length} groups
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 hover:bg-white text-gray-500 rounded-lg disabled:opacity-40 flex items-center justify-center font-bold text-xs"
                  >
                    ◀
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-10 h-10 font-bold rounded-lg ${currentPage === idx + 1
                        ? "bg-[#005C4B] text-white"
                        : "hover:bg-white text-gray-500"
                        }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 hover:bg-white text-gray-500 rounded-lg disabled:opacity-40 flex items-center justify-center font-bold text-xs"
                  >
                    ▶
                  </button>
                </div>
              </div>

            </div>
          </div>

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
    </>
  );
}

"use client";

import React, { useState, useMemo, useEffect } from "react";

import { Plus, Upload, Users, Activity, Ban, PenSquare, Trash2 } from "lucide-react";




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
    <>

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

          <div className="max-w-7xl mx-auto space-y-8">

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
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 w-12 text-center">
                        <input
                          className="rounded border-gray-300 text-[#0A3D2E] focus:ring-[#0A3D2E] h-3.5 w-3.5 cursor-pointer"
                          type="checkbox"
                          checked={filteredContacts.length > 0 && selectedIds.length === filteredContacts.length}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">Contact Name</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">Phone Number</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">Group/Label</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase">Date Added</th>
                      <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">
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
              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                <span className="text-xs font-bold text-gray-400">
                  Showing 1-{filteredContacts.length} of {contacts.length} contacts
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
                  inputMode="numeric"
                  value={formPhone}
                  onChange={(e) =>
                    setFormPhone(e.target.value.replace(/\D/g, ""))
                  }
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
    </>
  );
}
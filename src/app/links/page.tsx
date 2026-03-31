"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

export default function LinksPage() {
  const links = useQuery(api.links.list);
  const createLink = useMutation(api.links.create);
  const removeLink = useMutation(api.links.remove);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    destination: "",
    label: "",
  });
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    if (!form.slug.trim() || !form.destination.trim() ||!!form.label.trim()) {
      setError("Slug or destination or label are required.");
      return;
    }
    setCreating(true);
    setError("");
    try {
      await createLink({
        slug: form.slug.trim(),
        destination: form.destination.trim(),
        label: form.label.trim(),
      });
      setForm({ slug: "", destination: "", label: ""});
      setShowModal(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create link.");
    } finally {
      setCreating(false);
    }
  }

  function timeAgo(ts: number) {
    const d = Date.now() - ts;
    if (d < 60000) return "just now";
    if (d < 3600000) return `${Math.round(d / 60000)}m ago`;
    if (d < 86400000) return `${Math.round(d / 3600000)}h ago`;
    return `${Math.round(d / 86400000)}d ago`;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-900">Links</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          + New link
        </button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {links === undefined ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
        ) : links.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No links yet. Create your first one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Destination</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Label</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Intended for</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Clicks</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Last click</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {links.map((link) => (
                <tr key={link._id} className="hover:bg-gray-50 group">
                  <td className="px-4 py-3">
                    <Link
                      href={`/links/${link.slug}`}
                      className="font-mono text-sm text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      /{link.slug}
                    </Link>
                  </td>
                  <td className="px-4 py-3 max-w-[220px]">
                    <span className="text-gray-500 text-xs truncate block" title={link.destination}>
                      {link.destination}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{link.label ?? "—"}</td>
                 
                  <td className="px-4 py-3 text-right font-mono text-gray-900">
                    {link.totalClicks.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {link.lastClickedAt ? timeAgo(link.lastClickedAt) : "Never"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     
                      <button
                        onClick={() => {
                          if (confirm(`Delete /${link.slug}?`)) {
                            removeLink({ id: link._id as Id<"links"> });
                          }
                        }}
                        className="px-2 py-1 text-xs text-red-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-6 shadow-xl">
            <h2 className="text-base font-medium text-gray-900 mb-5">New link</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. cv"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
                />
                {form.slug && (
                  <p className="mt-1 text-xs text-gray-400">
                    yourdomain.com/<span className="font-mono">{form.slug}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Destination</label>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  Label <span className="text-gray-300">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="My resume"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

             

              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => { setShowModal(false); setError(""); }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
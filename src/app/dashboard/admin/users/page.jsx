"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import RefreshButton from "@/components/shared/RefreshButton";
import { showConfirm } from "@/components/shared/ConfirmToast";
import { FaSearch, FaUsers, FaTrash, FaStar } from "react-icons/fa";
import { toast } from "sonner";

const ROLES = ["user", "bara", "moderator", "admin"];

const roleStyle = {
  admin:     "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  moderator: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  bara:      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  user:      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const TABS = [
  { key: "all",       label: "All Members" },
  { key: "bara",      label: "⭐ Bara"      },
  { key: "moderator", label: "🛡️ Moderator" },
  { key: "admin",     label: "👑 Admin"     },
];

export default function AdminUsersPage() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [updatingEmail, setUpdatingEmail] = useState(null);

  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["admin-users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users${search ? `?filter=${search}` : ""}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ email, role }) => {
      setUpdatingEmail(email);
      return axiosSecure.patch(`/users/${email}/role`, { role });
    },
    onSuccess: (_, { role, email }) => {
      setUpdatingEmail(null);
      toast.success("Role updated ✓", { description: `New role: ${role}` });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (_, { email }) => {
      setUpdatingEmail(null);
      toast.error("Failed to update role");
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (email) => axiosSecure.delete(`/users/${email}/role`),
    onSuccess: () => {
      toast.success("Member removed", { description: "User has been permanently deleted" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => toast.error("Failed to delete user"),
  });

  const filtered = users.filter((u) => tab === "all" ? true : u.role === tab);

  const handleRefresh = () => queryClient.invalidateQueries({ queryKey: ["admin-users"] });

  return (
    <RoleGuard allowed={["admin"]}>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
              <FaUsers className="text-yellow-500" /> User Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage members and assign roles</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-yellow-400 w-56"
              />
            </div>
            <RefreshButton onRefresh={handleRefresh} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === t.key
                  ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/20"
                  : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-yellow-400"
              }`}
            >
              {t.label}
              <span className="ml-2 text-xs opacity-70">
                ({users.filter(u => t.key === "all" ? true : u.role === t.key).length})
              </span>
            </button>
          ))}
        </div>

        {tab === "bara" && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-2xl flex items-center gap-3">
            <FaStar className="text-yellow-500 text-xl flex-shrink-0" />
            <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
              Bara members hold a special status — they are the core group of Bondu Chol.
            </p>
          </div>
        )}

        {isLoading ? <Loading /> : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/60 text-left">
                    <th className="py-3 px-5 text-xs font-black uppercase tracking-widest text-gray-400">Member</th>
                    <th className="py-3 px-5 text-xs font-black uppercase tracking-widest text-gray-400 hidden md:table-cell">Email</th>
                    <th className="py-3 px-5 text-xs font-black uppercase tracking-widest text-gray-400">Role</th>
                    <th className="py-3 px-5 text-xs font-black uppercase tracking-widest text-gray-400 hidden sm:table-cell">Joined</th>
                    <th className="py-3 px-5 text-xs font-black uppercase tracking-widest text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u._id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}`} alt=""
                            className="w-9 h-9 rounded-full border-2 border-yellow-400 flex-shrink-0 object-cover" />
                          <span className="font-bold text-gray-800 dark:text-white text-sm">{u.displayName || "—"}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">{u.email}</td>
                      <td className="py-3 px-5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${roleStyle[u.role] || roleStyle.user}`}>
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-xs text-gray-400 hidden sm:table-cell">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          {/* Role select with loading state */}
                          <div className="relative">
                            <select
                              defaultValue={u.role || "user"}
                              disabled={updatingEmail === u.email}
                              onChange={(e) => {
                                const newRole = e.target.value;
                                const el = e.target;
                                showConfirm({
                                  title: "Change role?",
                                  description: `Change ${u.displayName}'s role from "${u.role || "user"}" to "${newRole}".`,
                                  confirmLabel: "Yes, change it",
                                  variant: "warning",
                                  onConfirm: () => updateRole({ email: u.email, role: newRole }),
                                });
                                el.value = u.role || "user";
                              }}
                              className="text-xs font-bold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer disabled:opacity-50"
                            >
                              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                            {updatingEmail === u.email && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg">
                                <div className="w-3.5 h-3.5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => showConfirm({
                              title: `Remove ${u.displayName}?`,
                              description: `${u.email} — This member will be permanently deleted.`,
                              confirmLabel: "Yes, remove",
                              variant: "danger",
                              onConfirm: () => deleteUser(u.email),
                            })}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400 font-medium">No members found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}

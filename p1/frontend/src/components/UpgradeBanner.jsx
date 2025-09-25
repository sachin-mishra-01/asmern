import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

export default function UpgradeBanner({ notesCount }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function upgrade() {
    if (!user) return;
    if (user.role !== "admin") {
      alert("Only Admin can upgrade. Ask your Admin to upgrade.");
      return;
    }
    if (!confirm("Upgrade tenant to Pro? This removes note limit.")) return;
    setLoading(true);
    const res = await api(`/api/tenants/${user.tenantSlug}/upgrade`, "POST");
    setLoading(false);
    if (!res.ok) {
      alert(res.body?.error || "Upgrade failed");
    } else {
      alert("Upgraded to Pro successfully. You can now create unlimited notes.");
      // reload page or notes - easiest: reload
      window.location.reload();
    }
  }

  return (
    <div className="p-3 mb-4 rounded bg-yellow-50 border border-yellow-200 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">Free plan limit reached ({notesCount} / 3)</div>
        <div className="text-xs text-slate-600">Upgrade to Pro to create unlimited notes</div>
      </div>
      <div>
        {user?.role === "admin" ? (
          <button onClick={upgrade} className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
            {loading ? "Upgrading..." : "Upgrade to Pro"}
          </button>
        ) : (
          <div className="text-sm text-slate-600">Ask your Admin to upgrade</div>
        )}
      </div>
    </div>
  );
}

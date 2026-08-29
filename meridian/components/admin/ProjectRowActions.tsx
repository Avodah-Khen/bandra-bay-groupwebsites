"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function ProjectRowActions({
  id,
  field,
  active,
}: {
  id: number;
  field: "published" | "featured" | "delete";
  active: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (field === "delete") {
    return (
      <button
        disabled={loading}
        onClick={async () => {
          if (!confirm("Delete this project permanently? This cannot be undone.")) return;
          setLoading(true);
          await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
          router.refresh();
        }}
        className="text-red-400 hover:text-red-300 disabled:opacity-50"
        aria-label="Delete project"
      >
        <Trash2 size={16} />
      </button>
    );
  }

  async function toggle() {
    setLoading(true);
    await fetch(`/api/admin/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !active }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`relative w-10 h-5 rounded-full transition-colors disabled:opacity-50 ${active ? "bg-accent-gradient" : "bg-white/10"}`}
      aria-pressed={active}
      aria-label={`Toggle ${field}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${active ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );
}

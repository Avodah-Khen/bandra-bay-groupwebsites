"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { parseJsonArray } from "@/lib/utils";

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEdit = Boolean(project);
  const [slug, setSlug] = useState(project?.slug || "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);
    const toList = (name: string) =>
      String(data.get(name) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
      title: data.get("title"),
      slug,
      category: data.get("category"),
      status: data.get("status"),
      short_description: data.get("short_description"),
      description: data.get("description"),
      location: data.get("location"),
      city: data.get("city"),
      address: data.get("address"),
      starting_price: data.get("starting_price") ? Number(data.get("starting_price")) : null,
      price_unit: data.get("price_unit") || "INR",
      area_range: data.get("area_range"),
      configurations: toList("configurations"),
      amenities: toList("amenities"),
      highlights: toList("highlights"),
      hero_image: data.get("hero_image"),
      gallery: toList("gallery"),
      rera_number: data.get("rera_number"),
      possession_date: data.get("possession_date"),
      featured: data.get("featured") === "on",
      published: data.get("published") === "on",
      seo_title: data.get("seo_title"),
      seo_description: data.get("seo_description"),
    };

    try {
      const res = await fetch(isEdit ? `/api/admin/projects/${project!.id}` : "/api/admin/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3">{error}</p>}

      <Section title="Basics">
        <Field label="Project Title">
          <input
            name="title"
            required
            defaultValue={project?.title}
            className="input-field"
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug (used in the URL)">
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className="input-field"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select name="category" defaultValue={project?.category || "residential"} className="input-field">
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={project?.status || "ongoing"} className="input-field">
              <option value="upcoming">Upcoming</option>
              <option value="new_launch">New Launch</option>
              <option value="ongoing">Under Construction</option>
              <option value="ready_to_move">Ready to Move</option>
              <option value="completed">Completed</option>
              <option value="sold_out">Sold Out</option>
            </select>
          </Field>
        </div>
        <Field label="Short Description (used on cards)">
          <input name="short_description" defaultValue={project?.short_description || ""} className="input-field" maxLength={300} />
        </Field>
        <Field label="Full Description">
          <textarea name="description" rows={5} defaultValue={project?.description || ""} className="input-field" />
        </Field>
      </Section>

      <Section title="Location">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Location / Locality"><input name="location" defaultValue={project?.location || ""} className="input-field" /></Field>
          <Field label="City"><input name="city" defaultValue={project?.city || ""} className="input-field" /></Field>
        </div>
        <Field label="Full Address"><input name="address" defaultValue={project?.address || ""} className="input-field" /></Field>
      </Section>

      <Section title="Pricing & Specs">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Starting Price (numeric)"><input type="number" step="1" name="starting_price" defaultValue={project?.starting_price ?? ""} className="input-field" /></Field>
          <Field label="Price Unit"><input name="price_unit" defaultValue={project?.price_unit || "INR"} className="input-field" /></Field>
          <Field label="Area Range"><input name="area_range" placeholder="e.g. 650 – 1450 sq.ft" defaultValue={project?.area_range || ""} className="input-field" /></Field>
        </div>
        <Field label="Configurations (comma separated)">
          <input name="configurations" placeholder="1 BHK, 2 BHK, 3 BHK" defaultValue={parseJsonArray(project?.configurations).join(", ")} className="input-field" />
        </Field>
        <Field label="Possession Date"><input type="date" name="possession_date" defaultValue={project?.possession_date || ""} className="input-field" /></Field>
        <Field label="RERA Number"><input name="rera_number" defaultValue={project?.rera_number || ""} className="input-field" /></Field>
      </Section>

      <Section title="Media & Content">
        <Field label="Hero Image URL"><input name="hero_image" defaultValue={project?.hero_image || ""} className="input-field" placeholder="https://..." /></Field>
        <Field label="Gallery Image URLs (comma separated)">
          <input name="gallery" defaultValue={parseJsonArray(project?.gallery).join(", ")} className="input-field" />
        </Field>
        <Field label="Highlights (comma separated)">
          <input name="highlights" placeholder="Sea-facing towers, Club house, Metro connectivity" defaultValue={parseJsonArray(project?.highlights).join(", ")} className="input-field" />
        </Field>
        <Field label="Amenities (comma separated)">
          <input name="amenities" placeholder="Swimming Pool, Gymnasium, Kids Play Area" defaultValue={parseJsonArray(project?.amenities).join(", ")} className="input-field" />
        </Field>
      </Section>

      <Section title="SEO">
        <Field label="SEO Title"><input name="seo_title" defaultValue={project?.seo_title || ""} className="input-field" /></Field>
        <Field label="SEO Description"><input name="seo_description" defaultValue={project?.seo_description || ""} className="input-field" /></Field>
      </Section>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="featured" defaultChecked={Boolean(project?.featured)} /> Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="published" defaultChecked={project ? Boolean(project.published) : true} /> Published (visible on site)
        </label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-ink/10">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading && <Loader2 className="animate-spin" size={16} />}
          {isEdit ? "Save Changes" : "Create Project"}
        </button>
        <button type="button" onClick={() => router.push("/admin/projects")} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-stone-dark border border-ink/10 rounded-xl p-6 space-y-4">
      <h2 className="font-display text-lg text-ink">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label-field">{label}</label>
      {children}
    </div>
  );
}

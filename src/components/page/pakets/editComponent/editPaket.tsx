"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import NormalInput from "@/components/page/pakets/component/normalInput";
import PriceInput from "@/components/page/pakets/component/priceInput";
import DynamicListInput from "@/components/page/pakets/component/dynamicInput";
import AddonInput from "@/components/page/pakets/component/addonsInput";
import TypeInput from "@/components/page/pakets/component/typeInput";

import { updatePaket, deletePaket } from "@/lib/pakets";

export default function EditPaket({ paket }: { paket: any }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: paket.name || "",
    price: paket.price || "",
    bonus: paket.bonus || "",
    type: paket.type || "Wedding",
    includes: paket.includes || [""],
    before_event: paket.before_event || [""],
    on_event: paket.on_event || [""],
    add_ons: paket.add_ons || {},
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updatePaket(paket.id, formData);
      window.location.href = "/pakets";
    } catch (err: any) {
      alert(`Failed to update paket: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this paket?");
    if (!confirm) return;

    try {
      setLoading(true);
      await deletePaket(paket.id);
      window.location.href = "/pakets";
    } catch (err: any) {
      alert(`Failed to delete paket: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Paket</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <NormalInput label="Name" value={formData.name} onChange={(val) => handleChange("name", val)} />
        <PriceInput label="Price" value={formData.price} onChange={(val) => handleChange("price", val)} />
        <NormalInput label="Bonus" value={formData.bonus} onChange={(val) => handleChange("bonus", val)} />
        <TypeInput label="Type" value={formData.type} onChange={(val) => handleChange("type", val)} />
        <DynamicListInput label="Includes" values={formData.includes} onChange={(val) => handleChange("includes", val)} />
        <DynamicListInput label="BeforeEvent" values={formData.before_event} onChange={(val) => handleChange("before_event", val)} />
        <DynamicListInput label="OnEvent" values={formData.on_event} onChange={(val) => handleChange("on_event", val)} />
        <AddonInput addOns={formData.add_ons} onChange={(val) => handleChange("add_ons", val)} />

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-error" disabled={loading}>
            {loading ? "Deleting..." : "Delete Paket"}
          </button>
        </div>
      </form>
    </div>
  );
}

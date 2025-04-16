// src/components/pages/addPaket.tsx
"use client";

import React, { useState } from "react";

import NormalInput from "@/components/page/pakets/component/normalInput";
import PriceInput from "@/components/page/pakets/component/priceInput";
import DynamicListInput from "@/components/page/pakets/component/dynamicInput";
import AddonInput from "@/components/page/pakets/component/addonsInput";
import TypeInput from "../component/typeInput";
import { postPakets } from "@/lib/pakets";

export default function AddPaket() {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    bonus: "",
    type: "Wedding",
    includes: [""], // Initialize with one empty string
    before_event: [""],
    on_event: [""],
    add_ons: {} as Record<string, string[]>,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postPakets(formData);
      window.location.href = "/pakets"; // ✅ Full reload
    } catch (err: any) {
      alert(`Failed to submit paket: ${err.message}`); // ❌ Show toast on error
    }


  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Paket</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <NormalInput
          label="Name"
          value={formData.name}
          onChange={(val) => handleChange("name", val)}
        />
        <PriceInput
          label="Price"
          value={formData.price}
          onChange={(val) => handleChange("price", val)}
        />
        <NormalInput
          label="Bonus"
          value={formData.bonus}
          onChange={(val) => handleChange("bonus", val)}
        />
        <TypeInput
          label="Type"
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
        />
        <DynamicListInput
          label="Includes"
          values={formData.includes}
          onChange={(val) => handleChange("includes", val)}
        />

        <DynamicListInput
          label="BeforeEvent"
          values={formData.before_event}
          onChange={(val) => handleChange("before_event", val)}
        />

        <DynamicListInput
          label="OnEvent"
          values={formData.on_event}
          onChange={(val) => handleChange("on_event", val)}
        />

        <AddonInput
          addOns={formData.add_ons}
          onChange={(val) => handleChange("add_ons", val)}
        />
        {/* AddOns Input Component */}
        {/* You’ll add other dynamic components like Includes, BeforeEvent, OnEvent, and AddOns next */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

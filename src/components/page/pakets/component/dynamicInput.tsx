// src/components/page/pakets/inputComponent/dynamicListInput.tsx
"use client";

import React from "react";

interface DynamicListInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
};

export default function DynamicListInput({ label, values, onChange }: DynamicListInputProps) {
  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...values, ""]);
  };

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <div className="space-y-2">
        {values.map((val, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              className="input input-bordered w-full"
              value={val}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-sm btn-error"
              onClick={() => handleRemove(index)}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={handleAdd}
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
}

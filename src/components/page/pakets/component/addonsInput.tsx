"use client";

import React from "react";

interface AddonInputProps {
    addOns: Record<string, string[]>;
    onChange: (value: Record<string, string[]>) => void;
}

export default function AddonInput({ addOns, onChange }: AddonInputProps) {
    const handleGroupChange = (key: string, index:number, value:string) => {
        const updatedGroup = [...(addOns[key] || [])];
        updatedGroup[index] = value;
        onChange({ ...addOns, [key]: updatedGroup });
    }

    const addOptionGroup = () => {
        const newKey = `Option${Object.keys(addOns).length + 1}`;
        onChange({ ...addOns, [newKey]: [""] });
    }

    const addOptionValue = (key: string) => {
        onChange({...addOns, [key]: [...(addOns[key] || []), ""]});
    }

    const removeOptionValue = (key: string, index: number) => {
        const updatedGroup = addOns[key].filter((_, i) => i !== index);
        onChange({...addOns, [key]: updatedGroup})
    }

    const removeOptionGroup = (key: string) => {
        const updated = {...addOns};
        delete updated[key];
        onChange(updated);
    }

    return(
        <div className="space-y-4">
        <label className="font-medium">Add Ons</label>
        {Object.entries(addOns).map(([key, values]) => (
          <div key={key} className="border p-2 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{key}</span>
              <button
                type="button"
                className="btn btn-xs btn-error"
                onClick={() => removeOptionGroup(key)}
              >
                ✖
              </button>
            </div>
            {values.map((val, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  className="input input-bordered w-full"
                  value={val}
                  onChange={(e) =>
                    handleGroupChange(key, idx, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="btn btn-xs btn-error"
                  onClick={() => removeOptionValue(key, idx)}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => addOptionValue(key)}
            >
              ➕ Add Value
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary btn-sm ml-8"
          onClick={addOptionGroup}
        >
          ➕ Add Option Group
        </button>
      </div>
    )

}
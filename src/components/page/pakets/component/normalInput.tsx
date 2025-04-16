import { ChangeEvent } from "react";

interface NormalInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void; // still a string for external use
}

export default function NormalInput({ label, value, onChange }: NormalInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // extract string from event
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange} // pass actual event handler here
        className="input input-bordered w-full"
      />
    </div>
  );
}

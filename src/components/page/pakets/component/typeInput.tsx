import { ChangeEvent } from 'react';

interface TypeInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function TypeInput({ label, value, onChange }: TypeInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value); // extract string from event
      };

    return(
        <div>
      <label className="block text-sm font-medium">Type</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 py-2 pl-2 block w-32 rounded-md border-gray-300 shadow-sm bg-white"
      >
        <option value="Wedding">Wedding</option>
        <option value="Other">Other</option>
      </select>
    </div>
    )
}
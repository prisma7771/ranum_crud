'use client';

import { ChangeEvent } from 'react';

interface PriceInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function PriceInput({ label, value, onChange }: PriceInputProps) {
  // Helper: Format number to Rupiah currency
  const formatToRupiah = (numberString: string) => {
    const number = parseInt(numberString.replace(/[^\d]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };



  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const formatted = formatToRupiah(raw);
    onChange(formatted); // Pass the raw value to the parent component
  }
  
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Rp0"
      />
    </div>
  );
}

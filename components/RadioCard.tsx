"use client";

import React from "react";

interface RadioCardProps {
  id: string;
  name: string;
  value: string;
  label: string;
  iconSrc?: string;
  checked?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function RadioCard({
  id,
  name,
  value,
  label,
  iconSrc,
  checked,
  required = false,
  onChange,
  className = "",
}: RadioCardProps) {
  return (
    <label className={`block radio-card select-none ${className}`}>
      {iconSrc && (
        <div className="flex items-center justify-center mb-3">
          <img className="h-20" src={iconSrc} alt={label} />
        </div>
      )}
      <div className="flex items-center gap-3">
        <div>
          <input
            required={required}
            type="radio"
            value={value}
            {...(checked !== undefined ? { checked } : {})}
            onChange={onChange}
            name={name}
            id={id}
          />
        </div>
        <span className="text-base sm:text-lg text-brand-500">{label}</span>
      </div>
    </label>
  );
}
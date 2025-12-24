"use client";

interface CheckboxCardProps {
  id: string;
  name: string;
  value: string;
  label: string;
  iconSrc?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function CheckboxCard({
  id,
  name,
  value,
  label,
  iconSrc,
  checked = false,
  onChange,
  className = "",
}: CheckboxCardProps) {
  return (
    <label className={`block select-none checkbox-card ${className}`}>
      {iconSrc && (
        <div className="flex items-center justify-center mb-3">
          <img className="h-20" src={iconSrc} alt={label} />
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="">
          <input
            type="checkbox"
            name={name}
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            data-gtm-form-interact-field-id="0"
          />
        </div>
        <span className="text-base sm:text-lg text-brand-500">{label}</span>
      </div>
    </label>
  );
}


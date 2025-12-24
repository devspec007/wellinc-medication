"use client";

interface SelectProps {
    id: string;
    name: string;
    value: string;
    options: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
    id,
    name,
    value,
    options,
    onChange,
}: SelectProps) {
    return (
        <div className="relative">
            <select
                required={true}
                className="block w-full appearance-none rounded-[3px] border border-brand-75 bg-white px-4 py-3 pr-16 text-brand-800 outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300 focus:ring-offset-0"
                name={name}
                id={id}
                value={value}
                onChange={onChange}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}


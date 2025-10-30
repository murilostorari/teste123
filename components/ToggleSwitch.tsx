import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled = false, id }) => (
    <label htmlFor={id} className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            className="sr-only peer"
            disabled={disabled}
        />
        <div className="w-9 h-5 bg-gray-200 dark:bg-dark-border rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-white dark:peer-focus:ring-offset-dark-surface peer-focus:ring-primary/50 transition-colors peer-checked:bg-green-500"></div>
        <div className="absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-4 w-4 transition-transform peer-checked:translate-x-4 peer-checked:border-white"></div>
    </label>
);

export default ToggleSwitch;
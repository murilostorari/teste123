import React, { useState, useEffect } from 'react';

interface AddVariantTypeModalProps {
    onClose: () => void;
    onSave: (newType: string) => void;
}

const AddVariantTypeModal: React.FC<AddVariantTypeModalProps> = ({ onClose, onSave }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [typeName, setTypeName] = useState('');

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleSave = () => {
        if (typeName.trim()) {
            onSave(typeName.trim());
        }
        handleClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>
            <div
                className={`relative bg-white dark:bg-dark-surface rounded-xl shadow-lg w-full max-w-sm transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <div className="p-6">
                    <h2 className="text-lg font-bold text-dark-text dark:text-dark-text-heading mb-1">Add new variant type</h2>
                    <p className="text-sm text-gray-text dark:text-dark-text-body mb-4">You can add your custom variant type</p>
                    <div>
                        <label htmlFor="variant-type-name" className="text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5 block">Variant type name</label>
                        <input
                            type="text"
                            id="variant-type-name"
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)}
                            placeholder="e.g Material"
                            className="w-full h-11 px-3 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200"
                        />
                    </div>
                </div>
                <div className="flex justify-end items-center gap-3 p-4 bg-gray-50 dark:bg-dark-active-bg rounded-b-xl">
                    <button onClick={handleClose} className="px-4 h-9 rounded-lg text-sm font-bold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border text-dark-text dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 h-9 rounded-lg text-sm font-bold bg-primary text-white hover:brightness-110">
                        Save type
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddVariantTypeModal;

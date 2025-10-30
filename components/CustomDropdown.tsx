import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IconProps } from './icons/IconProps';

const ChevronDownIcon: React.FC<IconProps> = ({ className }) => <i className={`ri-arrow-down-s-line ${className}`}></i>;

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

interface CustomDropdownOption {
    value: string;
    label: string;
    colorClass?: string;
}

interface SelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: (string | CustomDropdownOption)[];
    selectedValue: string;
    onSelect: (value: string) => void;
    actionItem?: { label: string; icon: React.ReactNode; onClick: () => void; };
}

const SelectionModal: React.FC<SelectionModalProps> = ({ isOpen, onClose, title, options, selectedValue, onSelect, actionItem }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [internalSelection, setInternalSelection] = useState(selectedValue);
    const modalRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const touchState = useRef({ startY: 0, currentY: 0, moving: false }).current;


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => setIsVisible(true));
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);
    
    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
            document.body.style.overflow = 'auto';
        }, 300);
    }, [onClose]);

    const handleApply = () => {
        onSelect(internalSelection);
        handleClose();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchState.startY = e.touches[0].clientY;
        touchState.currentY = e.touches[0].clientY;
        touchState.moving = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchState.moving) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchState.startY;
        touchState.currentY = currentY;

        if (deltaY > 0 && modalRef.current) {
            requestAnimationFrame(() => {
                if (modalRef.current) {
                    modalRef.current.style.transform = `translateY(${deltaY}px)`;
                    modalRef.current.style.transition = 'none';
                }
            });
        }
    };
    
    const handleTouchEnd = () => {
        if (!touchState.moving) return;
        touchState.moving = false;
        const deltaY = touchState.currentY - touchState.startY;
    
        if (modalRef.current) {
            modalRef.current.style.transition = 'transform 0.3s ease-out';
            if (deltaY > 100) {
                modalRef.current.style.transform = 'translateY(100%)';
                setIsVisible(false); // This will fade out the backdrop
                setTimeout(onClose, 300);
            } else {
                modalRef.current.style.transform = 'translateY(0)';
            }
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>
            <div 
                ref={modalRef}
                className={`relative bg-white dark:bg-dark-surface rounded-t-2xl shadow-lg w-full transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <header 
                    ref={headerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark-border">
                        <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">{title}</h2>
                        <button onClick={handleClose} className="p-2 -mr-2"><i className="ri-close-line text-2xl text-text-body dark:text-dark-text-body"></i></button>
                    </div>
                </header>
                <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 scrollbar-hide">
                     {options.map((option) => {
                        const value = typeof option === 'string' ? option : option.value;
                        const label = typeof option === 'string' ? option : option.label;
                        const colorClass = typeof option === 'object' ? option.colorClass : undefined;

                        return (
                            <label key={value} className="flex items-center gap-4 cursor-pointer p-2 rounded-lg" onClick={() => setInternalSelection(value)}>
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <input type="radio" name={`selection-${title}`} checked={internalSelection === value} readOnly className="peer appearance-none h-5 w-5 rounded-full border-2 border-gray-300 dark:border-dark-border checked:border-primary focus:outline-none" />
                                    <div className="absolute w-2.5 h-2.5 bg-primary rounded-full hidden peer-checked:block pointer-events-none" />
                                </div>
                                <span className="font-medium text-heading dark:text-dark-text-heading flex items-center gap-3 text-base">
                                    {colorClass && <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>}
                                    {label}
                                </span>
                            </label>
                        );
                    })}
                    {actionItem && (
                         <button onClick={actionItem.onClick} className="w-full flex items-center gap-3 p-2 text-primary font-semibold">
                            {actionItem.icon}
                            <span>{actionItem.label}</span>
                        </button>
                    )}
                </div>
                <footer className="p-4 border-t border-border dark:border-dark-border">
                    <button onClick={handleApply} className="w-full px-4 h-12 text-sm font-bold bg-primary text-white rounded-full">Apply</button>
                </footer>
            </div>
        </div>
    );
};


interface CustomDropdownProps {
    label: string;
    options: (string | CustomDropdownOption)[];
    value: string;
    onSelect: (value: string) => void;
    buttonClass?: string;
    dropdownClass?: string;
    fullWidth?: boolean;
    actionItem?: { label: string; icon: React.ReactNode; onClick: () => void; };
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, options, value, onSelect, buttonClass, dropdownClass, fullWidth = false, actionItem, isOpen: controlledIsOpen, onToggle }) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

    const setOpen = useCallback((open: boolean) => {
        if (isControlled) {
            onToggle?.(open);
        } else {
            setUncontrolledIsOpen(open);
        }
    }, [isControlled, onToggle]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setOpen]);
    
    const selectedOption = options.find(o => (typeof o === 'string' ? o : o.value) === value);
    const selectedLabel = selectedOption ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label) : value;

    const baseButtonClasses = "flex items-center justify-between gap-2 bg-white dark:bg-dark-surface border border-border dark:border-dark-border text-base font-medium text-left text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors duration-200";
    const widthClass = fullWidth ? "w-full" : "";

    const buttonContent = (
        <>
            <span>{selectedLabel}</span>
            <ChevronDownIcon className={`text-xl transition-transform duration-200 ${isOpen || isModalOpen ? 'rotate-180' : ''}`} />
        </>
    );

    if (isMobile) {
        return (
            <div>
                 {label && <label className="block text-sm font-medium text-text-body dark:text-dark-text-body mb-1.5">{label}</label>}
                 <button
                    onClick={() => setIsModalOpen(true)}
                    className={`${baseButtonClasses} ${widthClass} ${buttonClass || 'h-11 px-3 rounded-lg'}`}
                >
                    {buttonContent}
                </button>
                <SelectionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={label}
                    options={options}
                    selectedValue={value}
                    onSelect={onSelect}
                    actionItem={actionItem}
                />
            </div>
        );
    }

    return (
        <div className={`${label ? '' : 'flex items-center'}`}>
            {label && <label className="block text-sm font-medium text-text-body dark:text-dark-text-body mb-1.5">{label}</label>}
            <div className={`relative ${widthClass}`} ref={dropdownRef}>
                <button
                    onClick={() => setOpen(!isOpen)}
                    className={`${baseButtonClasses} ${widthClass} ${buttonClass || 'h-11 px-3 rounded-lg'}`}
                >
                    {buttonContent}
                </button>
                <div
                    className={`absolute z-20 mt-1 bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border dark:border-dark-border origin-top transition-all duration-300 ease-out w-full ${dropdownClass} ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                    style={{ [dropdownClass?.includes('right-0') ? 'right' : 'left']: 0 }}
                >
                    <ul className="p-1.5 max-h-60 overflow-y-auto">
                        {options.map((option) => {
                             const optionValue = typeof option === 'string' ? option : option.value;
                             const optionLabel = typeof option === 'string' ? option : option.label;
                             const optionColorClass = typeof option === 'object' ? option.colorClass : undefined;

                            return (
                                <li key={optionValue} className="p-0">
                                    <button
                                        onClick={() => { onSelect(optionValue); setOpen(false); }}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-heading dark:text-dark-text-heading hover:bg-gray-100 dark:hover:bg-dark-subtle cursor-pointer transition-colors duration-200 flex items-center gap-3"
                                    >
                                        {optionColorClass && <span className={`w-2.5 h-2.5 rounded-full ${optionColorClass}`}></span>}
                                        <span>{optionLabel}</span>
                                    </button>
                                </li>
                            );
                        })}
                        {actionItem && (
                            <li className="border-t border-border dark:border-dark-border mt-1 pt-1">
                                <button onClick={() => { setOpen(false); actionItem.onClick(); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-primary font-semibold text-left rounded-md hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors duration-200">
                                    {actionItem.icon}
                                    <span>{actionItem.label}</span>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomDropdown;
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { InventoryRowData } from '../types';
import CustomDropdown from './CustomDropdown';
import AddVariantTypeModal from './AddVariantTypeModal';
import ToggleSwitch from './ToggleSwitch';

interface FinalVariant {
    id: number;
    image?: string;
    [key: string]: any; // For dynamic variant types like Colors, Size
    Price: string;
    Stock: string;
    SKU: string;
    Status: boolean;
}

interface VariantOption {
    id: number;
    type: string;
    values: string[];
    useImage: boolean;
}


interface AddVariantModalProps {
    onClose: () => void;
    onSave: (variants: FinalVariant[]) => void;
    product?: InventoryRowData | null;
}

const ALL_OPTIONS_BASE: { [key: string]: string[] } = {
    'Color': ['Midnight', 'Starlight', 'Silver', 'Black'],
    'SSD Size': ['256 GB', '512 GB', '1 TB'],
    'Dimension': ['Small', 'Medium', 'Large'],
};

const colorMap: { [key: string]: string } = {
    Midnight: '#1f2024',
    Starlight: '#f0e4d3',
    Silver: '#e3e4e6',
    Black: '#000000',
};

const imageMap: { [key: string]: string } = {
    Midnight: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-midnight-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230812294',
    Silver: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230812953',
    Starlight: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-starlight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1707165037198',
};

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

const FormCheckbox: React.FC<{ id: string, checked?: boolean; indeterminate?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ id, checked, indeterminate, onChange }) => {
    const ref = useRef<HTMLInputElement>(null!);
    useEffect(() => { ref.current.indeterminate = indeterminate || false; }, [indeterminate]);
    return (
        <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5">
                <input ref={ref} type="checkbox" id={id} checked={checked} onChange={onChange} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200" />
                <i className="ri-check-line absolute text-white hidden peer-checked:block pointer-events-none"></i>
                <i className="ri-subtract-line absolute text-white hidden peer-indeterminate:block pointer-events-none"></i>
            </div>
        </label>
    );
};

const VariantValueSelectionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    selectedValues: string[];
    onValuesChange: (values: string[]) => void;
    variantType: string;
}> = ({ isOpen, onClose, title, options, selectedValues, onValuesChange, variantType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [internalSelection, setInternalSelection] = useState(selectedValues);
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
        onValuesChange(internalSelection);
        handleClose();
    };

    const toggleValue = (value: string) => {
        setInternalSelection(current =>
            current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value]
        );
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
        <div className="fixed inset-0 z-[60] flex flex-col justify-end md:hidden">
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
                        <h2 className="text-lg font-bold text-dark-text dark:text-dark-text-heading">{title}</h2>
                        <button onClick={handleClose} className="p-2 -mr-2"><i className="ri-close-line text-2xl text-text-body"></i></button>
                    </div>
                </header>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    {options.map(option => (
                        <label key={option} className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-hover-bg" onClick={() => toggleValue(option)}>
                            <span className="flex items-center gap-3">
                                {variantType === 'Color' && colorMap[option] && <span className="w-5 h-5 rounded-full" style={{ backgroundColor: colorMap[option] }}></span>}
                                <span className="font-medium text-dark-text dark:text-dark-text-heading">{option}</span>
                            </span>
                            <div className="relative flex items-center justify-center w-5 h-5">
                                <input type="checkbox" readOnly checked={internalSelection.includes(option)} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary focus:outline-none transition-colors duration-200" />
                                <i className="ri-check-line absolute text-white hidden peer-checked:block pointer-events-none"></i>
                            </div>
                        </label>
                    ))}
                </div>
                <footer className="p-4 border-t border-border dark:border-dark-border">
                    <button onClick={handleApply} className="w-full px-4 h-12 text-sm font-bold bg-primary text-white rounded-full">Apply</button>
                </footer>
            </div>
        </div>
    );
};


const MultiSelectChipInput: React.FC<{
    selectedValues: string[];
    onValuesChange: (values: string[]) => void;
    options: string[];
    variantType: string;
    isOpen: boolean;
    onToggle: (isOpen: boolean) => void;
}> = ({ selectedValues, onValuesChange, options, variantType, isOpen, onToggle }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onToggle(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onToggle]);

    const toggleDropdown = () => {
        onToggle(!isOpen);
    };

    const toggleValue = (value: string) => {
        if (selectedValues.includes(value)) {
            onValuesChange(selectedValues.filter(v => v !== value));
        } else {
            onValuesChange([...selectedValues, value]);
        }
    };

    if (isMobile) {
        return (
            <>
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-wrap items-center gap-2 px-2 h-11 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer overflow-y-auto"
                >
                    {selectedValues.length === 0 && <span className="text-gray-400 px-1">Select values</span>}
                    {selectedValues.map(value => (
                        <div key={value} className="flex items-center gap-1.5 bg-gray-100 dark:bg-dark-active-bg px-2 py-1 rounded-md text-sm font-medium">
                            {variantType === 'Color' && colorMap[value] && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorMap[value] }}></span>}
                            {value}
                        </div>
                    ))}
                </div>
                <VariantValueSelectionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`Select ${variantType}`}
                    options={options}
                    selectedValues={selectedValues}
                    onValuesChange={onValuesChange}
                    variantType={variantType}
                />
            </>
        )
    }

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={toggleDropdown}
                className={`flex flex-wrap items-center gap-2 px-2 h-11 bg-white dark:bg-dark-surface border rounded-lg cursor-pointer transition-colors duration-200 overflow-y-auto ${isOpen ? 'border-primary ring-1 ring-primary/50' : 'border-gray-200 dark:border-dark-border'}`}
            >
                {selectedValues.length === 0 && <span className="text-gray-400 px-1">Enter variant value</span>}
                {selectedValues.map(value => (
                    <div key={value} className="flex items-center gap-1.5 bg-gray-100 dark:bg-dark-active-bg px-2 py-1 rounded-md text-sm font-medium animate-fade-in" style={{animationDuration: '200ms'}}>
                        {variantType === 'Color' && colorMap[value] && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorMap[value] }}></span>}
                        {value}
                        <button onClick={(e) => { e.stopPropagation(); toggleValue(value) }} className="text-gray-500 hover:text-dark-text"><i className="ri-close-line"></i></button>
                    </div>
                ))}
            </div>
            <ul className={`absolute z-50 w-full mt-1 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-border dark:border-dark-border max-h-48 overflow-y-auto transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {options.map(option => (
                    <li
                        key={option}
                        onClick={() => toggleValue(option)}
                        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-hover-bg"
                    >
                        <span className="flex items-center gap-2 text-dark-text dark:text-dark-text-heading">
                            {variantType === 'Color' && colorMap[option] && <span className="w-4 h-4 rounded-full" style={{ backgroundColor: colorMap[option] }}></span>}
                            {option}
                        </span>
                        <div className="relative flex items-center justify-center w-5 h-5">
                            <input type="checkbox" readOnly checked={selectedValues.includes(option)} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary focus:outline-none transition-colors duration-200" />
                            <i className="ri-check-line absolute text-white hidden peer-checked:block pointer-events-none"></i>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TableInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className="w-full h-9 px-2 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-dark-text dark:text-dark-text-heading" />
);

const AnimatedTableRow: React.FC<{ children: React.ReactNode, index: number }> = ({ children, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 50); // Staggered animation
        return () => clearTimeout(timer);
    }, [index]);
    return <tr className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>{children}</tr>;
};

type SortableKeys = keyof FinalVariant;


const AddVariantModal: React.FC<AddVariantModalProps> = ({ onClose, onSave, product }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [variants, setVariants] = useState<VariantOption[]>([
        { id: Date.now(), type: 'Color', values: [], useImage: false }
    ]);
    const [removingIds, setRemovingIds] = useState<number[]>([]);
    const [tableData, setTableData] = useState<FinalVariant[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({ key: 'id', direction: 'ascending' });

    const [allOptions, setAllOptions] = useState(ALL_OPTIONS_BASE);
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const touchState = useRef({ startY: 0, currentY: 0, moving: false }).current;
    const isMobile = useMediaQuery('(max-width: 767px)');


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => setIsVisible(true));
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }, [onClose]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isMobile) return;
        touchState.startY = e.touches[0].clientY;
        touchState.currentY = e.touches[0].clientY;
        touchState.moving = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isMobile || !touchState.moving) return;
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
        if (!isMobile || !touchState.moving) return;
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

    const addVariant = () => {
        const nextType = Object.keys(allOptions).find(t => !variants.some(v => v.type === t)) || 'Color';
        setVariants([...variants, { id: Date.now(), type: nextType, values: [], useImage: false }]);
    };
    
    const handleAddNewType = (newType: string) => {
        if (newType && !allOptions[newType]) {
            setAllOptions(prev => ({...prev, [newType]: []}));
        }
        setIsAddTypeModalOpen(false);
    };

    const updateVariant = (id: number, updatedProps: Partial<VariantOption>) => {
        setVariants(variants.map(v => v.id === id ? { ...v, ...updatedProps } : v));
    };
    
    const removeVariant = (id: number) => {
        setRemovingIds(prev => [...prev, id]);
        setTimeout(() => {
            setVariants(v => v.filter(variant => variant.id !== id));
            setRemovingIds(prev => prev.filter(rid => rid !== id));
        }, 350);
    };

    const variantCombinations = useMemo(() => {
        const activeVariants = variants.filter(v => v.values.length > 0);
        if (activeVariants.length === 0) return [];
        
        const cartesian = <T,>(...a: T[][]): T[][] => a.reduce((acc, b) => acc.flatMap(d => b.map(e => [...d, e])), [[]] as T[][]);
        
        const valueArrays = activeVariants.map(v => v.values);
        return cartesian(...valueArrays);
    }, [variants]);

    useEffect(() => {
        const activeVariants = variants.filter(v => v.values.length > 0);

        const newTableData = variantCombinations.map((combo, index) => {
            const comboObject: Omit<FinalVariant, 'id' | 'image' | 'Price' | 'Stock' | 'SKU' | 'Status'> = {};
            let sku_suffix = '';
            
            combo.forEach((value, i) => {
                const variantType = activeVariants[i].type;
                comboObject[variantType] = value;
                sku_suffix += `-${value.replace(/ /g, '')}`;
            });

            const existingRow = tableData.find(row => {
                return combo.every((value, i) => row[activeVariants[i].type] === value);
            });
            
            const imageVariant = variants.find(v => v.useImage);
            let image = undefined;
            if (imageVariant) {
                const imageValueIndex = activeVariants.findIndex(v => v.id === imageVariant.id);
                if (imageValueIndex !== -1) {
                    const imageValue = combo[imageValueIndex];
                    image = imageMap[imageValue];
                }
            }

            return {
                id: existingRow?.id || Date.now() + index,
                image: image,
                ...comboObject,
                Price: existingRow?.Price || '2,199',
                Stock: existingRow?.Stock || '10',
                SKU: existingRow?.SKU || `${product?.sku || 'MAC-09485'}${sku_suffix}`,
                Status: existingRow ? existingRow.Status : true,
            };
        });
        setTableData(newTableData as FinalVariant[]);
    }, [variantCombinations, variants, product?.sku]);

    const sortedTableData = useMemo(() => {
        let sortableItems = [...tableData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [tableData, sortConfig]);

    const requestSort = (key: SortableKeys) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIds(e.target.checked ? tableData.map(row => row.id) : []);
    };
    
    const handleSelectRow = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
    };

    const allSelected = selectedIds.length === tableData.length && tableData.length > 0;
    const isIndeterminate = selectedIds.length > 0 && !allSelected;

    const handleTableChange = (index: number, field: keyof FinalVariant, value: any) => {
        const dataIndex = tableData.findIndex(row => row.id === sortedTableData[index].id);
        const updatedData = [...tableData];
        (updatedData[dataIndex] as any)[field] = value;
        setTableData(updatedData);
    };

    const handleSave = () => {
        setIsVisible(false);
        setTimeout(() => onSave(tableData), 300);
    };
    
    const variantTypes = variants.filter(v => v.values.length > 0).map(v => v.type);

    const SortableHeader: React.FC<{children: React.ReactNode, sortKey: SortableKeys}> = ({children, sortKey}) => {
        const isSorted = sortConfig?.key === sortKey;
        const icon = isSorted 
            ? (sortConfig.direction === 'ascending' ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>)
            : <i className="ri-arrow-up-down-line opacity-50"></i>;

        return (
            <div onClick={() => requestSort(sortKey)} className="flex items-center gap-1 cursor-pointer hover:text-dark-text dark:hover:text-dark-text-heading">
                <span>{children}</span>
                <span className="text-sm">{icon}</span>
            </div>
        );
    };

    return (
        <>
            <div className="fixed inset-0 z-50 p-0 md:p-4 flex flex-col justify-end md:flex-row md:justify-end">
                <div
                    className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    onClick={handleClose}
                ></div>
                <div 
                    ref={modalRef}
                    className={`relative bg-white dark:bg-dark-background w-full h-[95vh] md:h-full md:max-w-5xl flex flex-col rounded-t-2xl md:rounded-2xl shadow-2xl transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}`}
                >
                    <header 
                        ref={headerRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="flex-shrink-0 bg-white dark:bg-dark-surface rounded-t-2xl"
                    >
                        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-border dark:border-dark-border">
                            <h2 className="text-xl font-bold text-dark-text dark:text-dark-text-heading">Add Product Variants</h2>
                            <button onClick={handleClose} className="p-2 -mr-2 text-gray-text dark:text-dark-text-body hover:text-dark-text dark:hover:text-dark-text-heading">
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="p-6 bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border">
                            <h3 className="font-semibold text-dark-text dark:text-dark-text-heading mb-2">Product detail</h3>
                            <p className="font-bold text-lg text-dark-text dark:text-dark-text-heading">{product?.name || 'Macbook Pro 14 Inch 512GB M1 Pro'}</p>
                            <p className="text-sm text-gray-text dark:text-dark-text-body mt-1">Experience unparalleled performance with the Macbook Pro 14-inch, featuring the powerful M1 Pro chip.</p>
                            <div className="mt-4 pt-4 border-t border-gray-border dark:border-dark-border grid grid-cols-3 sm:grid-cols-6 gap-4 text-sm">
                                <div><p className="text-gray-text dark:text-dark-text-body">Category</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">Laptop</p></div>
                                <div><p className="text-gray-text dark:text-dark-text-body">Channel</p><p className="font-semibold text-dark-text dark:text-dark-text-heading flex items-center gap-1"><i className="ri-store-2-line"></i> Fikri Store</p></div>
                                <div><p className="text-gray-text dark:text-dark-text-body">Vendor</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">Apple Store</p></div>
                                <div><p className="text-gray-text dark:text-dark-text-body">Type</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">Electronic</p></div>
                                <div><p className="text-gray-text dark:text-dark-text-body">Created</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">04 Feb 2024</p></div>
                                <div><p className="text-gray-text dark:text-dark-text-body">Last Updated</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">Yesterday</p></div>
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-dark-text dark:text-dark-text-heading">Variant</h3>
                                <button onClick={addVariant} className="text-sm font-semibold text-primary hover:underline">+ Add variant</button>
                            </div>
                            <div className="space-y-4">
                                {variants.map((variant, index) => {
                                    const typeDropdownId = `type-${variant.id}`;
                                    const valueDropdownId = `value-${variant.id}`;
                                    const isDropdownOpen = openDropdownId === typeDropdownId || openDropdownId === valueDropdownId;
                                    
                                    return (
                                        <div key={variant.id} className={`relative transition-all duration-300 ease-out ${removingIds.includes(variant.id) ? 'opacity-0 max-h-0 !p-0 !mt-0 !border-0' : 'max-h-[500px] animate-fade-in'} ${isDropdownOpen ? 'z-20' : ''}`}>
                                            <div className="p-4 border border-gray-border dark:border-dark-border rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold text-dark-text dark:text-dark-text-heading">Variant {index + 1}</p>
                                                    <button onClick={() => removeVariant(variant.id)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-border dark:border-dark-border text-gray-text dark:text-dark-text-body hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors"><i className="ri-delete-bin-line text-lg"></i></button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                                    <div className="sm:col-span-1">
                                                        <CustomDropdown 
                                                            label="Variant type" 
                                                            value={variant.type} 
                                                            onSelect={type => updateVariant(variant.id, { type, values: [] })} 
                                                            options={Object.keys(allOptions)} 
                                                            buttonClass="h-11 rounded-lg px-3" 
                                                            fullWidth
                                                            actionItem={{
                                                                label: "Add type",
                                                                icon: <i className="ri-add-line"></i>,
                                                                onClick: () => setIsAddTypeModalOpen(true)
                                                            }}
                                                            isOpen={openDropdownId === typeDropdownId}
                                                            onToggle={(isOpen) => setOpenDropdownId(isOpen ? typeDropdownId : null)}
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5 block">Variant value</label>
                                                        <MultiSelectChipInput 
                                                            selectedValues={variant.values}
                                                            onValuesChange={values => updateVariant(variant.id, { values })}
                                                            options={allOptions[variant.type] || []}
                                                            variantType={variant.type}
                                                            isOpen={openDropdownId === valueDropdownId}
                                                            onToggle={(isOpen) => setOpenDropdownId(isOpen ? valueDropdownId : null)}
                                                        />
                                                    </div>
                                                </div>
                                                {variant.values.length > 0 && (
                                                    <>
                                                    <div className="mt-4 flex items-center gap-2">
                                                        <ToggleSwitch checked={variant.useImage} onChange={useImage => updateVariant(variant.id, { useImage })} />
                                                        <span className="text-sm font-medium text-dark-text dark:text-dark-text-heading">Use image for this variant</span>
                                                    </div>
                                                    <div className={`grid grid-rows-[0fr] transition-all duration-500 ease-in-out ${variant.useImage ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr] mt-0'}`}>
                                                        <div className="overflow-hidden">
                                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                                                {variant.values.map(value => (
                                                                    <div key={value} className="text-center">
                                                                        <div className="relative aspect-square bg-gray-50 dark:bg-dark-active-bg rounded-lg border-2 border-dashed border-gray-300 dark:border-dark-border flex items-center justify-center cursor-pointer group hover:border-primary">
                                                                            {imageMap[value] ? ( <img src={imageMap[value]} alt={value} className="w-full h-full object-cover rounded-md" />) : (<i className="ri-image-add-line text-2xl text-gray-400 group-hover:text-primary"></i>)}
                                                                        </div>
                                                                        <p className="text-sm font-medium mt-2 text-dark-text dark:text-dark-text-heading">{value}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        
                        <div className="p-6 bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border">
                            <h3 className="font-semibold text-dark-text dark:text-dark-text-heading mb-4">Variant table</h3>
                            {tableData.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-gray-border dark:border-dark-border rounded-lg">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto text-3xl text-gray-400"><i className="ri-table-line"></i></div>
                                    <h3 className="text-lg font-semibold text-dark-text dark:text-dark-text-heading mt-4">No data added</h3>
                                    <p className="text-sm text-gray-text dark:text-dark-text-body mt-1">The variant you added, will be displayed here</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-dark-active-bg">
                                            <tr className="border-b border-gray-border dark:border-dark-border">
                                                <th className="p-3 w-4"><FormCheckbox id="check-all" checked={allSelected} indeterminate={isIndeterminate} onChange={handleSelectAll} /></th>
                                                <th className="p-3 font-medium text-left text-gray-text dark:text-dark-text-body">Image</th>
                                                {variantTypes.map(type => <th key={type} className="p-3 font-medium text-left text-gray-text dark:text-dark-text-body"><SortableHeader sortKey={type}>{type}</SortableHeader></th>)}
                                                <th className="p-3 font-medium text-left text-gray-text dark:text-dark-text-body"><SortableHeader sortKey="Price">Price</SortableHeader></th>
                                                <th className="p-3 font-medium text-left text-gray-text dark:text-dark-text-body"><SortableHeader sortKey="Stock">Stock</SortableHeader></th>
                                                <th className="p-3 font-medium text-left text-gray-text dark:text-dark-text-body"><SortableHeader sortKey="SKU">SKU</SortableHeader></th>
                                                <th className="p-3 font-medium text-left text-gray-text dark:text-dark-text-body">Status</th>
                                                <th className="p-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-border dark:divide-dark-border">
                                            {sortedTableData.map((row, index) => (
                                                <AnimatedTableRow key={row.id} index={index}>
                                                    <td className="p-3"><FormCheckbox id={`check-${row.id}`} checked={selectedIds.includes(row.id)} onChange={() => handleSelectRow(row.id)}/></td>
                                                    <td className="p-3">
                                                        <div className="w-10 h-10 bg-gray-50 dark:bg-dark-active-bg rounded-md p-1">
                                                            {row.image ? <img src={row.image} alt={row.id.toString()} className="w-full h-full object-contain"/> : <i className="ri-image-line text-2xl text-gray-300 w-full h-full flex items-center justify-center"></i>}
                                                        </div>
                                                    </td>
                                                    {variantTypes.map(type => <td key={type} className="p-3 text-dark-text dark:text-dark-text-heading font-medium">{row[type]}</td>)}
                                                    <td className="p-3"><TableInput type="text" value={row.Price} onChange={e => handleTableChange(index, 'Price', e.target.value)} className="w-24" /></td>
                                                    <td className="p-3"><TableInput type="text" value={row.Stock} onChange={e => handleTableChange(index, 'Stock', e.target.value)} className="w-16" /></td>
                                                    <td className="p-3"><TableInput type="text" value={row.SKU} onChange={e => handleTableChange(index, 'SKU', e.target.value)} className="w-32" /></td>
                                                    <td className="p-3"><ToggleSwitch checked={row.Status} onChange={v => handleTableChange(index, 'Status', v)} /></td>
                                                    <td className="p-3 text-right"><button className="font-semibold text-primary text-sm">Make default</button></td>
                                                </AnimatedTableRow>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </main>

                    <footer className="flex items-center justify-end p-6 border-t border-gray-border dark:border-dark-border gap-4 flex-shrink-0 bg-white dark:bg-dark-surface rounded-b-2xl">
                        <div>
                            <button onClick={handleClose} className="px-6 h-10 rounded-lg text-sm font-bold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border text-dark-text dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle mr-4">Cancel</button>
                            <button onClick={handleSave} className="px-6 h-10 rounded-lg text-sm font-bold bg-primary text-white hover:brightness-110">Save Variant</button>
                        </div>
                    </footer>
                </div>
            </div>
            {isAddTypeModalOpen && (
                <AddVariantTypeModal 
                    onClose={() => setIsAddTypeModalOpen(false)}
                    onSave={handleAddNewType}
                />
            )}
        </>
    );
};

export default AddVariantModal;
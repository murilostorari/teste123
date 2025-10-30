import React, { useState, useEffect, useRef, useMemo, ChangeEvent } from 'react';
import { ProductRowData, InventoryRowData } from '../types';
import { IconProps } from './icons/IconProps';
import FadeIn from './FadeIn';

// --- MOCK DATA (GRID VIEW) ---
const productsData: ProductRowData[] = [
    { id: 1, checked: false, name: 'Macbook Pro 14 Inch 512GB...', imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU Mac-5006', status: 'Active', tags: [{type: 'text', label: 'Apple'}, {type: 'text', label: 'Electronic'}, {type: 'text', label: '+2'}, {type: 'icon', label: 'Dropship'}], retailPrice: '$180.00-$220.00', wholesalePrice: '$100.00-$170.00', stock: 210, stockLevel: 'High', variantsCount: 6 },
    { id: 2, checked: false, name: 'Logitech MX Mechanical Mini...', imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU Logitect-9920', status: 'Active', tags: [{type: 'text', label: 'Mechanical'}, {type: 'text', label: 'Keyboard'}, {type: 'icon', label: 'Inventory'}], retailPrice: '$120.00', wholesalePrice: '$80.00', stock: 12, stockLevel: 'Low', variantsCount: 0 },
    { id: 3, checked: false, name: 'JBL GO 2 Portable Speaker Bl...', imageUrl: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU JBL-9928', status: 'Draft', tags: [{type: 'text', label: 'Speaker'}, {type: 'text', label: 'Electronic'}, {type: 'text', label: '+2'}, {type: 'icon', label: 'Dropship'}], retailPrice: '$180.00', wholesalePrice: '$100.00', stock: 341, stockLevel: 'High', variantsCount: 0 },
    { id: 4, checked: false, name: 'Gopro hero 7', imageUrl: 'https://images.pexels.com/photos/390089/pexels-photo-390089.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU Gopro-9912', status: 'Archived', tags: [{type: 'text', label: 'Camera'}, {type: 'text', label: 'Gopro'}, {type: 'text', label: '+2'}], retailPrice: '$45.00', wholesalePrice: '$40.00', stock: 0, stockLevel: 'Out of stock', variantsCount: 0 },
    { id: 5, checked: false, name: 'DJI Air 3 Fly More Combo (DJ...', imageUrl: 'https://images.pexels.com/photos/15764420/pexels-photo-15764420.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU DJI-5006', status: 'Active', tags: [{type: 'text', label: 'DJI'}, {type: 'text', label: 'Electronic'}, {type: 'icon', label: 'Dropship'}], retailPrice: '$85.00-$120.00', wholesalePrice: '$80.00-$110.00', stock: 32, stockLevel: 'Low', variantsCount: 8 },
    { id: 6, checked: false, name: 'Logitech C920 Webcam PRO...', imageUrl: 'https://images.pexels.com/photos/6913718/pexels-photo-6913718.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU Acer-9829', status: 'Archived', tags: [{type: 'text', label: 'Camera'}, {type: 'text', label: 'Accessories'}, {type: 'icon', label: 'Dropship'}], retailPrice: '$60.00-$70.00', wholesalePrice: '$50.00-$60.00', stock: 0, stockLevel: 'Out of stock', variantsCount: 0 },
    { id: 7, checked: false, name: 'Thinkplus LP1 Headset Earph...', imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU LP1-8821', status: 'Active', tags: [{type: 'text', label: 'Headset'}, {type: 'text', label: 'Electronic'}, {type: 'text', label: '+2'}, {type: 'icon', label: 'Dropship'}], retailPrice: '$120.00-$240.00', wholesalePrice: '$100.00-$170.00', stock: 250, stockLevel: 'High', variantsCount: 0 },
    { id: 8, checked: false, name: 'JBL Charge 5 - Portable Blue...', imageUrl: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU JBL-1019', status: 'Active', tags: [{type: 'text', label: 'JBL'}, {type: 'text', label: 'Electronic'}, {type: 'text', label: '+2'}, {type: 'icon', label: 'Dropship'}], retailPrice: '$180.00', wholesalePrice: '$100.00', stock: 150, stockLevel: 'High', variantsCount: 0 },
    { id: 9, checked: false, name: 'Acer Aspire 5 Spin 14" ASSP14...', imageUrl: 'https://images.pexels.com/photos/2148216/pexels-photo-2148216.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SKU ACE-09474', status: 'Active', tags: [{type: 'text', label: 'Laptop'}, {type: 'text', label: 'Electronic'}], retailPrice: '$650.00', wholesalePrice: '$500.00', stock: 80, stockLevel: 'High', variantsCount: 4 },
    { id: 10, checked: false, name: 'Acer Aspire Vero AV16-51P 16"', imageUrl: 'https://images.pexels.com/photos/6913718/pexels-photo-6913718.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'ACE-09475', status: 'Draft', tags: [{type: 'text', label: 'Laptop'}, {type: 'text', label: 'Electronic'}], retailPrice: '$720.00', wholesalePrice: '$550.00', stock: 45, stockLevel: 'Low', variantsCount: 2 },
    { id: 11, checked: false, name: 'Sony WH-1000XM5 Headphones', imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SONY-XM5-BLK', status: 'Active', tags: [{type: 'text', label: 'Headphones'}, {type: 'text', label: 'Audio'}], retailPrice: '$399.00', wholesalePrice: '$320.00', stock: 120, stockLevel: 'High', variantsCount: 3 },
    { id: 12, checked: false, name: 'Samsung Odyssey G9 Monitor', imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300', sku: 'SAM-G9-MON', status: 'Active', tags: [{type: 'text', label: 'Monitor'}, {type: 'text', label: 'Gaming'}], retailPrice: '$1399.00', wholesalePrice: '$1100.00', stock: 25, stockLevel: 'Low', variantsCount: 1 },
    { id: 13, checked: false, name: 'Apple Watch Series 8', imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'APL-W8-GPS', status: 'Active', tags: [{type: 'text', label: 'Watch'}, {type: 'text', label: 'Wearable'}], retailPrice: '$399.00', wholesalePrice: '$349.00', stock: 95, stockLevel: 'High', variantsCount: 8 },
    { id: 14, checked: false, name: 'Bose QuietComfort 45', imageUrl: 'https://images.pexels.com/photos/1529123/pexels-photo-1529123.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'BOSE-QC45-WHT', status: 'Active', tags: [{type: 'text', label: 'Headphones'}, {type: 'text', label: 'Noise Cancelling'}], retailPrice: '$329.00', wholesalePrice: '$280.00', stock: 60, stockLevel: 'High', variantsCount: 2 },
    { id: 15, checked: false, name: 'LG UltraGear 27" QHD', imageUrl: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'LG-UG27-QHD', status: 'Active', tags: [{type: 'text', label: 'Monitor'}, {type: 'text', label: 'Gaming'}, {type: 'text', label: 'QHD'}], retailPrice: '$449.00', wholesalePrice: '$380.00', stock: 18, stockLevel: 'Low', variantsCount: 1 },
];


// --- MOCK DATA (LIST VIEW) ---
const inventoryData: InventoryRowData[] = [
    { id: 1, checked: false, name: 'Macbook Pro M1 Pro 14" 512GB', imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300', sku: 'MAC-09485', category: 'Electronic', supplier: { name: 'Urban Deals', logoUrl: 'https://i.pravatar.cc/32?u=urban' }, stock: 20, stockLevel: 'Low', unitPrice: 1200 },
    { id: 2, checked: false, name: 'Apple 32" Pro Display XDR Ret...', imageUrl: 'https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'DIS-09484', category: 'Electronic', supplier: { name: 'DealZone', logoUrl: 'https://i.pravatar.cc/32?u=deal' }, stock: 100, stockLevel: 'High', unitPrice: 1500 },
    { id: 3, checked: false, name: 'Macbook Pro M1 2020 13" 512...', imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'MAC-0943', category: 'Electronic', supplier: { name: 'BuyRight', logoUrl: 'https://i.pravatar.cc/32?u=buy' }, stock: 40, stockLevel: 'Low', unitPrice: 950 },
    { id: 4, checked: false, name: 'Monitor MSI 27" Modern MD27...', imageUrl: 'https://images.pexels.com/photos/15764420/pexels-photo-15764420.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'MSI-09482', category: 'Electronic', supplier: { name: 'Trendline - Pakuwon', logoUrl: 'https://i.pravatar.cc/32?u=trend' }, stock: 210, stockLevel: 'High', unitPrice: 280 },
    { id: 5, checked: false, name: 'Macbook Pro M1 Pro 14" 512GB', imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'MAC-09481', category: 'Electronic', supplier: { name: 'iBox Indonesia - Pakuwon', logoUrl: 'https://i.pravatar.cc/32?u=ibox' }, stock: 180, stockLevel: 'High', unitPrice: 1300 },
    { id: 6, checked: false, name: 'Monitor MSI 27" Modern MD27...', imageUrl: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'MSI-09480', category: 'Electronic', supplier: { name: 'MetroShop', logoUrl: 'https://i.pravatar.cc/32?u=metro' }, stock: 70, stockLevel: 'Low', unitPrice: 1100 },
    { id: 7, checked: false, name: 'Dell XPS 9320 Plus Laptop 13"', imageUrl: 'https://images.pexels.com/photos/6913718/pexels-photo-6913718.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'DEL-09477', category: 'Electronic', supplier: { name: 'Urban Deals - Surabaya', logoUrl: 'https://i.pravatar.cc/32?u=urban2' }, stock: 0, stockLevel: 'Empty', unitPrice: 2200 },
    { id: 8, checked: false, name: 'Dell XPS 9520 Laptop 15"', imageUrl: 'https://images.pexels.com/photos/2148216/pexels-photo-2148216.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'DEL-09476', category: 'Electronic', supplier: { name: 'ShopEase', logoUrl: 'https://i.pravatar.cc/32?u=shop' }, stock: 0, stockLevel: 'Empty', unitPrice: 1700 },
    { id: 9, checked: false, name: 'Acer Aspire Vero AV16-51P 16"', imageUrl: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'ACE-09475', category: 'Electronic', supplier: { name: 'Trendline - Pakuwon', logoUrl: 'https://i.pravatar.cc/32?u=trend2' }, stock: 30, stockLevel: 'Low', unitPrice: 1350 },
    { id: 10, checked: false, name: 'Acer Aspire 5 Spin 14" A5SP14...', imageUrl: 'https://images.pexels.com/photos/390089/pexels-photo-390089.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'ACE-09474', category: 'Electronic', supplier: { name: 'Trendline - Gejayan', logoUrl: 'https://i.pravatar.cc/32?u=trend3' }, stock: 200, stockLevel: 'High', unitPrice: 1420 },
    { id: 11, checked: false, name: 'Sony WH-1000XM5 Headphones', imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=300', sku: 'SONY-XM5-BLK', category: 'Audio', supplier: { name: 'Urban Deals', logoUrl: 'https://i.pravatar.cc/32?u=urban' }, stock: 120, stockLevel: 'High', unitPrice: 399 },
    { id: 12, checked: false, name: 'Samsung Odyssey G9 Monitor', imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300', sku: 'SAM-G9-MON', category: 'Gaming', supplier: { name: 'MetroShop', logoUrl: 'https://i.pravatar.cc/32?u=metro' }, stock: 25, stockLevel: 'Low', unitPrice: 1399 },
];

// --- ICONS ---
const CheckIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>;


// --- SUB-COMPONENTS ---
const Checkbox: React.FC<{ checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; indeterminate?: boolean }> = ({ checked, onChange, indeterminate }) => {
    const ref = useRef<HTMLInputElement>(null!);
    useEffect(() => { ref.current.indeterminate = indeterminate || false; }, [indeterminate]);
    return (
        <div className="relative flex items-center justify-center w-5 h-5">
            <input ref={ref} type="checkbox" checked={checked} onChange={onChange} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200" />
            <CheckIcon className="absolute w-4 h-4 text-white hidden peer-checked:block pointer-events-none" />
            <i className="ri-subtract-line absolute text-white hidden peer-indeterminate:block pointer-events-none"></i>
        </div>
    );
};


interface ProductsPageProps {
  onAddProduct: () => void;
  onEditProduct: (product: InventoryRowData) => void;
}

const PageHeader: React.FC<{onAddProduct: () => void}> = ({ onAddProduct }) => (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-heading dark:text-dark-text-heading">Products</h1>
            <p className="text-base text-text-body dark:text-dark-text-body mt-1">Manage all your products in one place.</p>
        </div>
        <button onClick={onAddProduct} className="flex items-center justify-center gap-2 bg-primary text-white px-4 h-10 rounded-lg text-sm font-bold hover:brightness-110 transition-all duration-300">
            <i className="ri-add-line text-lg"></i>
            <span>Add Product</span>
        </button>
    </div>
);

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Products');
    const tabsData = [
        { name: 'All Products', icon: <i className="ri-archive-2-line text-lg"></i> },
        { name: 'Active', icon: <i className="ri-checkbox-circle-line text-lg"></i> },
        { name: 'Inactive', icon: <i className="ri-close-circle-line text-lg"></i> },
    ];

    return (
        <div className="border-b border-border dark:border-dark-border">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabsData.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-semibold text-base transition-colors flex items-center gap-2
                            ${activeTab === tab.name
                                ? 'border-primary text-primary'
                                : 'border-transparent text-text-body hover:text-heading dark:hover:text-dark-text-heading hover:border-gray-300'
                            }`}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

const Toolbar: React.FC<{viewMode: 'grid' | 'list', setViewMode: (mode: 'grid' | 'list') => void}> = ({ viewMode, setViewMode }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 flex-grow">
                <div className="relative w-full md:w-auto md:flex-grow lg:flex-grow-0">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-body dark:text-dark-text-body"></i>
                    <input type="text" placeholder="Search" className="w-full md:w-64 pl-9 pr-4 h-10 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm dark:text-dark-text-heading dark:placeholder:text-dark-text-body" />
                </div>
                <div className="flex items-center gap-2">
                    <FilterButton>Category</FilterButton>
                    <FilterButton>Type</FilterButton>
                    <FilterButton>Advance Filter</FilterButton>
                </div>
            </div>
             <div className="hidden md:flex items-center gap-1 bg-gray-light dark:bg-dark-active-bg p-1 rounded-lg self-end md:self-center">
                <button onClick={() => setViewMode('grid')} className={`w-9 h-8 flex items-center justify-center rounded-md text-lg ${viewMode === 'grid' ? 'bg-white dark:bg-dark-surface text-primary shadow-sm' : 'text-text-body'}`}>
                    <i className="ri-layout-grid-fill"></i>
                </button>
                 <button onClick={() => setViewMode('list')} className={`w-9 h-8 flex items-center justify-center rounded-md text-lg ${viewMode === 'list' ? 'bg-white dark:bg-dark-surface text-primary shadow-sm' : 'text-text-body'}`}>
                    <i className="ri-list-check-2"></i>
                </button>
            </div>
        </div>
    )
};

const FilterButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border px-3 h-10 rounded-lg text-sm font-medium text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
        <span>{children}</span>
        <i className="ri-arrow-down-s-line text-lg text-text-body dark:text-dark-text-body"></i>
    </button>
);

const ProductCard: React.FC<{ product: ProductRowData; isSelected: boolean; onSelect: () => void; onEdit: () => void; }> = ({ product, isSelected, onSelect, onEdit }) => {
    const getStatusClasses = () => {
        switch(product.status) {
            case 'Active': return 'bg-green-tag-bg text-green-tag';
            case 'Draft': return 'bg-gray-tag-bg text-gray-tag';
            default: return 'bg-orange-tag-bg text-orange-tag';
        }
    };
    
    const getStockBarColor = () => {
        switch(product.stockLevel) {
            case 'High': return 'bg-brand-green';
            case 'Low': return 'bg-stock-low';
            default: return 'bg-stock-out';
        }
    }
    
    const getTagIcon = (label: string) => {
        switch(label) {
            case 'Dropship': return 'ri-truck-line';
            case 'Inventory': return 'ri-archive-line';
            default: return '';
        }
    }

    return (
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-border dark:border-dark-border p-4 space-y-3 flex flex-col">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-dark-background rounded-lg p-1 flex-shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain"/>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm text-heading dark:text-dark-text-heading leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-text-body dark:text-dark-text-body">{product.sku}</p>
                        <div className={`flex items-center gap-1.5 text-xs font-medium py-0.5 px-2 rounded-full ${getStatusClasses()}`}>
                            {product.status === 'Active' && <i className="ri-check-fill"></i>}
                            {product.status}
                        </div>
                    </div>
                </div>
                <Checkbox checked={isSelected} onChange={onSelect} />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
                {product.tags.map(tag => (
                    <div key={tag.label} className="flex items-center gap-1 bg-gray-light dark:bg-dark-active-bg py-1 px-2.5 rounded-md text-xs text-text-body dark:text-dark-text-body font-medium">
                        {tag.type === 'icon' && <i className={getTagIcon(tag.label)}></i>}
                        <span>{tag.label}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-gray-border dark:border-dark-border py-3">
                <div>
                    <p className="text-xs text-text-body dark:text-dark-text-body">Retail</p>
                    <p className="text-sm font-semibold text-heading dark:text-dark-text-heading">{product.retailPrice}</p>
                </div>
                 <div>
                    <p className="text-xs text-text-body dark:text-dark-text-body">Wholesale</p>
                    <p className="text-sm font-semibold text-heading dark:text-dark-text-heading">{product.wholesalePrice}</p>
                </div>
            </div>

            {product.stockLevel === 'Out of stock' ? (
                 <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm font-medium border border-red-tag/20 bg-red-tag-bg text-red-tag px-3 py-1.5 rounded-lg">Out of Stock</span>
                    <button className="bg-heading text-white dark:bg-dark-active-bg dark:text-dark-text-heading text-xs font-bold h-8 px-3 rounded-lg">Reorder</button>
                 </div>
            ) : (
                <div className="flex justify-between items-center mt-auto">
                    <div>
                        <p className="text-sm font-medium text-heading dark:text-dark-text-heading">{product.stock} stock &middot; <span className={product.stockLevel === 'High' ? 'text-brand-green' : 'text-stock-low'}>{product.stockLevel}</span></p>
                         <div className="w-24 bg-gray-200 dark:bg-dark-border rounded-full h-1 mt-0.5">
                            <div className={`${getStockBarColor()} h-1 rounded-full`} style={{ width: `${Math.min(100, (product.stock / 300) * 100)}%` }}></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {product.variantsCount ? <p className="text-sm text-text-body dark:text-dark-text-body font-medium">Variants ({product.variantsCount})</p> : null}
                        <button onClick={onEdit} className="w-8 h-8 rounded-full bg-gray-light dark:bg-dark-active-bg flex items-center justify-center text-heading dark:text-dark-text-heading"><i className="ri-arrow-right-double-line text-lg"></i></button>
                    </div>
                </div>
            )}
        </div>
    )
};

const ActionMenu: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const menuItems = [
        { icon: 'ri-refresh-line', label: 'Reorder' },
        { icon: 'ri-scan-2-line', label: 'Audit Stock' },
        { icon: 'ri-notification-3-line', label: 'Create Stock Alert' },
        { icon: 'ri-history-line', label: 'Stock History' },
    ]

    return (
        <div ref={menuRef} className="absolute top-full right-4 mt-1 w-48 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-border dark:border-dark-border z-10 animate-fade-in" style={{ animationDuration: '150ms'}}>
            <ul className="py-2">
                {menuItems.map(item => (
                    <li key={item.label}>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-hover-bg">
                            <i className={`${item.icon} text-text-body dark:text-dark-text-body`}></i>
                            <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

type SortableKeys = 'name' | 'sku' | 'category' | 'supplier' | 'stock' | 'unitPrice';

const InventoryListView: React.FC<{
    data: InventoryRowData[], 
    onEditProduct: (product: InventoryRowData) => void,
    selectedIds: number[],
    onSelectRow: (id: number) => void,
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
}> = ({ data, onEditProduct, selectedIds, onSelectRow, onSelectAll }) => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending' });

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue: string | number;
                let bValue: string | number;

                if (sortConfig.key === 'supplier') {
                    aValue = a.supplier.name;
                    bValue = b.supplier.name;
                } else {
                    aValue = a[sortConfig.key];
                    bValue = b[sortConfig.key];
                }
    
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    if (aValue.toLowerCase() < bValue.toLowerCase()) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (aValue.toLowerCase() > bValue.toLowerCase()) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                     if (aValue < bValue) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (aValue > bValue) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key: SortableKeys) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const allSelected = selectedIds.length === data.length && data.length > 0;
    const isIndeterminate = selectedIds.length > 0 && !allSelected;
    
    const getStockBarColor = (level: InventoryRowData['stockLevel']) => {
        switch(level) {
            case 'High': return 'bg-brand-green';
            case 'Low': return 'bg-stock-low';
            case 'Out of stock': return 'bg-stock-out';
            case 'Empty': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const SortableHeader: React.FC<{children: React.ReactNode, sortKey: SortableKeys}> = ({children, sortKey}) => {
        const isSorted = sortConfig?.key === sortKey;
        const icon = isSorted 
            ? (sortConfig.direction === 'ascending' ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>)
            : <i className="ri-arrow-up-down-line opacity-50"></i>;

        return (
            // FIX: Complete the component by adding closing tags and content.
            <div onClick={() => requestSort(sortKey)} className="flex items-center gap-1 cursor-pointer hover:text-heading dark:hover:text-dark-text-heading">
                <span>{children}</span>
                <span className="text-sm">{icon}</span>
            </div>
        );
    };

    // FIX: Add a return statement to render the component's JSX, resolving the type error.
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="text-xs text-text-body dark:text-dark-text-body uppercase bg-gray-50 dark:bg-dark-surface/50">
                    <tr>
                        <th className="p-4 w-4"><Checkbox checked={allSelected} indeterminate={isIndeterminate} onChange={onSelectAll} /></th>
                        <th className="px-4 py-3 font-medium"><SortableHeader sortKey="name">Product</SortableHeader></th>
                        <th className="px-4 py-3 font-medium"><SortableHeader sortKey="sku">SKU</SortableHeader></th>
                        <th className="px-4 py-3 font-medium"><SortableHeader sortKey="category">Category</SortableHeader></th>
                        <th className="px-4 py-3 font-medium"><SortableHeader sortKey="supplier">Supplier</SortableHeader></th>
                        <th className="px-4 py-3 font-medium"><SortableHeader sortKey="stock">Stock</SortableHeader></th>
                        <th className="px-4 py-3 font-medium"><SortableHeader sortKey="unitPrice">Unit Price</SortableHeader></th>
                        <th className="px-4 py-3 font-medium"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-border dark:divide-dark-border">
                    {sortedData.map(item => (
                        <tr key={item.id} onDoubleClick={() => onEditProduct(item)} className="bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover-bg transition-colors cursor-pointer">
                            <td className="p-4"><Checkbox checked={selectedIds.includes(item.id)} onChange={() => onSelectRow(item.id)} /></td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 dark:bg-dark-background rounded-lg p-1 flex-shrink-0">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain"/>
                                    </div>
                                    <span className="font-semibold text-heading dark:text-dark-text-heading">{item.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-text-body dark:text-dark-text-body">{item.sku}</td>
                            <td className="px-4 py-3 text-text-body dark:text-dark-text-body">{item.category}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <img src={item.supplier.logoUrl} alt={item.supplier.name} className="w-6 h-6 rounded-full"/>
                                    <span className="font-medium text-heading dark:text-dark-text-heading">{item.supplier.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${getStockBarColor(item.stockLevel)}`}></div>
                                    <span className="font-medium text-heading dark:text-dark-text-heading">{item.stock}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 font-medium text-heading dark:text-dark-text-heading">${item.unitPrice.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenu(activeMenu === item.id ? null : item.id);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-dark-active-bg"
                                >
                                    <i className="ri-more-2-fill text-lg text-text-body dark:text-dark-text-body"></i>
                                </button>
                                {activeMenu === item.id && <ActionMenu onClose={() => setActiveMenu(null)} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Pagination: React.FC<{ totalItems: number, itemsPerPage: number, currentPage: number, onPageChange: (page: number) => void }> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    return (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-6">
            <div className="text-sm text-text-body dark:text-dark-text-body">
                Showing <span className="font-semibold text-heading dark:text-dark-text-heading">{(currentPage - 1) * itemsPerPage + 1}-{(currentPage - 1) * itemsPerPage + itemsPerPage}</span> of <span className="font-semibold text-heading dark:text-dark-text-heading">{totalItems}</span>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-border dark:border-dark-border text-text-body dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-subtle transition-colors disabled:opacity-50">
                    <i className="ri-arrow-left-s-line text-xl"></i>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button 
                        key={page} 
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors text-sm
                            ${page === currentPage 
                                ? 'bg-primary text-white border border-primary' 
                                : 'border border-gray-border dark:border-dark-border text-text-body dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-subtle'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-border dark:border-dark-border text-text-body dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-subtle transition-colors disabled:opacity-50">
                    <i className="ri-arrow-right-s-line text-xl"></i>
                </button>
            </div>
        </div>
    );
};

const ProductsPage: React.FC<ProductsPageProps> = ({ onAddProduct, onEditProduct }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [allProducts, setAllProducts] = useState(productsData);
    const [allInventory, setAllInventory] = useState(inventoryData);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return allProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [allProducts, currentPage]);

    const paginatedInventory = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return allInventory.slice(startIndex, startIndex + itemsPerPage);
    }, [allInventory, currentPage]);

    const handleSelectProduct = (id: number) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };
    
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentData = viewMode === 'grid' ? paginatedProducts : paginatedInventory;
        setSelectedIds(e.target.checked ? currentData.map(p => p.id) : []);
    };
    
    return (
        <FadeIn>
            <div className="flex flex-col">
                <div className="space-y-6">
                    <PageHeader onAddProduct={onAddProduct} />
                    <Tabs />
                    <Toolbar viewMode={viewMode} setViewMode={setViewMode} />
                </div>

                <div className="mt-6">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {paginatedProducts.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    isSelected={selectedIds.includes(product.id)}
                                    onSelect={() => handleSelectProduct(product.id)}
                                    onEdit={() => onEditProduct(allInventory.find(item => item.name === product.name)!)}
                                />
                            ))}
                        </div>
                    ) : (
                        <InventoryListView 
                            data={paginatedInventory} 
                            onEditProduct={onEditProduct} 
                            selectedIds={selectedIds}
                            onSelectRow={handleSelectProduct}
                            onSelectAll={handleSelectAll}
                        />
                    )}
                </div>

                <Pagination 
                    totalItems={viewMode === 'grid' ? allProducts.length : allInventory.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </FadeIn>
    );
};

export default ProductsPage;
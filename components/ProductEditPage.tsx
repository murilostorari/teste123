import React, { useState, useRef, useEffect } from 'react';
import { InventoryRowData } from '../types';
import FadeIn from './FadeIn';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomDropdown from './CustomDropdown';
import AddVariantModal from './AddVariantModal';
import ToggleSwitch from './ToggleSwitch';

interface ProductVariant {
    id: number;
    image?: string;
    [key: string]: any; // For dynamic variant types like Colors, Size
    Price: string;
    Stock: string;
    SKU: string;
    Status: boolean;
}

interface ProductEditPageProps {
    mode: 'add' | 'edit';
    product?: InventoryRowData | null;
    onBack: () => void;
    isDarkMode: boolean;
}

const productImages = [
    'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300',
];

const salesData = Array.from({ length: 28 }, (_, i) => ({
    name: String(i + 1).padStart(2, '0'),
    'Sales': 400 + Math.sin(i / 2.5) * 350 + Math.random() * 150 + i * 10,
    'Last month': 350 + Math.sin(i / 3) * 300 + Math.random() * 120 + i * 8,
}));


const PageHeader: React.FC<{ mode: 'add' | 'edit'; product?: InventoryRowData | null; }> = ({ mode, product }) => (
    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div className="flex-1">
            {mode === 'edit' && product ? (
                <div className="flex items-center gap-4 mb-1 flex-wrap">
                    <h1 className="text-3xl font-bold text-dark-text dark:text-dark-text-heading">{product.name}</h1>
                    <div className="flex items-center gap-1.5 text-xs font-medium py-1 px-3 rounded-full bg-green-tag-bg text-green-tag">
                        <i className="ri-check-fill"></i> Active
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium py-1 px-3 rounded-full bg-gray-tag-bg text-gray-tag">
                        <i className="ri-archive-line"></i> Inventory
                    </div>
                    <button className="text-gray-text dark:text-dark-text-body"><i className="ri-more-2-fill"></i></button>
                </div>
            ) : (
                <h1 className="text-3xl font-bold text-dark-text dark:text-dark-text-heading">Add New Product</h1>
            )}
            {mode === 'edit' && product ? (
                <p className="text-sm text-gray-text dark:text-dark-text-body">
                    SKU: {product.sku} &middot; Created 30 Jan 2024 &middot; Last Updated Yesterday
                </p>
            ) : (
                <p className="text-base text-gray-text dark:text-dark-text-body">Create a new product to be added to your inventory.</p>
            )}
        </div>
        <div className="flex items-center gap-4 self-end md:self-start flex-shrink-0 flex-wrap">
            {mode === 'edit' && (
                <>
                    <button className="text-sm font-semibold text-dark-text dark:text-dark-text-heading underline underline-offset-2">Duplicate</button>
                    <button className="text-sm font-semibold text-dark-text dark:text-dark-text-heading underline underline-offset-2">Share Products</button>
                    <span className="text-sm text-gray-text dark:text-dark-text-body">Product 12.567 out of 32.068</span>
                    <div className="flex items-center rounded-lg border border-gray-border dark:border-dark-border">
                        <button className="w-9 h-9 flex items-center justify-center text-gray-text border-r border-gray-border dark:border-dark-border"><i className="ri-arrow-left-s-line"></i></button>
                        <button className="w-9 h-9 flex items-center justify-center text-gray-text"><i className="ri-arrow-right-s-line"></i></button>
                    </div>
                </>
            )}
        </div>
    </div>
);

const Card: React.FC<{ children: React.ReactNode, className?: string, noPadding?: boolean }> = ({ children, className, noPadding }) => (
    <div className={`bg-white dark:bg-dark-surface rounded-xl ${!noPadding && 'p-6'} ${className}`}>
        {children}
    </div>
);


const Section: React.FC<{ title?: string, children: React.ReactNode, className?: string, action?: React.ReactNode }> = ({ title, children, className, action }) => (
    <div className={className}>
        {title && (
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-dark-text dark:text-dark-text-heading">{title}</h3>
                {action}
            </div>
        )}
        {children}
    </div>
);

const SidebarCard: React.FC<{ title: string, children: React.ReactNode, className?: string, action?: React.ReactNode }> = ({ title, children, className, action }) => (
    <div className={`bg-white dark:bg-dark-surface rounded-xl border border-gray-border dark:border-dark-border p-6 ${className}`}>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-dark-text dark:text-dark-text-heading">{title}</h3>
                {title === 'Total sales' && <i className="ri-information-line text-gray-400"></i>}
            </div>
            {action}
        </div>
        {children}
    </div>
);

const FormInput: React.FC<{ label: string, id: string, defaultValue?: string, type?: string, icon?: React.ReactNode, info?: boolean }> = ({ label, id, defaultValue, type = "text", icon, info = false }) => (
    <div className="relative">
        <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">
            {label} {info && <i className="ri-information-line text-gray-400"></i>}
        </label>
        <div className="relative">
            <input type={type} id={id} defaultValue={defaultValue} className={`w-full h-11 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200 ${icon ? 'pl-9' : 'px-4'}`} />
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        </div>
    </div>
);

const FormCheckbox: React.FC<{ label?: string, id: string, defaultChecked?: boolean }> = ({ label, id, defaultChecked }) => (
    <label htmlFor={id} className={`flex items-center cursor-pointer group ${label ? 'gap-3' : ''}`}>
        <div className="relative flex items-center justify-center w-5 h-5">
            <input type="checkbox" id={id} defaultChecked={defaultChecked} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200" />
            <i className="ri-check-line absolute text-white hidden peer-checked:block pointer-events-none"></i>
        </div>
        {label && <span className="text-sm font-medium text-dark-text dark:text-dark-text-heading">{label}</span>}
    </label>
);

const ProductEditPage: React.FC<ProductEditPageProps> = ({ mode, product, onBack, isDarkMode }) => {
    const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
    const [variants, setVariants] = useState<ProductVariant[]>([]);

    const [category, setCategory] = useState(mode === 'edit' ? (product?.category || 'Laptop') : 'Select category');
    const [type, setType] = useState(mode === 'edit' ? 'Electronic' : 'Select type');
    const [vendor, setVendor] = useState(mode === 'edit' ? (product?.supplier.name || 'Select vendor') : 'Select vendor');
    const [tags, setTags] = useState(mode === 'edit' ? ['Apple', 'Macbook', 'Laptop', 'Workspace'] : []);
    const [newTag, setNewTag] = useState('');
    const [shippingType, setShippingType] = useState<'physical' | 'digital'>('physical');
    const [weightUnit, setWeightUnit] = useState('Kilogram (kg)');
    const [lengthUnit, setLengthUnit] = useState('Centimeter (cm)');
    const [heightUnit, setHeightUnit] = useState('Centimeter (cm)');

    const imagesToDisplay = mode === 'edit' ? productImages : [];

    const handleSaveVariants = (newVariants: ProductVariant[]) => {
        setVariants(newVariants);
        setIsVariantModalOpen(false);
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            e.preventDefault();
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const tickColor = isDarkMode ? '#8A8E94' : '#667085';
    const rulerColor = isDarkMode ? '#353A40' : '#EAECF0';

    const variantTypes = variants.length > 0 ? Object.keys(variants[0]).filter(k => !['id', 'image', 'Price', 'Stock', 'SKU', 'Status'].includes(k)) : [];

    return (
        <FadeIn>
            <div className="max-w-[90rem] mx-auto">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <button onClick={onBack} className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-white dark:bg-dark-surface rounded-full text-xl hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors border border-gray-border dark:border-dark-border md:mt-1">
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <div className="flex-1 min-w-0 w-full">
                        <PageHeader mode={mode} product={product} />

                        <div className="mt-6 flex flex-col lg:flex-row gap-8 items-start">
                            {/* Main Content */}
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8">
                                <div className="lg:col-span-3 space-y-6">
                                    <Card noPadding>
                                        <div className="p-6">
                                            <Section>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                    {imagesToDisplay.map(img => (
                                                        <div key={img} className="relative group aspect-square bg-gray-50 dark:bg-dark-background rounded-lg p-2 border border-gray-border dark:border-dark-border">
                                                            <img src={img} alt="product" className="w-full h-full object-contain" />
                                                            <button className="absolute top-1 right-1 w-6 h-6 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"><i className="ri-close-line"></i></button>
                                                        </div>
                                                    ))}
                                                    <div className="aspect-square bg-white dark:bg-dark-surface rounded-lg border-2 border-dashed border-primary text-primary flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-primary/5 transition-colors">
                                                        <i className="ri-image-add-line text-2xl"></i>
                                                        <span className="text-sm font-semibold mt-2">Add more image</span>
                                                    </div>
                                                </div>
                                            </Section>
                                        </div>

                                        <hr className="border-gray-border dark:border-dark-border" />
                                        
                                        <div className="p-6">
                                            <Section title="Product Info">
                                                <div className="space-y-4">
                                                    <FormInput 
                                                        label="Product name" 
                                                        id="product-name" 
                                                        defaultValue={mode === 'edit' && product ? product.name : ""} 
                                                    />
                                                    <div>
                                                        <label htmlFor="product-description" className="flex items-center gap-1.5 text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">Description</label>
                                                        <textarea id="product-description" rows={5} className="w-full p-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200" defaultValue={mode === 'edit' ? "Experience unparalleled performance with the Macbook Pro 14-inch, featuring the powerful M1 Pro chip. With 512GB of storage, it's perfect for handling intensive tasks, creative projects, and seamless multitasking. Enjoy the stunning Retina display, long battery life, and advanced features designed for professionals." : ""}></textarea>
                                                        <div className="mt-2 flex justify-between items-center p-2 bg-gray-50 dark:bg-dark-active-bg border border-gray-border dark:border-dark-border rounded-lg flex-wrap">
                                                            <div className="flex items-center gap-1 text-gray-text dark:text-dark-text-body">
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-bold"></i></button>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-italic"></i></button>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-underline"></i></button>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-strikethrough"></i></button>
                                                                <div className="w-px h-6 bg-gray-border dark:bg-dark-border mx-1"></div>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-align-left"></i></button>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-align-center"></i></button>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-align-right"></i></button>
                                                                <div className="w-px h-6 bg-gray-border dark:bg-dark-border mx-1"></div>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-link"></i></button>
                                                                <button className="w-8 h-8 rounded hover:bg-gray-200 dark:hover:bg-dark-border"><i className="ri-list-ordered"></i></button>
                                                            </div>
                                                            <button className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-3 py-1.5 rounded-md">
                                                                <i className="ri-magic-line"></i> Generate with AI
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Section>
                                        </div>

                                        <hr className="border-gray-border dark:border-dark-border" />

                                        <div className="p-6">
                                            <Section title="Pricing">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <FormInput label="Price" id="price" defaultValue={mode === 'edit' ? "1000.00" : ""} icon={<span className="font-semibold text-gray-400">$</span>} info />
                                                    <FormInput label="Compare-at price" id="compare-price" defaultValue={mode === 'edit' ? "1000.00" : ""} icon={<span className="font-semibold text-gray-400">$</span>} info />
                                                    <FormInput label="Cost per item" id="cost" defaultValue={mode === 'edit' ? "950.00" : ""} icon={<span className="font-semibold text-gray-400">$</span>} />
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 mt-4 p-4 border border-gray-border dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-active-bg">
                                                    <div><p className="text-sm text-gray-text">Sales price</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">{mode === 'edit' ? '$1200.00' : '-'}</p></div>
                                                    <div><p className="text-sm text-gray-text">Profit</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">{mode === 'edit' ? '$200.00' : '-'}</p></div>
                                                    <div><p className="text-sm text-gray-text">Gross margin</p><p className="font-semibold text-dark-text dark:text-dark-text-heading">{mode === 'edit' ? '10%' : '-'}</p></div>
                                                </div>
                                            </Section>
                                        </div>

                                        <hr className="border-gray-border dark:border-dark-border" />
                                        
                                        <div className="p-6">
                                            <Section title="Stock">
                                                <div className="flex items-end gap-4">
                                                    <div className="flex-1">
                                                        <label htmlFor="on-hand-stock" className="block text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">On hand stock</label>
                                                        <input type="text" id="on-hand-stock" defaultValue="30" className="w-full h-11 px-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200" />
                                                    </div>
                                                    <button className="h-11 px-4 rounded-lg text-sm font-bold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border text-dark-text dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle flex-shrink-0">
                                                        Reorder
                                                    </button>
                                                </div>
                                                <div className="mt-6">
                                                    <FormCheckbox label="Continue selling when out of stock" id="continue-selling" />
                                                </div>
                                            </Section>
                                        </div>

                                        <hr className="border-gray-border dark:border-dark-border" />

                                        <div className="p-6">
                                            <Section title="Shipping">
                                                <p className="text-sm text-gray-text dark:text-dark-text-body mb-4">
                                                    Enter the product's shipping information, such as weight, size, and whether it can be shipped internationally.
                                                </p>
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <button
                                                        onClick={() => setShippingType('physical')}
                                                        className={`flex items-center justify-center gap-3 h-12 text-sm font-semibold border rounded-lg transition-colors ${
                                                            shippingType === 'physical'
                                                            ? 'bg-gray-50 dark:bg-dark-active-bg border-gray-300 dark:border-dark-border text-dark-text dark:text-dark-text-heading'
                                                            : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-text dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-active-bg'
                                                        }`}
                                                    >
                                                        <i className="ri-store-2-line text-lg"></i>
                                                        Physical product
                                                    </button>
                                                    <button
                                                        onClick={() => setShippingType('digital')}
                                                        className={`flex items-center justify-center gap-3 h-12 text-sm font-semibold border rounded-lg transition-colors ${
                                                            shippingType === 'digital'
                                                            ? 'bg-gray-50 dark:bg-dark-active-bg border-gray-300 dark:border-dark-border text-dark-text dark:text-dark-text-heading'
                                                            : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border text-gray-text dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-active-bg'
                                                        }`}
                                                    >
                                                        <i className="ri-luggage-cart-line text-lg"></i>
                                                        Digital product or service
                                                    </button>
                                                </div>
                                                {shippingType === 'physical' && (
                                                    <div className="space-y-4">
                                                        <div className="flex items-end gap-4">
                                                            <div className="flex-1">
                                                                <label htmlFor="weight" className="block text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">Weight</label>
                                                                <input type="text" id="weight" defaultValue="5" className="w-full h-11 px-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200" />
                                                            </div>
                                                            <div className="w-48 flex-shrink-0">
                                                                <CustomDropdown label="Unit" value={weightUnit} onSelect={setWeightUnit} options={['Kilogram (kg)', 'Gram (g)', 'Pound (lb)', 'Ounce (oz)']} fullWidth />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-end gap-4">
                                                            <div className="flex-1">
                                                                <label htmlFor="length" className="block text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">Length</label>
                                                                <input type="text" id="length" defaultValue="40" className="w-full h-11 px-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200" />
                                                            </div>
                                                            <div className="w-48 flex-shrink-0">
                                                                <CustomDropdown label="Unit" value={lengthUnit} onSelect={setLengthUnit} options={['Centimeter (cm)', 'Meter (m)', 'Inch (in)']} fullWidth />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-end gap-4">
                                                            <div className="flex-1">
                                                                <label htmlFor="height" className="block text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">Height</label>
                                                                <input type="text" id="height" defaultValue="32" className="w-full h-11 px-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-0 focus:border-primary transition-colors duration-200" />
                                                            </div>
                                                            <div className="w-48 flex-shrink-0">
                                                                <CustomDropdown label="Unit" value={heightUnit} onSelect={setHeightUnit} options={['Centimeter (cm)', 'Meter (m)', 'Inch (in)']} fullWidth />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Section>
                                        </div>

                                        <hr className="border-gray-border dark:border-dark-border" />

                                        <div className="p-6">
                                            <Section
                                                title="Variant"
                                                action={
                                                    variants.length > 0 && (
                                                        <button onClick={() => setIsVariantModalOpen(true)} className="text-sm font-semibold text-primary">
                                                            Edit variant
                                                        </button>
                                                    )
                                                }
                                            >
                                                {variants.length === 0 ? (
                                                    <div className="text-center py-8">
                                                        <div className="w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto text-3xl text-gray-400">
                                                            <i className="ri-folder-add-line"></i>
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-dark-text dark:text-dark-text-heading mt-4">There’s no variant</h3>
                                                        <p className="text-sm text-gray-text dark:text-dark-text-body mt-1 max-w-xs mx-auto">You can add more variant for your product by clicked add variant button below</p>
                                                        <button onClick={() => setIsVariantModalOpen(true)} className="mt-4 flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-bold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border text-dark-text dark:text-dark-text-heading mx-auto hover:bg-gray-50 dark:hover:bg-dark-subtle">
                                                            <i className="ri-add-line"></i> Add variant
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full text-sm">
                                                            <thead>
                                                                <tr className="border-b border-gray-border dark:border-dark-border">
                                                                    <th className="p-2 w-4"><FormCheckbox id="check-all-variants" /></th>
                                                                    <th className="p-2 font-semibold text-left text-dark-text dark:text-dark-text-heading">Image</th>
                                                                    {variantTypes.map(type => (
                                                                        <th key={type} className="p-2 font-semibold text-left text-dark-text dark:text-dark-text-heading">{type}</th>
                                                                    ))}
                                                                    <th className="p-2 font-semibold text-left text-dark-text dark:text-dark-text-heading">Price</th>
                                                                    <th className="p-2 font-semibold text-left text-dark-text dark:text-dark-text-heading">Stock</th>
                                                                    <th className="p-2 font-semibold text-left text-dark-text dark:text-dark-text-heading">Status</th>
                                                                    <th className="p-2"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {variants.map(v => (
                                                                    <tr key={v.id} className="border-b border-gray-border dark:border-dark-border last:border-0">
                                                                        <td className="p-2"><FormCheckbox id={`check-${v.id}`} /></td>
                                                                        <td className="p-2">
                                                                            <div className="w-10 h-10 bg-gray-50 dark:bg-dark-active-bg rounded-md p-1">
                                                                                {v.image ? <img src={v.image} alt={v.id.toString()} className="w-full h-full object-contain" /> : <i className="ri-image-line text-2xl text-gray-300 w-full h-full flex items-center justify-center"></i>}
                                                                            </div>
                                                                        </td>
                                                                        {variantTypes.map(type => (
                                                                             <td key={type} className="p-2 text-gray-text dark:text-dark-text-body">{v[type] || '-'}</td>
                                                                        ))}
                                                                        <td className="p-2 text-gray-text dark:text-dark-text-body">${v.Price}</td>
                                                                        <td className="p-2 text-gray-text dark:text-dark-text-body">{v.Stock}</td>
                                                                        <td className="p-2"><ToggleSwitch checked={v.Status} onChange={() => {}}/></td>
                                                                        <td className="p-2 text-right"><button className="font-semibold text-primary">Make default</button></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                )}
                                            </Section>
                                        </div>
                                    </Card>
                                </div>

                                {/* Right Sidebar */}
                                <div className="w-full lg:col-span-2 space-y-6 pl-0 lg:pl-8 lg:border-l border-gray-border dark:border-dark-border">
                                    {mode === 'edit' && (
                                        <SidebarCard title="Total sales">
                                            <div className="">
                                                <div className="flex items-baseline gap-3">
                                                    <p className="text-3xl font-semibold text-dark-text dark:text-dark-text-heading">$840.00</p>
                                                    <div className="flex items-center text-sm">
                                                        <div className="flex items-center mr-1 text-brand-green font-semibold">
                                                            <i className="ri-arrow-up-line"></i>
                                                            <span className="ml-1">1.34%</span>
                                                        </div>
                                                        <span className="text-gray-text dark:text-dark-text-body">vs last month</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-40 -ml-6 mt-4">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#353A40' : '#EAECF0'} />
                                                        <YAxis
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: tickColor, fontSize: 12 }}
                                                            tickFormatter={(v) => {
                                                                if (v === 0) return '0';
                                                                if (v === 1200) return '$1.2K';
                                                                return `$${v}`;
                                                            }}
                                                            domain={[0, 1200]}
                                                            ticks={[0, 400, 800, 1200]}
                                                        />
                                                        <XAxis dataKey="name" axisLine={{ stroke: rulerColor }} tickLine={{ stroke: rulerColor }} tick={{ fill: tickColor, fontSize: 12, dy: 10 }} tickFormatter={(tick) => ['01', '15', '28'].includes(tick) ? `Feb ${tick}` : ''} interval={0} padding={{ left: 20, right: 20 }} />
                                                        <Tooltip contentStyle={{ display: 'none' }} cursor={{ stroke: '#F97316', strokeOpacity: 0.5, strokeDasharray: '3 3' }} />
                                                        <Line type="monotone" dataKey="Sales" stroke="#F97316" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#F97316', stroke: isDarkMode ? '#1D2025' : 'white', strokeWidth: 2 }} />
                                                        <Line type="monotone" dataKey="Last month" stroke="#FDBA74" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#FDBA74', stroke: isDarkMode ? '#1D2025' : 'white', strokeWidth: 2 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </SidebarCard>
                                    )}

                                    <SidebarCard title="Product Organization">
                                        <div className="space-y-4">
                                            <FormInput label="SKU" id="org-sku" defaultValue={mode === 'edit' ? (product?.sku || "MAC-09485") : ""} />
                                            <div>
                                                <label className="block text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">Channel</label>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 flex items-center gap-2 h-11 px-3 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg">
                                                        <i className="ri-store-2-line"></i>
                                                        <span className="text-sm font-medium text-dark-text dark:text-dark-text-heading">Fikri Store</span>
                                                    </div>
                                                    <button className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-border dark:border-dark-border text-xl text-gray-text hover:bg-gray-50 dark:hover:bg-dark-subtle"><i className="ri-add-line"></i></button>
                                                </div>
                                            </div>
                                            <CustomDropdown label="Category" value={category} onSelect={setCategory} options={['Laptop', 'Electronic', 'Audio', 'Gaming']} fullWidth />
                                            <CustomDropdown label="Type" value={type} onSelect={setType} options={['Electronic', 'Accessory']} fullWidth />
                                            <CustomDropdown label="Vendor" value={vendor} onSelect={setVendor} options={['Select vendor', 'Apple Store', 'Urban Deals', 'MetroShop']} fullWidth />
                                            <div>
                                                <label className="block text-sm font-medium text-gray-text dark:text-dark-text-body mb-1.5">Tags</label>
                                                <div className="p-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg flex flex-wrap items-center gap-2">
                                                    {tags.map(tag => (
                                                        <div key={tag} className="flex items-center gap-1.5 bg-gray-50 dark:bg-dark-active-bg px-2 py-1 rounded-md border border-gray-border dark:border-dark-border text-sm font-medium">
                                                            {tag} <button onClick={() => removeTag(tag)}><i className="ri-close-line text-gray-500"></i></button>
                                                        </div>
                                                    ))}
                                                    <input
                                                        type="text"
                                                        value={newTag}
                                                        onChange={(e) => setNewTag(e.target.value)}
                                                        onKeyDown={handleTagKeyDown}
                                                        className="flex-1 bg-transparent focus:outline-none min-w-[60px] text-sm"
                                                        placeholder={tags.length === 0 ? "Add tag" : ""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </SidebarCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isVariantModalOpen && (
                <AddVariantModal 
                    onClose={() => setIsVariantModalOpen(false)}
                    onSave={handleSaveVariants}
                    product={product}
                />
            )}
        </FadeIn>
    );
};

export default ProductEditPage;
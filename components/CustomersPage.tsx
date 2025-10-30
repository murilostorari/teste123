import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CustomerDashboardData } from '../types';
import FadeIn from './FadeIn';

// --- MOCK DATA ---
const customersData: CustomerDashboardData[] = [
    { id: '#56578', name: 'Brooklyn Simmons', avatarUrl: 'https://i.pravatar.cc/40?u=a', orders: 131, totalOrder: 3950.00, avgOrderValue: 3950.00, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56579', name: 'Dianne Russell', avatarUrl: 'https://i.pravatar.cc/40?u=b', orders: 89, totalOrder: 110.00, avgOrderValue: 5.00, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56580', name: 'Jerome Bell', avatarUrl: 'https://i.pravatar.cc/40?u=c', orders: 2, totalOrder: 14.90, avgOrderValue: 1090.00, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56581', name: 'Ronald Richards', avatarUrl: 'https://i.pravatar.cc/40?u=d', orders: 211, totalOrder: 3950.00, avgOrderValue: 234.00, status: 'Inactive', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56582', name: 'Cody Fisher', avatarUrl: 'https://i.pravatar.cc/40?u=e', orders: 141, totalOrder: 3666.00, avgOrderValue: 10333.00, status: 'Inactive', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56583', name: 'Cameron Williamson', avatarUrl: 'https://i.pravatar.cc/40?u=f', orders: 41, totalOrder: 853.00, avgOrderValue: 96.00, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56584', name: 'Wade Warren', avatarUrl: 'https://i.pravatar.cc/40?u=g', orders: 32, totalOrder: 412.60, avgOrderValue: 110.00, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56585', name: 'Savannah Nguyen', avatarUrl: 'https://i.pravatar.cc/40?u=h', orders: 132, totalOrder: 7850.00, avgOrderValue: 853.00, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56586', name: 'Darlene Robertson', avatarUrl: 'https://i.pravatar.cc/40?u=i', orders: 40, totalOrder: 1090.00, avgOrderValue: 412.60, status: 'Inactive', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56587', name: 'Leslie Alexander', avatarUrl: 'https://i.pravatar.cc/40?u=j', orders: 12, totalOrder: 96.00, avgOrderValue: 14.90, status: 'Active', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56588', name: 'Dianne Russell II', avatarUrl: 'https://i.pravatar.cc/40?u=k', orders: 71, totalOrder: 550.00, avgOrderValue: 550.00, status: 'Inactive', lastOrder: 'Mar 17, 2024', checked: false },
    { id: '#56589', name: 'Annette Black', avatarUrl: 'https://i.pravatar.cc/40?u=l', orders: 55, totalOrder: 1240.50, avgOrderValue: 22.55, status: 'Active', lastOrder: 'Mar 16, 2024', checked: false },
    { id: '#56590', name: 'Floyd Miles', avatarUrl: 'https://i.pravatar.cc/40?u=m', orders: 201, totalOrder: 8730.00, avgOrderValue: 43.43, status: 'Inactive', lastOrder: 'Mar 15, 2024', checked: false },
];

// --- ICONS & REUSABLE COMPONENTS (Cloned from ProductsPage) ---
const Checkbox: React.FC<{ checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; indeterminate?: boolean }> = ({ checked, onChange, indeterminate }) => {
    const ref = React.useRef<HTMLInputElement>(null!);
    React.useEffect(() => { ref.current.indeterminate = indeterminate || false; }, [indeterminate]);
    return (
        <div className="relative flex items-center justify-center w-5 h-5">
            <input ref={ref} type="checkbox" checked={checked} onChange={onChange} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200" />
            <i className="ri-check-line absolute text-white hidden peer-checked:block pointer-events-none"></i>
            <i className="ri-subtract-line absolute text-white hidden peer-indeterminate:block pointer-events-none"></i>
        </div>
    );
};

// --- SKELETON LOADER (Cloned and adapted from ProductsPage) ---
const CustomersTableSkeleton = () => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm animate-pulse">
            <thead className="text-xs text-transparent bg-gray-50 dark:bg-dark-surface/50">
                <tr>
                    <th className="p-4 w-4"><div className="h-5 w-5 bg-gray-200 dark:bg-dark-border rounded-md"></div></th>
                    {[...Array(7)].map((_, i) => <th key={i} className="px-4 py-2"><div className="h-5 bg-gray-200 dark:bg-dark-border rounded w-20"></div></th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-border dark:divide-dark-border">
                {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="bg-white dark:bg-dark-surface">
                        <td className="p-4"><div className="h-5 w-5 bg-gray-200 dark:bg-dark-border rounded-md"></div></td>
                        <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-16"></div></td>
                        <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-200 dark:bg-dark-border rounded-full"></div><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-32"></div></div></td>
                        <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-12"></div></td>
                        <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-20"></div></td>
                        <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-20"></div></td>
                        <td className="px-4 py-3"><div className="h-6 w-20 bg-gray-200 dark:bg-dark-border rounded-full"></div></td>
                        <td className="px-4 py-3"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-24"></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


// --- SUB-COMPONENTS for CustomersPage (Cloned and adapted from ProductsPage) ---
const PageHeader: React.FC = () => (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-heading dark:text-dark-text-heading">Customers</h1>
            <p className="text-base text-text-body dark:text-dark-text-body mt-1">Manage all your customers in one place.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 h-10 rounded-lg text-sm font-bold hover:brightness-110 transition-all duration-300">
            <i className="ri-add-line text-lg"></i>
            <span>Add Customer</span>
        </button>
    </div>
);

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Customers');
    const tabsData = [
        { name: 'All Customers', icon: <i className="ri-group-line text-lg"></i> },
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

const FilterButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <button className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border px-3 h-10 rounded-lg text-sm font-medium text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
        <span>{children}</span>
        <i className="ri-arrow-down-s-line text-lg text-text-body dark:text-dark-text-body"></i>
    </button>
);


const Toolbar: React.FC = () => {
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
        </div>
    )
};

type SortableKeys = 'id' | 'name' | 'orders' | 'totalOrder' | 'avgOrderValue' | 'status' | 'lastOrder';

const CustomersTable: React.FC<{
    customers: CustomerDashboardData[];
    selectedIds: string[];
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRowCheck: (id: string) => void;
}> = ({ customers, selectedIds, onSelectAll, onRowCheck }) => {
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending' });

    const sortedData = useMemo(() => {
        let sortableItems = [...customers];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
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
    }, [customers, sortConfig]);

    const requestSort = (key: SortableKeys) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const allSelected = customers.length > 0 && selectedIds.length === customers.length;
    const isIndeterminate = selectedIds.length > 0 && !allSelected;

    const SortableHeader: React.FC<{children: React.ReactNode, sortKey: SortableKeys}> = ({children, sortKey}) => {
        const isSorted = sortConfig?.key === sortKey;
        const icon = isSorted 
            ? (sortConfig.direction === 'ascending' ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>)
            : <i className="ri-arrow-up-down-line opacity-50"></i>;

        return (
            <div onClick={() => requestSort(sortKey)} className="flex items-center gap-1 cursor-pointer hover:text-heading dark:hover:text-dark-text-heading">
                <span>{children}</span>
                <span className="text-sm">{icon}</span>
            </div>
        );
    };
    
    const StatusPill: React.FC<{status: 'Active' | 'Inactive'}> = ({ status }) => {
        const isActive = status === 'Active';
        return (
            <div className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium text-heading dark:text-dark-text-heading">{status}</span>
            </div>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-dark-surface/50 text-base text-text-body dark:text-dark-text-body">
                    <tr>
                        <th className="p-4 w-4"><Checkbox checked={allSelected} indeterminate={isIndeterminate} onChange={onSelectAll} /></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="id">Customer ID</SortableHeader></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="name">Name</SortableHeader></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="orders">No.of Order</SortableHeader></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="totalOrder">Total order</SortableHeader></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="avgOrderValue">Avg. order value</SortableHeader></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="status">Status</SortableHeader></th>
                        <th className="px-4 py-2 font-medium"><SortableHeader sortKey="lastOrder">Last order</SortableHeader></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-border dark:divide-dark-border">
                    {sortedData.map((customer) => (
                        <tr key={customer.id} className="bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover-bg transition-colors cursor-pointer">
                            <td className="p-4"><Checkbox checked={selectedIds.includes(customer.id)} onChange={() => onRowCheck(customer.id)} /></td>
                            <td className="px-4 py-3 text-base font-medium text-heading dark:text-dark-text-heading">{customer.id}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <img src={customer.avatarUrl} alt={customer.name} className="w-10 h-10 rounded-full"/>
                                    <span className="text-base font-medium text-heading dark:text-dark-text-heading whitespace-nowrap">{customer.name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-base font-medium text-heading dark:text-dark-text-heading">{customer.orders}</td>
                            <td className="px-4 py-3 text-base font-medium text-heading dark:text-dark-text-heading">${customer.totalOrder.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                            <td className="px-4 py-3 text-base font-medium text-heading dark:text-dark-text-heading">${customer.avgOrderValue.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                            <td className="px-4 py-3"><StatusPill status={customer.status} /></td>
                            <td className="px-4 py-3 text-base font-medium text-heading dark:text-dark-text-heading whitespace-nowrap">{customer.lastOrder}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Pagination: React.FC<{ totalItems: number, itemsPerPage: number, currentPage: number, onPageChange: (page: number) => void }> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) { startPage = 2; endPage = 4; }
        if (currentPage >= totalPages - 2) { startPage = totalPages - 3; endPage = totalPages - 1; }

        for (let i = startPage; i <= endPage; i++) pages.push(i);
        
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-6">
            <div className="text-sm text-text-body dark:text-dark-text-body">
                Total Customers: <span className="font-semibold text-heading dark:text-dark-text-heading">{totalItems}</span>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-border dark:border-dark-border text-text-body dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-subtle transition-colors disabled:opacity-50">
                    <i className="ri-arrow-left-s-line text-xl"></i>
                </button>
                {pages.map((page, index) => (
                    <button 
                        key={index}
                        disabled={page === '...'}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
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
            <div className="hidden sm:block w-32"></div> {/* Placeholder to balance flexbox */}
        </div>
    );
};


const BulkActionToolbar: React.FC<{ count: number; onClear: () => void; }> = ({ count, onClear }) => {
    const actions = [
        { label: 'Export', icon: 'ri-upload-2-line' },
        { label: 'Print', icon: 'ri-printer-line' },
        { label: 'Duplicate', icon: 'ri-file-copy-line' },
    ];
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto bg-heading text-white rounded-xl shadow-2xl z-40 animate-slideInUp">
            <div className="flex items-center justify-center gap-2 md:gap-4 p-3 text-sm">
                <button onClick={onClear} className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                    <i className="ri-close-line"></i>
                </button>
                <div className="font-semibold">Selected: {count}</div>
                <div className="w-px h-6 bg-white/20 hidden md:block"></div>
                {actions.map(action => (
                    <button key={action.label} className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors">
                        <i className={action.icon}></i>
                        <span className="hidden sm:inline">{action.label}</span>
                    </button>
                ))}
                 <div className="w-px h-6 bg-white/20 hidden md:block"></div>
                 <button className="flex items-center gap-2 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-md transition-colors">
                    <i className="ri-delete-bin-line"></i>
                    <span className="hidden sm:inline">Delete</span>
                 </button>
                 <div className="w-px h-6 bg-white/20 hidden md:block"></div>
                 <button className="hover:bg-white/10 px-2 py-1.5 rounded-md transition-colors">
                    <i className="ri-more-2-fill"></i>
                 </button>
            </div>
        </div>
    );
};


const CustomersPage: React.FC = () => {
    const [allCustomers] = useState(customersData);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 10;
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return allCustomers.slice(startIndex, startIndex + itemsPerPage);
    }, [allCustomers, currentPage]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIds(e.target.checked ? paginatedCustomers.map(c => c.id) : []);
    };

    const handleRowCheck = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <FadeIn>
            <div className="flex flex-col">
                <div className="space-y-6">
                    <PageHeader />
                    <Tabs />
                    <Toolbar />
                </div>
                <div className="mt-6">
                     {isLoading ? <CustomersTableSkeleton /> : (
                         <CustomersTable 
                            customers={paginatedCustomers}
                            selectedIds={selectedIds}
                            onSelectAll={handleSelectAll}
                            onRowCheck={handleRowCheck}
                        />
                     )}
                </div>
                {!isLoading && (
                    <Pagination 
                        totalItems={allCustomers.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                )}
                {selectedIds.length > 0 && (
                    <BulkActionToolbar 
                        count={selectedIds.length}
                        onClear={() => setSelectedIds([])}
                    />
                )}
            </div>
        </FadeIn>
    );
};

export default CustomersPage;
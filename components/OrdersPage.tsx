import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { OrderDashboardData } from '../types';
import FadeIn from './FadeIn';
import CustomDropdown from './CustomDropdown';
import ManageColumnsModal from './icons/ManageColumnsModal';

// --- HOOKS ---
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


// --- ICONS ---
const Checkbox: React.FC<{ checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; indeterminate?: boolean }> = ({ checked, onChange, indeterminate }) => {
    const ref = useRef<HTMLInputElement>(null!);
    useEffect(() => { ref.current.indeterminate = indeterminate || false; }, [indeterminate]);
    return (
        <div className="relative flex items-center justify-center w-5 h-5">
            <input ref={ref} type="checkbox" checked={checked} onChange={onChange} className="peer appearance-none h-5 w-5 rounded-md border border-gray-300 dark:border-dark-border checked:bg-primary checked:border-primary indeterminate:bg-primary indeterminate:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200" />
            <i className="ri-check-line absolute text-white hidden peer-checked:block pointer-events-none"></i>
            <i className="ri-subtract-line absolute text-white hidden peer-indeterminate:block pointer-events-none"></i>
        </div>
    );
};


// --- MOCK DATA ---
const generateChartData = () => Array.from({ length: 20 }, (_, i) => ({ value: Math.random() * (i + 10) * 5 + 10 }));

const orderStats = [
    { title: "Total de Pedidos", icon: "ri-shopping-bag-3-line", value: "200", change: 21.2, period: "7 dias", chartData: generateChartData(), chartColor: '#3B82F6' },
    { title: "Itens do Pedido", icon: "ri-shopping-cart-line", value: "43", change: 20.1, period: "7 dias", chartData: generateChartData(), chartColor: '#10B981' },
    { title: "Pedidos Devolvidos", icon: "ri-archive-line", value: "2", change: -2.1, period: "7 dias", chartData: generateChartData(), chartColor: '#EF4444' },
    { title: "Pedidos Cumpridos", icon: "ri-coupon-3-line", value: "30", change: 16.1, period: "7 dias", chartData: generateChartData(), chartColor: '#10B981' },
];

const ordersData: OrderDashboardData[] = [
  { id: '#430011564329', customer: { name: 'George Anderson', avatarUrl: 'https://i.pravatar.cc/40?u=1' }, date: '12 Jun, 2024', status: 'Pendente', total: 40.00, items: 500, delivery: 'Grátis', deliveryStatus: 'Por embalar', deliveryMethod: 'Pickup', note: 'Por favor, embrulhe a caixa para presente, para que o texto não seja legível, é para um presente de aniversário.' },
  { id: '#238765346758', customer: { name: 'Lawrence Hughes', avatarUrl: 'https://i.pravatar.cc/40?u=2' }, date: '23 Jul, 2024', status: 'Pago', total: 20.00, items: 100, delivery: 'N/A', deliveryStatus: 'Enviada', deliveryMethod: 'Shipping' },
  { id: '#148765346735', customer: { name: 'Thomas Mitchell', avatarUrl: 'https://i.pravatar.cc/40?u=3' }, date: '23 Jul, 2024', status: 'Pago', total: 20.00, items: 100, delivery: 'Grátis', deliveryStatus: 'Retirada', deliveryMethod: 'Pickup' },
  { id: '#347892345623', customer: { name: 'Frederick Lawson', avatarUrl: 'https://i.pravatar.cc/40?u=4' }, date: '23 Jul, 2024', status: 'Pendente', total: 20.00, items: 100, delivery: 'Grátis', deliveryStatus: 'Retirada', deliveryMethod: 'Pickup' },
  { id: '#987623456126', customer: { name: 'William Davenport', avatarUrl: 'https://i.pravatar.cc/40?u=5' }, date: '23 Jul, 2024', status: 'Cancelada', total: 20.00, items: 100, delivery: 'N/A', deliveryStatus: 'Por embalar', deliveryMethod: 'Shipping', note: 'Cliente solicitou cancelamento devido a endereço de entrega incorreto.' },
  { id: '#654327895432', customer: { name: 'Michael Harrington', avatarUrl: 'https://i.pravatar.cc/40?u=6' }, date: '23 Jul, 2024', status: 'Arquivada', total: 20.00, items: 100, delivery: 'Grátis', deliveryStatus: 'Enviada', deliveryMethod: 'Shipping' },
  { id: '#543219876543', customer: { name: 'Jonathan Turner', avatarUrl: 'https://i.pravatar.cc/40?u=7' }, date: '23 Jul, 2024', status: 'Pago', total: 20.00, items: 100, delivery: 'N/A', deliveryStatus: 'Por embalar', deliveryMethod: 'Shipping' },
  { id: '#138765346755', customer: { name: 'Christopher Morgan', avatarUrl: 'https://i.pravatar.cc/40?u=8' }, date: '23 Jul, 2024', status: 'Pendente', total: 20.00, items: 100, delivery: 'Grátis', deliveryStatus: 'Retirada', deliveryMethod: 'Pickup' },
  { id: '#381232359876', customer: { name: 'Nicholas Reynolds', avatarUrl: 'https://i.pravatar.cc/40?u=9' }, date: '20 Oct, 2024', status: 'Pendente', total: 30.00, items: 300, delivery: 'Grátis', deliveryStatus: 'Por embalar', deliveryMethod: 'Shipping' },
  { id: '#654577125694', customer: { name: 'Alexander Bennett', avatarUrl: 'https://i.pravatar.cc/40?u=10' }, date: '16 Nov, 2024', status: 'Pago', total: 10.00, items: 200, delivery: 'N/A', deliveryStatus: 'Enviada', deliveryMethod: 'Shipping' },
  { id: '#111222333444', customer: { name: 'Jessica Miller', avatarUrl: 'https://i.pravatar.cc/40?u=11' }, date: '01 Dec, 2024', status: 'Pago', total: 55.00, items: 150, delivery: 'Grátis', deliveryStatus: 'Retirada', deliveryMethod: 'Pickup', note: 'Cliente irá retirar na loja após as 14h.' },
  { id: '#555666777888', customer: { name: 'Daniel Clark', avatarUrl: 'https://i.pravatar.cc/40?u=12' }, date: '05 Dec, 2024', status: 'Pendente', total: 75.50, items: 250, delivery: 'N/A', deliveryStatus: 'Por embalar', deliveryMethod: 'Shipping' },
];

const allColumns = [
    { key: 'id', label: 'ID do Pedido' },
    { key: 'customer', label: 'Nome do Cliente' },
    { key: 'date', label: 'Data' },
    { key: 'status', label: 'Status' },
    { key: 'total', label: 'Total' },
    { key: 'items', label: 'Itens' },
    { key: 'delivery', label: 'Entrega' },
    { key: 'action', label: 'Ação' },
];


// --- SKELETON LOADER ---
const OrdersPageSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        {/* PageHeader Skeleton */}
        <div className="flex justify-between items-center">
            <div className="h-8 w-32 bg-gray-200 dark:bg-dark-border rounded"></div>
            <div className="flex items-center gap-2">
                <div className="h-9 w-24 bg-gray-200 dark:bg-dark-border rounded-lg"></div>
                <div className="h-9 w-28 bg-gray-200 dark:bg-dark-border rounded-lg"></div>
                <div className="h-9 w-32 bg-gray-200 dark:bg-dark-border rounded-lg"></div>
            </div>
        </div>
        {/* Stat Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-dark-border rounded"></div>
                        </div>
                        <div className="h-7 w-20 bg-gray-200 dark:bg-dark-border rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <div className="h-8 w-20 bg-gray-200 dark:bg-dark-border rounded mb-2"></div>
                        </div>
                        <div className="w-28 h-12 bg-gray-200 dark:bg-dark-border rounded"></div>
                    </div>
                </div>
            ))}
        </div>
        <hr className="border-border dark:border-dark-border" />
        {/* Toolbar and Table Skeleton */}
        <div className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-80 bg-gray-200 dark:bg-dark-border rounded-lg"></div>
                    <div className="h-10 w-28 bg-gray-200 dark:bg-dark-border rounded-lg"></div>
                    <div className="h-10 w-32 bg-gray-200 dark:bg-dark-border rounded-lg"></div>
                </div>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border overflow-hidden">
                 <table className="w-full text-sm min-w-[1200px]">
                    <thead className="bg-gray-50 dark:bg-dark-surface">
                        <tr>
                            <th className="px-4 py-3 w-4"><div className="h-5 w-5 bg-gray-200 dark:bg-dark-border rounded-md"></div></th>
                            {[...Array(8)].map((_, i) => <th key={i} className="px-4 py-3"><div className="h-5 bg-gray-200 dark:bg-dark-border rounded w-24"></div></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <tr key={i} className="border-t border-border dark:border-dark-border">
                                <td className="px-4 py-4"><div className="h-5 w-5 bg-gray-200 dark:bg-dark-border rounded-md"></div></td>
                                <td className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-28"></div></td>
                                <td className="px-4 py-4"><div className="flex items-center gap-2"><div className="w-7 h-7 bg-gray-200 dark:bg-dark-border rounded-full"></div><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-32"></div></div></td>
                                <td className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-24"></div></td>
                                <td className="px-4 py-4"><div className="h-6 w-20 bg-gray-200 dark:bg-dark-border rounded-full"></div></td>
                                <td className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-16"></div></td>
                                <td className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-16"></div></td>
                                <td className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-24"></div></td>
                                <td className="px-4 py-4"><div className="w-8 h-8 bg-gray-200 dark:bg-dark-border rounded"></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);


// --- SUB-COMPONENTS ---
const ActionMenu: React.FC<{
    anchorEl: HTMLElement | null;
    onClose: () => void;
    isClosing: boolean;
}> = ({ anchorEl, onClose, isClosing }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (anchorEl) {
            const rect = anchorEl.getBoundingClientRect();
            setStyle({
                position: 'fixed',
                top: `${rect.bottom + 4}px`,
                left: `${rect.right - 160}px`, // 160px = w-40
                zIndex: 50,
            });
        }
    }, [anchorEl]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                anchorEl &&
                !anchorEl.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, anchorEl]);
    
    if (!anchorEl) return null;

    return (
        <div 
            ref={menuRef} 
            style={style} 
            className={`w-40 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-border dark:border-dark-border origin-top-right ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        >
            <ul className="p-1.5">
                {[
                    { icon: 'ri-archive-line', label: 'Arquivar' },
                    { icon: 'ri-close-circle-line', label: 'Cancelar' },
                ].map(item => (
                    <li key={item.label}>
                            <button onClick={onClose} className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-base text-heading dark:text-dark-text-heading hover:bg-gray-100 dark:hover:bg-dark-hover-bg transition-colors duration-200">
                            <i className={`${item.icon} text-text-body dark:text-dark-text-body text-lg`}></i>
                            <span>{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface OrderStatCardProps {
    title: string;
    icon: string;
    value: string;
    change: number;
    period: string;
    chartData: { value: number }[];
    chartColor: string;
}

const OrderStatCard: React.FC<OrderStatCardProps> = ({ title, icon, value, change, period, chartData, chartColor }) => {
    const isNegative = change < 0;
    const changeValue = Math.abs(change);
    const actualChartColor = isNegative ? "#EF4444" : "#10B981";

    return (
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border p-4 flex flex-col">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: chartColor + '1A' }}>
                    <i className={`${icon} text-xl`} style={{ color: chartColor }}></i>
                </div>
                <p className="font-semibold text-heading dark:text-dark-text-heading">{title}</p>
            </div>

            <div className="my-3 border-t border-border dark:border-dark-border"></div>

            <div className="flex justify-between items-end mt-auto">
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-heading dark:text-dark-text-heading">{value}</p>
                         <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-md ${!isNegative ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'}`}>
                            <i className={`ri-arrow-${!isNegative ? 'up' : 'down'}-line`}></i>
                            <span>{changeValue}%</span>
                        </span>
                    </div>
                    <p className="text-sm text-text-body dark:text-dark-text-body mt-1">vs últimos {period}</p>
                </div>
                <div className="w-24 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id={`color-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={actualChartColor} stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor={actualChartColor} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke={actualChartColor} strokeWidth={2} fillOpacity={1} fill={`url(#color-${title.replace(/\s+/g, '')})`} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const statusFilterOptions = [
    { value: 'Todos os Status', label: 'Todos os Status' },
    { value: 'Pendente', label: 'Pendente', colorClass: 'bg-yellow-400' },
    { value: 'Pago', label: 'Pago', colorClass: 'bg-green-400' },
    { value: 'Cancelada', label: 'Cancelada', colorClass: 'bg-red-400' },
    { value: 'Arquivada', label: 'Arquivada', colorClass: 'bg-gray-400' },
];

const FilterToolbar: React.FC<{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    onManageColumnsClick: () => void;
    manageColumnsButtonRef: React.RefObject<HTMLButtonElement>;
    isMobile: boolean;
    viewMode: 'list' | 'grid';
    setViewMode: (mode: 'list' | 'grid') => void;
}> = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onManageColumnsClick, manageColumnsButtonRef, isMobile, viewMode, setViewMode }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 flex-grow">
                <div className="relative w-full md:w-auto md:flex-grow lg:flex-grow-0">
                    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-xl text-text-body dark:text-dark-text-body"></i>
                    <input 
                        type="text" 
                        placeholder="Buscar pedidos..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-96 pl-12 pr-4 h-12 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 text-base dark:text-dark-text-heading dark:placeholder:text-dark-text-body" 
                    />
                </div>
                <div className="flex items-center gap-2">
                    <CustomDropdown 
                        label=""
                        value={statusFilter}
                        onSelect={setStatusFilter}
                        options={statusFilterOptions}
                        buttonClass="h-12 px-4 rounded-lg text-base w-48"
                    />
                    <button className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border px-4 h-12 rounded-lg text-base font-medium text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
                        <span>Mais Filtros</span>
                        <i className="ri-arrow-down-s-line text-lg text-text-body dark:text-dark-text-body"></i>
                    </button>
                    {!isMobile && (
                        <button ref={manageColumnsButtonRef} onClick={onManageColumnsClick} className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border px-4 h-12 rounded-lg text-base font-medium text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
                            <i className="ri-layout-column-line"></i>
                            <span>Gerenciar Colunas</span>
                        </button>
                    )}
                </div>
            </div>
             <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                <div className="hidden lg:flex items-center gap-1 bg-gray-100 dark:bg-dark-active-bg p-1 rounded-lg">
                    <button 
                        onClick={() => setViewMode('list')} 
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
                            viewMode === 'list' 
                            ? 'bg-white dark:bg-dark-surface text-heading dark:text-dark-text-heading shadow-sm' 
                            : 'text-text-body dark:text-dark-text-body'
                        }`}
                    >
                        <i className="ri-list-check-2 text-lg"></i>
                        <span>List</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('grid')} 
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${
                            viewMode === 'grid' 
                            ? 'bg-white dark:bg-dark-surface text-heading dark:text-dark-text-heading shadow-sm' 
                            : 'text-text-body dark:text-dark-text-body'
                        }`}
                    >
                        <i className="ri-layout-grid-fill text-lg"></i>
                        <span>Grid</span>
                    </button>
                </div>
                <button className="flex items-center gap-2 px-4 h-12 text-base font-semibold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
                    <i className="ri-upload-2-line"></i>
                    <span>Exportar</span>
                </button>
                <button className="flex items-center gap-2 px-4 h-12 text-base font-semibold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle">
                    <span>Mais ações</span>
                    <i className="ri-arrow-down-s-line"></i>
                </button>
            </div>
        </div>
    );
};

type SortableKeys = 'id' | 'customer' | 'date' | 'status' | 'total' | 'items' | 'delivery';

interface OrdersTableProps {
    orders: OrderDashboardData[];
    selectedIds: string[];
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectRow: (id: string) => void;
    columns: { key: string; label: string; visible: boolean }[];
    onViewOrder: (order: OrderDashboardData) => void;
}

type OrderStatus = 'Pendente' | 'Pago' | 'Cancelada' | 'Arquivada';
const getStatusClass = (status: OrderStatus) => {
    switch (status) {
        case 'Pago': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
        case 'Pendente': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
        case 'Cancelada': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
        case 'Arquivada': return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
        default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
};

const getDeliveryStatusClass = (status: OrderDashboardData['deliveryStatus']) => {
    switch (status) {
        case 'Retirada':
        case 'Enviada':
            return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
        case 'Por embalar':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
};

const getDeliveryStatusIcon = (status: OrderDashboardData['deliveryStatus']) => {
    switch (status) {
        case 'Retirada': return 'ri-store-2-line';
        case 'Enviada': return 'ri-truck-line';
        case 'Por embalar': return 'ri-loader-3-line';
        default: return 'ri-question-mark';
    }
};

const OrderTableRow: React.FC<{
    order: OrderDashboardData;
    isSelected: boolean;
    onSelectRow: (id: string) => void;
    columns: { key: string; label: string; visible: boolean }[];
    onViewOrder: (order: OrderDashboardData) => void;
    onMenuClick: (orderId: string, target: HTMLElement) => void;
}> = ({ order, isSelected, onSelectRow, columns, onViewOrder, onMenuClick }) => {

    const renderCell = (order: OrderDashboardData, columnKey: string) => {
        switch(columnKey) {
            case 'id': return <span className="text-base font-medium text-heading dark:text-dark-text-heading">{order.id}</span>;
            case 'customer': return (
                 <div className="flex items-center gap-2">
                    <img src={order.customer.avatarUrl} alt={order.customer.name} className="w-7 h-7 rounded-full" />
                    <span className="font-medium text-base text-heading dark:text-dark-text-heading">{order.customer.name}</span>
                </div>
            );
            case 'date': return <span className="text-base font-medium text-heading dark:text-dark-text-heading">{order.date}</span>;
            case 'status': return (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium ${getStatusClass(order.status as OrderStatus)}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {order.status}
                </span>
            );
            case 'total': return <span className="text-base font-medium text-heading dark:text-dark-text-heading">R${order.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>;
            case 'items': return <span className="text-base font-medium text-heading dark:text-dark-text-heading">{order.items} itens</span>;
            case 'delivery': return (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium ${getDeliveryStatusClass(order.deliveryStatus)}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {order.deliveryStatus}
                </span>
            );
            case 'action': return (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onMenuClick(order.id, e.currentTarget);
                    }}
                    onDoubleClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 flex items-center justify-center text-base font-semibold bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle transition-colors"
                >
                    <i className="ri-more-2-fill text-xl"></i>
                </button>
            );
            default: return null;
        }
    }

    return (
        <tr onDoubleClick={() => onViewOrder(order)} className="border-t border-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover-bg cursor-pointer animate-fade-in-row">
            <td className="px-4 py-4"><Checkbox checked={isSelected} onChange={() => onSelectRow(order.id)} /></td>
            {columns.map(col => (
                <td 
                    key={col.key} 
                    className={`px-4 py-4 table-cell-transition ${!col.visible ? 'table-cell-hidden' : ''}`}
                >
                    {renderCell(order, col.key)}
                </td>
            ))}
        </tr>
    );
};


const OrdersTable: React.FC<OrdersTableProps> = ({ orders, selectedIds, onSelectAll, onSelectRow, columns, onViewOrder }) => {
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({ key: 'date', direction: 'descending' });
    const [activeMenu, setActiveMenu] = useState<{ orderId: string; anchorEl: HTMLElement | null } | null>(null);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    
    const handleMenuClick = (orderId: string, target: HTMLElement) => {
        if (activeMenu?.orderId === orderId) {
            setIsMenuClosing(true);
        } else {
            setIsMenuClosing(false);
            setActiveMenu({ orderId, anchorEl: target });
        }
    };
    
    const handleMenuClose = () => {
        setIsMenuClosing(true);
    };

    useEffect(() => {
        if (isMenuClosing) {
            const timer = setTimeout(() => {
                setActiveMenu(null);
                setIsMenuClosing(false);
            }, 150); 
            return () => clearTimeout(timer);
        }
    }, [isMenuClosing]);

    const sortedData = useMemo(() => {
        let sortableItems = [...orders];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue: string | number;
                let bValue: string | number;

                if (sortConfig.key === 'customer') {
                    aValue = a.customer.name;
                    bValue = b.customer.name;
                } else if (sortConfig.key === 'date') {
                    aValue = new Date(a.date).getTime();
                    bValue = new Date(b.date).getTime();
                } else if (sortConfig.key === 'delivery') {
                    aValue = a.deliveryStatus;
                    bValue = b.deliveryStatus;
                } else {
                    aValue = a[sortConfig.key as keyof Omit<OrderDashboardData, 'customer' | 'date' | 'delivery'>];
                    bValue = b[sortConfig.key as keyof Omit<OrderDashboardData, 'customer' | 'date' | 'delivery'>];
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
    }, [orders, sortConfig]);

    const requestSort = (key: SortableKeys) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const allSelected = orders.length > 0 && selectedIds.length === orders.length;
    const isIndeterminate = selectedIds.length > 0 && !allSelected;
    
    const SortableHeader: React.FC<{children: React.ReactNode, sortKey: SortableKeys}> = ({children, sortKey}) => {
        const isSorted = sortConfig?.key === sortKey;
        const icon = isSorted 
            ? (sortConfig.direction === 'ascending' ? <i className="ri-arrow-up-line"></i> : <i className="ri-arrow-down-line"></i>)
            : <i className="ri-arrow-up-down-line opacity-50"></i>;

        return (
            <div onClick={() => requestSort(sortKey)} className="flex items-center gap-1 cursor-pointer">
                <span>{children}</span>
                <span className="text-base">{icon}</span>
            </div>
        );
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1200px]">
                    <thead className="text-text-body dark:text-dark-text-body bg-transparent">
                        <tr className="border-b-0">
                            <th className="px-4 py-3 w-4 font-medium"><Checkbox onChange={onSelectAll} checked={allSelected} indeterminate={isIndeterminate} /></th>
                            {columns.map(col => (
                                <th 
                                    key={col.key} 
                                    className={`px-4 py-3 font-semibold text-base table-cell-transition ${!col.visible ? 'table-cell-hidden' : ''}`}
                                    style={{maxWidth: col.visible ? '300px' : '0px'}}
                                >
                                    {col.key === 'action' ? col.label : <SortableHeader sortKey={col.key as SortableKeys}>{col.label}</SortableHeader>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map(order => (
                           <OrderTableRow
                              key={order.id}
                              order={order}
                              isSelected={selectedIds.includes(order.id)}
                              onSelectRow={onSelectRow}
                              columns={columns}
                              onViewOrder={onViewOrder}
                              onMenuClick={handleMenuClick}
                           />
                        ))}
                    </tbody>
                </table>
            </div>
            {activeMenu && (
                <ActionMenu
                    key={activeMenu.orderId}
                    anchorEl={activeMenu.anchorEl}
                    onClose={handleMenuClose}
                    isClosing={isMenuClosing}
                />
            )}
        </>
    );
};

const OrderCard: React.FC<{
    order: OrderDashboardData;
    isSelected: boolean;
    onSelect: () => void;
    onViewOrder: (order: OrderDashboardData) => void;
}> = ({ order, isSelected, onSelect, onViewOrder }) => {
  return (
    <div onClick={() => onViewOrder(order)} className="bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border p-4 space-y-3 flex flex-col animate-fade-in-row cursor-pointer">
        <div className="flex items-start gap-3">
            <div onClick={(e) => e.stopPropagation()} className="pt-1">
                <Checkbox checked={isSelected} onChange={onSelect} indeterminate={false} />
            </div>
            <div className="flex-1 flex items-start gap-3">
                <div>
                    <h3 className="font-semibold text-sm text-heading dark:text-dark-text-heading leading-tight">{order.id}</h3>
                    <p className="text-xs text-text-body dark:text-dark-text-body">{order.date}</p>
                </div>
                <div className="w-px h-10 bg-border dark:bg-dark-border"></div>
                <div>
                    <p className="text-xs text-text-body dark:text-dark-text-body">
                        Itens: <span className="font-semibold text-heading dark:text-dark-text-heading">{order.items}</span>
                    </p>
                    <p className="text-xs text-text-body dark:text-dark-text-body">
                        Total: <span className="font-semibold text-heading dark:text-dark-text-heading">R${order.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-2 py-3 border-y border-border dark:border-dark-border">
            <img src={order.customer.avatarUrl} alt={order.customer.name} className="w-8 h-8 rounded-full"/>
            <p className="font-semibold text-heading dark:text-dark-text-heading">{order.customer.name}</p>
        </div>

        <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-2 flex-wrap">
                 <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${getDeliveryStatusClass(order.deliveryStatus)}`}>
                    <i className={`${getDeliveryStatusIcon(order.deliveryStatus)}`}></i>
                    {order.deliveryStatus}
                </span>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium ${getStatusClass(order.status as OrderStatus)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {order.status}
                </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-active-bg flex items-center justify-center text-heading dark:text-dark-text-heading flex-shrink-0">
                <i className="ri-arrow-right-s-line text-lg"></i>
            </div>
        </div>
    </div>
  );
};


// --- PAGINATION ---
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
        <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-border dark:border-dark-border text-text-body dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-subtle transition-colors disabled:opacity-50">
                <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            {pages.map((page, index) => (
                <button 
                    key={index}
                    disabled={page === '...'}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors text-base
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
    );
};

const BulkActionToolbar: React.FC<{ count: number; onClear: () => void; }> = ({ count, onClear }) => {
    const actions = [
        { label: 'Exportar', icon: 'ri-upload-2-line' },
        { label: 'Imprimir', icon: 'ri-printer-line' },
        { label: 'Arquivar', icon: 'ri-archive-line' },
    ];
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-auto bg-heading text-white rounded-xl shadow-2xl z-40 animate-slideInUp">
            <div className="flex items-center justify-center gap-2 md:gap-4 p-3 text-sm">
                <button onClick={onClear} className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                    <i className="ri-close-line"></i>
                </button>
                <div className="font-semibold">{count} selecionado(s)</div>
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
                    <span className="hidden sm:inline">Deletar</span>
                 </button>
            </div>
        </div>
    );
};

interface OrdersPageProps {
    onViewOrder: (order: OrderDashboardData) => void;
}

// --- MAIN COMPONENT ---
const OrdersPage: React.FC<OrdersPageProps> = ({ onViewOrder }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos os Status');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [isManageColumnsOpen, setIsManageColumnsOpen] = useState(false);
    const manageColsButtonRef = useRef<HTMLButtonElement>(null);
    const [columns, setColumns] = useState(allColumns.map(c => ({...c, visible: true})));
    const isMobileOrTablet = useMediaQuery('(max-width: 1023px)');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');


    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    // FIX: Moved `filteredOrders` and `paginatedOrders` before the `useEffect` that uses them to resolve the "used before declaration" error.
    const filteredOrders = useMemo(() => {
        return ordersData.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'Todos os Status' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);
    
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredOrders, currentPage]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);


    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIds(e.target.checked ? paginatedOrders.map(o => o.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    if (isLoading) {
        return <OrdersPageSkeleton />;
    }
    
    const pageHeaderContent = (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-heading dark:text-dark-text-heading">Pedidos</h1>
                <p className="text-lg text-text-body dark:text-dark-text-body mt-1">Acompanhe e gerencie todos os seus pedidos em um só lugar.</p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 h-12 rounded-lg text-base font-bold hover:brightness-110 transition-all duration-300 self-start sm:self-center flex-shrink-0">
                <i className="ri-add-line text-xl"></i>
                <span>Criar Pedido</span>
            </button>
        </div>
    );
    
    const statsContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderStats.map(stat => (
                <OrderStatCard key={stat.title} {...stat} />
            ))}
        </div>
    );

    const toolbarContent = (
         <FilterToolbar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onManageColumnsClick={() => setIsManageColumnsOpen(prev => !prev)}
            manageColumnsButtonRef={manageColsButtonRef}
            isMobile={isMobileOrTablet}
            viewMode={viewMode}
            setViewMode={setViewMode}
        />
    );

    const paginationContent = (
         <>
            <div className="text-base text-text-body dark:text-dark-text-body w-full sm:w-auto text-center sm:text-left">
                {paginatedOrders.length > 0 ? `Mostrando ${startIndex + 1} a ${endIndex} de ${filteredOrders.length} resultados` : 'Nenhum resultado encontrado'}
            </div>
            {paginatedOrders.length > 0 && (
                <Pagination 
                    totalItems={filteredOrders.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </>
    );

    return (
        <FadeIn>
            {isMobileOrTablet ? (
                <div className="bg-background dark:bg-dark-background">
                    <div className="space-y-6">
                        {pageHeaderContent}
                        {statsContent}
                        <hr className="border-border dark:border-dark-border my-6"/>
                        <div className="mt-6">{toolbarContent}</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                       {paginatedOrders.map(order => (
                           <OrderCard 
                                key={order.id}
                                order={order}
                                isSelected={selectedIds.includes(order.id)}
                                onSelect={() => handleSelectRow(order.id)}
                                onViewOrder={onViewOrder}
                           />
                       ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-3 mt-4">
                        {paginationContent}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full bg-background dark:bg-dark-background">
                    <div>
                        <div className="space-y-6">
                            {pageHeaderContent}
                            {statsContent}
                        </div>
                         <hr className="border-border dark:border-dark-border my-6"/>
                        <div>{toolbarContent}</div>
                    </div>

                    <div className="flex-1 overflow-y-auto mt-4">
                         {viewMode === 'list' ? (
                            <div className="bg-white dark:bg-dark-surface rounded-xl">
                                <OrdersTable 
                                    orders={paginatedOrders}
                                    selectedIds={selectedIds}
                                    onSelectAll={handleSelectAll}
                                    onSelectRow={handleSelectRow}
                                    columns={columns}
                                    onViewOrder={onViewOrder}
                                />
                            </div>
                        ) : (
                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                               {paginatedOrders.map(order => (
                                   <OrderCard 
                                        key={order.id}
                                        order={order}
                                        isSelected={selectedIds.includes(order.id)}
                                        onSelect={() => handleSelectRow(order.id)}
                                        onViewOrder={onViewOrder}
                                   />
                               ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4 py-3 px-1 mt-4">
                        {paginationContent}
                    </div>
                </div>
            )}

            {!isMobileOrTablet && isManageColumnsOpen && (
                <ManageColumnsModal
                    isOpen={isManageColumnsOpen}
                    onClose={() => setIsManageColumnsOpen(false)}
                    columns={columns}
                    setColumns={setColumns}
                    anchorEl={manageColsButtonRef.current}
                />
            )}
            {selectedIds.length > 0 && (
                <BulkActionToolbar 
                    count={selectedIds.length}
                    onClear={() => setSelectedIds([])}
                />
            )}
        </FadeIn>
    );
};

export default OrdersPage;
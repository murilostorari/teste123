import React from 'react';

// --- ICONS ---
const NewDashboardIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6.5C3 5.09554 3 4.39331 3.33706 3.88886C3.48298 3.67048 3.67048 3.48298 3.88886 3.33706C4.39331 3 5.09554 3 6.5 3C7.90446 3 8.60669 3 9.11114 3.33706C9.32952 3.48298 9.51702 3.67048 9.66294 3.88886C10 4.39331 10 5.09554 10 6.5C10 7.90446 10 8.60669 9.66294 9.11114C9.51702 9.32952 9.32952 9.51702 9.11114 9.66294C8.60669 10 7.90446 10 6.5 10C5.09554 10 4.39331 10 3.88886 9.66294C3.67048 9.51702 3.48298 9.32952 3.33706 9.11114C3 8.60669 3 7.90446 3 6.5Z" stroke="currentColor" strokeWidth="2"></path>
        <path d="M14 6.5C14 5.09554 14 4.39331 14.3371 3.88886C14.483 3.67048 14.6705 3.48298 14.8889 3.33706C15.3933 3 16.0955 3 17.5 3C18.9045 3 19.6067 3 20.1111 3.33706C20.3295 3.48298 20.517 3.67048 20.6629 3.88886C21 4.39331 21 5.09554 21 6.5C21 7.90446 21 8.60669 20.6629 9.11114C20.517 9.32952 20.3295 9.51702 20.1111 9.66294C19.6067 10 18.9045 10 17.5 10C16.0955 10 15.3933 10 14.8889 9.66294C14.6705 9.51702 14.483 9.32952 14.3371 9.11114C14 8.60669 14 7.90446 14 6.5Z" stroke="currentColor" strokeWidth="2"></path>
        <path d="M14 17.5C14 16.0955 14 15.3933 14.3371 14.8889C14.483 14.6705 14.6705 14.483 14.8889 14.3371C15.3933 14 16.0955 14 17.5 14C18.9045 14 19.6067 14 20.1111 14.3371C20.3295 14.483 20.517 14.6705 20.6629 14.8889C21 15.3933 21 16.0955 21 17.5C21 18.9045 21 19.6067 20.6629 20.1111C20.517 20.3295 20.3295 20.517 20.1111 20.6629C19.6067 21 18.9045 21 17.5 21C16.0955 21 15.3933 21 14.8889 20.6629C14.6705 20.517 14.483 20.3295 14.3371 20.1111C14 19.6067 14 18.9045 14 17.5Z" stroke="currentColor" strokeWidth="2"></path>
        <path d="M3 17.5C3 16.0955 3 15.3933 3.33706 14.8889C3.48298 14.6705 3.67048 14.483 3.88886 14.3371C4.39331 14 5.09554 14 6.5 14C7.90446 14 8.60669 14 9.11114 14.3371C9.32952 14.483 9.51702 14.6705 9.66294 14.8889C10 15.3933 10 16.0955 10 17.5C10 18.9045 10 19.6067 9.66294 20.1111C9.51702 20.3295 9.32952 20.517 9.11114 20.6629C8.60669 21 7.90446 21 6.5 21C5.09554 21 4.39331 21 3.88886 20.6629C3.67048 20.517 3.48298 20.3295 3.33706 20.1111C3 19.6067 3 18.9045 3 17.5Z" stroke="currentColor" strokeWidth="2"></path>
    </svg>
);

const ProductsIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7.9966C3.83599 7.99236 3.7169 7.98287 3.60982 7.96157C2.81644 7.80376 2.19624 7.18356 2.03843 6.39018C2 6.19698 2 5.96466 2 5.5C2 5.03534 2 4.80302 2.03843 4.60982C2.19624 3.81644 2.81644 3.19624 3.60982 3.03843C3.80302 3 4.03534 3 4.5 3H19.5C19.9647 3 20.197 3 20.3902 3.03843C21.1836 3.19624 21.8038 3.81644 21.9616 4.60982C22 4.80302 22 5.03534 22 5.5C22 5.96466 22 6.19698 21.9616 6.39018C21.8038 7.18356 21.1836 7.80376 20.3902 7.96157C20.2831 7.98287 20.164 7.99236 20 7.9966M10 13H14M4 8H20V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const OrdersIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 10.5854H18M12 14.5854H18M12 18.5854H18M6.00194 10.5864L7.03069 11.6152L9.02875 9.61712M5.99806 14.5874L7.02881 15.6181L9.03075 13.6162M5.99806 18.5874L7.02881 19.6181L9.03075 17.6162M21 7.08544V18.5854C21 20.4711 21 21.4139 20.4142 21.9997C19.8284 22.5854 18.8856 22.5854 17 22.5854H7C5.11438 22.5854 4.17157 22.5854 3.58579 21.9997C3 21.4139 3 20.4711 3 18.5854V7.08544C3 6.62079 3 6.38846 3.03843 6.19526C3.19624 5.40188 3.81644 4.78168 4.60982 4.62387C4.80302 4.58544 5.03534 4.58544 5.5 4.58544H7.0367C7.56872 4.58544 8 5.01672 8 5.54874C8 6.08076 8.43128 6.51204 8.9633 6.51204H15.0367C15.5687 6.51204 16 6.08076 16 5.54874C16 5.01672 16.4313 4.58544 16.9633 4.58544H18.5C18.9647 4.58544 19.197 4.58544 19.3902 4.62387C20.1836 4.78168 20.8038 5.40188 20.9616 6.19526C21 6.38846 21 6.62079 21 7.08544ZM8 4.82436V5.02899C8 5.548 8 5.80751 8.09399 6.0087C8.19329 6.22126 8.36418 6.39215 8.57674 6.49145C8.77794 6.58544 9.03744 6.58544 9.55645 6.58544H14.4435C14.9626 6.58544 15.2221 6.58544 15.4233 6.49145C15.6358 6.39214 15.8067 6.22127 15.906 6.0087C16 5.80751 16 5.548 16 5.02898V4.75192C16 4.49221 16 4.36235 15.976 4.25483C15.8916 3.87642 15.5961 3.5809 15.2177 3.4965C15.1102 3.47252 14.9803 3.47252 14.7206 3.47252C14.5865 3.47252 14.5195 3.47252 14.4821 3.46971C14.2336 3.45106 14.3351 3.47894 14.1119 3.36799C14.0783 3.35131 13.8765 3.2314 13.473 2.99157C12.7157 2.54153 11.4226 2.35158 10.4695 3.02816C10.196 3.22233 10.0592 3.31942 10.0118 3.3459C9.84183 3.44066 9.82646 3.44556 9.63305 3.46665C9.57902 3.47254 9.50329 3.47254 9.35184 3.47253C9.02459 3.47253 8.86096 3.47253 8.72719 3.51046C8.39344 3.6051 8.13258 3.86596 8.03794 4.19971C8 4.33348 8 4.49711 8 4.82436Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

const CustomersIcon = ({ className }: { className?: string }) => <i className={`ri-group-line text-xl ${className}`}></i>;

const POSIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
        <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/>
        <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>
    </svg>
);


const CollapseIcon = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0">
        <path d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V15C21 17.8284 21 19.2426 20.1213 20.1213C19.2426 21 17.8284 21 15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15V9Z" stroke="currentColor" strokeWidth="2" />
        <path d="M13.389 9L10 12.389L13.389 15.7781" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transformOrigin: 'center center', transition: 'transform 0.3s ease-in-out' }}
            transform={isCollapsed ? 'rotate(180)' : ''}
        />
    </svg>
);

const CerumLogoIcon: React.FC = () => (
    <div className="w-10 h-10 bg-heading dark:bg-white rounded-md flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0001 3.33301L22.6667 7.99967V17.333L16.0001 21.9997L9.33341 17.333V7.99967L16.0001 3.33301Z" className="fill-white dark:fill-black" />
            <path d="M16 28.667L9.33333 24.0003L2.66667 28.667L9.33333 3.33366e-05L16 4.66699L22.6667 -0.000244141L29.3333 4.66699L22.6667 24.0003L16 28.667Z" fill="url(#paint0_linear_1_2_sidebar)" />
            <defs><linearGradient id="paint0_linear_1_2_sidebar" x1="16" y1="-0.000244141" x2="16" y2="28.667" gradientUnits="userSpaceOnUse"><stop stopColor="#3B8289" stopOpacity="0.75" /><stop offset="1" stopColor="#3B8289" stopOpacity="0" /></linearGradient></defs>
        </svg>
    </div>
);

const navItems = [
    { id: 'dashboard', label: 'Painel', icon: NewDashboardIcon, page: 'overview' },
    { id: 'products', label: 'Produtos', icon: ProductsIcon, page: 'products' },
    { id: 'orders', label: 'Pedidos', icon: OrdersIcon, page: 'orders' },
    { id: 'customers', label: 'Clientes', icon: CustomersIcon, page: 'audience' },
    { id: 'pos', label: 'PDV', icon: POSIcon, page: 'pos' }
];

interface SidebarProps {
    activePage: string;
    onNavigate: (page: string) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
    isMobileOpen: boolean;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, isCollapsed, setIsCollapsed, isMobileOpen }) => {

    const isPageActive = (itemPage: string) => {
        if (itemPage === 'products' && (activePage.startsWith('products') || activePage.startsWith('product-'))) {
            return true;
        }
        return itemPage === activePage;
    }

    return (
        <aside className={`
            bg-white dark:bg-dark-surface text-text-body dark:text-dark-text-body 
            flex-shrink-0 flex flex-col 
            transition-all duration-300 ease-in-out 
            border-r border-border dark:border-dark-border z-50
            fixed lg:relative inset-y-0 left-0
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            ${isCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72
        `}>
            <div className={`flex items-center px-4 h-20 border-b border-border dark:border-dark-border ${isCollapsed ? 'lg:justify-center' : 'justify-between'}`}>
                <div className={`flex items-center gap-3 transition-opacity duration-200 ${isCollapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
                    <CerumLogoIcon />
                </div>
            </div>

            <nav className="flex-1 space-y-2 p-4">
                {navItems.map(item => {
                    const isActive = isPageActive(item.page);
                    return (
                        <div
                            key={item.id}
                            className="relative"
                        >
                            <button
                                onClick={() => onNavigate(item.page)}
                                className={`
                                    group w-full flex items-center h-12 rounded-lg cursor-pointer transition-all duration-200
                                    ${isActive
                                        ? 'bg-gray-100 dark:bg-dark-active-bg text-heading dark:text-dark-text-heading font-bold'
                                        : 'text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-hover-bg'
                                    }`
                                }
                            >
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <span className={`ml-16 whitespace-nowrap transition-all duration-200 ${isCollapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
                                    {item.label}
                                </span>
                                {isCollapsed && !isMobileOpen && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-auto p-2 px-3 min-w-max rounded-md shadow-lg bg-heading dark:bg-gray-200 text-white dark:text-heading text-sm font-medium transition-all duration-200 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 z-50 pointer-events-none">
                                        {item.label}
                                    </div>
                                )}
                            </button>
                        </div>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="border-t border-border dark:border-dark-border pt-4">
                    <div className="relative hidden lg:block">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`group w-full flex items-center h-12 rounded-lg cursor-pointer transition-all duration-200 text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-hover-bg`}
                        >
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                <CollapseIcon isCollapsed={isCollapsed} />
                            </div>
                            <span className={`ml-16 whitespace-nowrap text-left transition-all duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                                Recolher
                            </span>
                            {isCollapsed && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-auto p-2 px-3 min-w-max rounded-md shadow-lg bg-heading dark:bg-gray-200 text-white dark:text-heading text-sm font-medium transition-all duration-200 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 z-50 pointer-events-none">
                                    Expandir
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
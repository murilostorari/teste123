import React, { useState, useRef, useEffect } from 'react';

// --- NEW STORE SELECTOR COMPONENTS ---

const stores = [
    { id: 'fikri', name: 'Malik G. Ade', avatar: 'https://i.pravatar.cc/40?u=malik' },
    { id: 'urban', name: 'Urban Deals', avatar: null },
    { id: 'metro', name: 'MetroShop', avatar: null }
];

const StoreAvatar: React.FC<{ name: string, avatarUrl?: string | null }> = ({ name, avatarUrl }) => {
    if (avatarUrl) {
        return <img src={avatarUrl} alt={name} className="w-9 h-9 rounded-full object-cover" />;
    }
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
    return (
        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
            {initials}
        </div>
    );
};

const StoreSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStore, setCurrentStore] = useState(stores[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectStore = (store: typeof stores[0]) => {
        setCurrentStore(store);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-active-bg transition-colors"
            >
                <StoreAvatar name={currentStore.name} avatarUrl={currentStore.avatar} />
                <span className="font-semibold text-lg text-heading dark:text-dark-text-heading">{currentStore.name}</span>
                <i className={`ri-arrow-down-s-line text-xl text-text-body dark:text-dark-text-body transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-border dark:border-dark-border z-40 animate-fade-in" style={{ animationDuration: '150ms' }}>
                    <div className="p-2">
                        <p className="px-2 py-1 text-xs font-semibold text-text-body dark:text-dark-text-body uppercase">Stores</p>
                        {stores.map(store => (
                            <button 
                                key={store.id}
                                onClick={() => handleSelectStore(store)}
                                className={`w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-hover-bg ${currentStore.id === store.id ? 'bg-gray-100 dark:bg-dark-hover-bg' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <StoreAvatar name={store.name} avatarUrl={store.avatar} />
                                    <span className="font-medium text-heading dark:text-dark-text-heading">{store.name}</span>
                                </div>
                                {currentStore.id === store.id && <i className="ri-check-line text-primary text-xl"></i>}
                            </button>
                        ))}
                        <div className="my-1 border-t border-border dark:border-dark-border"></div>
                        <button className="w-full flex items-center gap-3 text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-hover-bg text-heading dark:text-dark-text-heading">
                            <div className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 dark:border-dark-border flex items-center justify-center">
                                <i className="ri-add-line text-text-body dark:text-dark-text-body"></i>
                            </div>
                            <span>Add New Store</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


interface DashboardHeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    onToggleMobileSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ isDarkMode, toggleDarkMode, onToggleMobileSidebar }) => {

  return (
    <header className="bg-white dark:bg-dark-surface border-b border-border dark:border-dark-border sticky top-0 z-30 h-20 flex-shrink-0">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Left side: Hamburger + Title */}
        <div className="flex items-center gap-2 text-heading dark:text-dark-text-heading">
            <button onClick={onToggleMobileSidebar} className="lg:hidden mr-2 text-2xl -ml-2 p-2">
                <i className="ri-menu-line"></i>
            </button>
            <StoreSelector />
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8 hidden md:block">
          <div className="relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-text-body"></i>
            <input 
              type="text" 
              placeholder="Pesquisar ou Pressione '/' para comandos" 
              className="w-full bg-gray-50 dark:bg-dark-active-bg border border-gray-200 dark:border-dark-border rounded-lg h-11 pl-11 pr-4 text-sm text-text-body dark:text-dark-text-body placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-dark-active-bg rounded-lg text-text-body dark:text-dark-text-body hover:bg-gray-200 dark:hover:bg-dark-subtle transition-colors">
                <i className={`${isDarkMode ? 'ri-sun-line' : 'ri-moon-line'} text-xl`}></i>
            </button>
            <button className="relative w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-dark-active-bg rounded-lg text-text-body dark:text-dark-text-body hover:bg-gray-200 dark:hover:bg-dark-subtle transition-colors">
                <i className="ri-notification-3-line text-xl"></i>
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm cursor-pointer ring-2 ring-white dark:ring-dark-surface">
                FIK
            </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
import React, { useState } from 'react';
import LocationModal from './LocationModal';

// --- ICONS ---
const ShoppingBagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9996 8C15.9996 9.06087 15.5782 10.0783 14.828 10.8284C14.0779 11.5786 13.0605 12 11.9996 12C10.9387 12 9.92131 11.5786 9.17116 10.8284C8.42102 10.0783 7.99959 9.06087 7.99959 8M3.63281 7.40138L2.93281 15.8014C2.78243 17.6059 2.70724 18.5082 3.01227 19.2042C3.28027 19.8157 3.74462 20.3204 4.33177 20.6382C5.00006 21 5.90545 21 7.71623 21H16.283C18.0937 21 18.9991 21 19.6674 20.6382C20.2546 20.3204 20.7189 19.8157 20.9869 19.2042C21.2919 18.5082 21.2167 17.6059 21.0664 15.8014L20.3664 7.40138C20.237 5.84875 20.1723 5.07243 19.8285 4.48486C19.5257 3.96744 19.0748 3.5526 18.5341 3.29385C17.92 3 17.141 3 15.583 3L8.41623 3C6.85821 3 6.07921 3 5.4651 3.29384C4.92433 3.5526 4.47349 3.96744 4.17071 4.48486C3.82689 5.07243 3.76219 5.84875 3.63281 7.40138Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"></path>
        <path d="M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z" stroke="currentColor" strokeWidth="2"></path>
    </svg>
);
const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.12695 13.218L12.026 21L20.2707 12.8774" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12.0039 4.68819C14.2887 2.43727 18.0014 2.43727 20.2862 4.68819C22.571 6.94652 22.571 10.5969 20.2937 12.8552" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M11.9959 4.68819C9.71112 2.43727 5.99836 2.43727 3.71358 4.68819C1.42881 6.93912 1.42881 10.5969 3.71358 12.8478M3.71358 12.8478L3.73297 12.8668M3.71358 12.8478L4.11943 13.2106" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 18.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
        <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2"></path>
    </svg>
);


interface NavigationProps {
    // FIX: Allow 'productDetail' as a valid view to match the application's states.
    activeView: 'home' | 'shop' | 'productDetail';
    onNavigateToDashboard: () => void;
    onNavigateToShop: () => void;
    onNavigateToHome: () => void;
}

const Header: React.FC<NavigationProps> = (props) => (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
        <MainHeader {...props} />
    </header>
);

const MainHeader: React.FC<NavigationProps> = ({ onNavigateToDashboard, onNavigateToHome }) => {
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [location, setLocation] = useState('São Paulo, SP');

    const handleLocationSelect = (newLocation: string) => {
        setLocation(newLocation);
    };
    
    return (
    <>
        <div className="bg-primary">
            <div className="container mx-auto px-4 py-4 md:h-20 md:py-0 flex flex-wrap justify-between items-center md:flex-nowrap gap-y-4">
                <button onClick={onNavigateToHome} className="flex items-center gap-2">
                    <div className="w-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center">
                        <i className="ri-shopping-basket-fill text-2xl sm:text-3xl text-heading"></i>
                    </div>
                    <span className="text-xl sm:text-3xl font-bold text-white">Grocery.</span>
                </button>
                
                <div className="flex items-center gap-2 sm:gap-4 text-white md:order-3">
                    <a href="#" className="hover:text-secondary transition-colors duration-300"><HeartIcon className="w-6 h-6"/></a>
                    <a href="#" className="hover:text-secondary transition-colors duration-300"><ShoppingBagIcon className="w-6 h-6"/></a>
                    <button onClick={onNavigateToDashboard} className="hover:text-secondary transition-colors duration-300">
                        <UserIcon className="w-6 h-6"/>
                    </button>
                </div>
                
                <div className="w-full md:flex-1 md:max-w-2xl md:mx-2 lg:mx-8 md:order-2">
                    <div className="flex items-center w-full bg-search-bg rounded-full h-12 px-4">
                        <button onClick={() => setIsLocationModalOpen(true)} className="flex items-center cursor-pointer group flex-shrink-0">
                            <i className="ri-map-pin-line text-white text-xl"></i>
                            <span className="hidden sm:inline text-white font-normal text-sm ml-2 group-hover:text-secondary transition-colors truncate max-w-[120px]">{location}</span>
                            <i className="hidden sm:inline ri-arrow-down-s-line text-white ml-1"></i>
                        </button>
                        <div className="h-6 w-px bg-white/30 mx-3 flex-shrink-0"></div>
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            className="flex-1 bg-transparent focus:outline-none text-white placeholder:text-white/70 text-sm sm:text-base min-w-0"
                        />
                        <button className="pl-2 text-white/90 hover:text-white transition-colors">
                            <SearchIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {isLocationModalOpen && <LocationModal onClose={() => setIsLocationModalOpen(false)} onLocationSelect={handleLocationSelect} />}
    </>
    );
};

export default Header;
import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import { IconProps } from './icons/IconProps';
import { ProductData } from '../types';

// --- ICONS ---
const XIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const CheckIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>;
const FilterIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11C8.65685 11 10 12.3431 10 14C10 15.6569 8.65685 17 7 17C5.34315 17 4 15.6569 4 14C4 12.3431 5.34315 11 7 11Z" stroke="currentColor" strokeWidth="2"></path>
        <path d="M17 13C15.3431 13 14 11.6569 14 10C14 8.34315 15.3431 7 17 7C18.6569 7 20 8.34315 20 10C20 11.6569 18.6569 13 17 13Z" stroke="currentColor" strokeWidth="2"></path>
        <path d="M7 21L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
        <path d="M17 3L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
        <path d="M7 8L7 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
        <path d="M17 16L17 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
    </svg>
);
const SortIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 4V20M17 20L13 16M17 20L21 16M7 20V4M7 4L3 8M7 4L11 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);


// --- ANIMATION & CAROUSEL (from HomePage) ---
const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (domRef.current) {
                        observer.unobserve(domRef.current);
                    }
                }
            });
        }, { threshold: 0.1 });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {children}
        </div>
    );
};

const Carousel: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    return (
        <div ref={scrollRef} className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide ${className}`}>
            {children}
        </div>
    );
};

const categories = [
    { name: 'Vegetais', items: 52, img: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Frutas Frescas', items: 48, img: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Leite e Ovos', items: 12, img: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Padaria', items: 62, img: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Domésticos', items: 25, img: 'https://images.pexels.com/photos/4203063/pexels-photo-4203063.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Frutas Secas', items: 8, img: 'https://images.pexels.com/photos/4047230/pexels-photo-4047230.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Bebidas', items: 20, img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const CategoryCard = ({ name, img }: { name: string, img: string }) => (
    <div className="text-center group cursor-pointer w-28 sm:w-32">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-background rounded-full mx-auto flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 transform group-hover:scale-105">
            <img src={img} alt={name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full"/>
        </div>
        <h3 className="font-semibold text-heading mt-3 text-sm sm:text-base">{name}</h3>
    </div>
);


// --- CUSTOM CHECKBOX FROM DASHBOARD ---
const CustomDashboardCheckbox: React.FC<{checked?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, isRadio?: boolean}> = ({ checked, onChange, isRadio }) => (
    <div className={`relative flex items-center justify-center w-5 h-5`}>
        <input 
            type="checkbox" 
            className={`peer appearance-none h-5 w-5 border ${isRadio ? 'rounded-full' : 'rounded-md'} border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200`}
            checked={checked}
            onChange={onChange}
        />
        {!isRadio && <CheckIcon className="absolute w-4 h-4 text-white hidden peer-checked:block pointer-events-none" />}
        {isRadio && <div className="absolute w-2.5 h-2.5 bg-white rounded-full hidden peer-checked:block pointer-events-none" />}
    </div>
);


const shopProducts: ProductData[] = [
    { id: 1, discount: 25, imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Laranjas Frescas', price: 11.75, compareAtPrice: 15.00, stockStatus: '5.0', seller: { name: 'Pomar do Sol', avatarUrl: 'https://i.pravatar.cc/32?u=seller3' }, distance: 5.1 },
    { id: 2, discount: 25, imageUrl: 'https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Vegetais', name: 'Tomate Fresco', price: 9.00, compareAtPrice: 12.00, stockStatus: '5.0', seller: { name: 'Horta Orgânica', avatarUrl: 'https://i.pravatar.cc/32?u=seller2' }, distance: 0.8 },
    { id: 3, discount: 25, imageUrl: 'https://images.pexels.com/photos/2280927/pexels-photo-2280927.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Romã', price: 9.00, compareAtPrice: 12.00, stockStatus: '5.0', seller: { name: 'Frutas Tropicais', avatarUrl: 'https://i.pravatar.cc/32?u=seller4' }, distance: 12.7 },
    { id: 4, discount: 25, imageUrl: 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Banana', price: 15.00, compareAtPrice: 20.00, stockStatus: '5.0', seller: { name: 'Fazenda Feliz', avatarUrl: 'https://i.pravatar.cc/32?u=seller1' }, distance: 2.5 },
    { id: 5, discount: 25, imageUrl: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Doces e Salgados', name: 'Caixa de chocolate', price: 24.00, compareAtPrice: 32.00, stockStatus: '5.0', seller: { name: 'Doceria da Vovó', avatarUrl: 'https://i.pravatar.cc/32?u=seller6' }, distance: 0.8 },
    { id: 6, discount: 25, imageUrl: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Vegetais', name: 'Repolho Fresco', price: 7.50, compareAtPrice: 10.00, stockStatus: '5.0', seller: { name: 'Horta Orgânica', avatarUrl: 'https://i.pravatar.cc/32?u=seller2' }, distance: 0.8 },
    { id: 7, discount: 25, imageUrl: 'https://images.pexels.com/photos/5945763/pexels-photo-5945763.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Abacaxi', price: 15.00, compareAtPrice: 20.00, stockStatus: '5.0', seller: { name: 'Frutas Tropicais', avatarUrl: 'https://i.pravatar.cc/32?u=seller4' }, distance: 12.7 },
    { id: 8, discount: 25, imageUrl: 'https://images.pexels.com/photos/262889/pexels-photo-262889.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Café da Manhã', name: 'Geleia de Frutas Essencial', price: 7.50, compareAtPrice: 10.00, stockStatus: '5.0', seller: { name: 'Pão de Ouro', avatarUrl: 'https://i.pravatar.cc/32?u=seller7' }, distance: 1.1 },
    { id: 9, discount: 20, imageUrl: 'https://images.pexels.com/photos/86733/pexels-photo-86733.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Maçã Verde Fresca', price: 12.00, compareAtPrice: 15.00, stockStatus: '5.0', seller: { name: 'Fazenda Feliz', avatarUrl: 'https://i.pravatar.cc/32?u=seller1' }, distance: 2.5 },
    { id: 10, discount: 20, imageUrl: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Vegetais', name: 'Pimentão Verde', price: 8.00, compareAtPrice: 10.00, stockStatus: '5.0', seller: { name: 'Horta Orgânica', avatarUrl: 'https://i.pravatar.cc/32?u=seller2' }, distance: 0.8 },
    { id: 11, discount: 20, imageUrl: 'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Vegetais', name: 'Cebola Roxa', price: 8.00, compareAtPrice: 10.00, stockStatus: '5.0', seller: { name: 'Horta Orgânica', avatarUrl: 'https://i.pravatar.cc/32?u=seller2' }, distance: 0.8 },
    { id: 12, discount: 10, imageUrl: 'https://images.pexels.com/photos/50632/pexels-photo-50632.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Sorvetes', name: 'Sorvete de Noz', price: 18.00, compareAtPrice: 20.00, stockStatus: '5.0', seller: { name: 'Doceria da Vovó', avatarUrl: 'https://i.pravatar.cc/32?u=seller6' }, distance: 0.8 },
];

interface NavigationProps {
    activeView: 'home' | 'shop' | 'productDetail';
    onNavigateToDashboard: () => void;
    onNavigateToShop: () => void;
    onNavigateToHome: () => void;
    onProductClick: (product: ProductData) => void;
}

const FeaturedCategories = () => (
    <section className="bg-white relative">
        <div className="container mx-auto px-4 py-8">
            <FadeIn>
                <Carousel>
                    {categories.map((cat, index) => (
                        <div key={index} className="snap-center shrink-0 w-auto">
                            <CategoryCard {...cat} />
                        </div>
                    ))}
                </Carousel>
            </FadeIn>
        </div>
    </section>
);

const ShopPage: React.FC<NavigationProps> = (props) => {
    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);

    const handleToggleFilters = () => {
        if (window.innerWidth < 768) {
            setIsFilterModalOpen(true);
        } else {
            setIsFilterSidebarVisible(!isFilterSidebarVisible);
        }
    };
    
    return (
        <div className="font-sans bg-white text-heading">
            <Header {...props} />
            <main>
                <Breadcrumb />
                <FeaturedCategories />
                <div className="container mx-auto px-4 py-12 flex items-start">
                    <FilterSidebar isVisible={isFilterSidebarVisible} />
                    <div className="flex-1 min-w-0 transition-all duration-500 ease-in-out">
                        <ProductGrid 
                            onToggleFilters={handleToggleFilters}
                            isFilterViewOpen={isFilterSidebarVisible}
                            onOpenSortModal={() => setIsSortModalOpen(true)}
                            onProductClick={props.onProductClick}
                        />
                    </div>
                </div>
                {isFilterModalOpen && <FilterModal onClose={() => setIsFilterModalOpen(false)} />}
                {isSortModalOpen && <SortModal onClose={() => setIsSortModalOpen(false)} />}
                <FeaturesBar />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
};

const Breadcrumb = () => (
    <div className="py-10 bg-cover bg-center" style={{backgroundImage: "url('https://i.ibb.co/bgq9Zm15/image-Photoroom-1.png')"}}>
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-heading">Loja</h1>
            <p className="text-text-body mt-2">Início / Loja</p>
        </div>
    </div>
);


const FilterSidebar: React.FC<{isVisible: boolean}> = ({ isVisible }) => (
    <aside className={`
        hidden md:block
        shrink-0
        transition-all duration-500 ease-in-out
        overflow-hidden
        ${isVisible ? 'w-64 mr-8' : 'w-0 mr-0'}
    `}>
        <div className={`w-64 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <FilterContent />
        </div>
    </aside>
);

const FilterContent = () => (
    <div className="space-y-1">
        <FilterSection title="Categoria" collapsible defaultOpen={false}>
            <ul className="space-y-3 pt-4">
                {['Frutas Frescas', 'Vegetais', 'Padaria', 'Domésticos', 'Frutas Secas'].map(category => (
                    <li key={category}>
                         <label className="flex items-center gap-3 cursor-pointer group">
                            <CustomDashboardCheckbox />
                            <span className="group-hover:text-primary text-gray-800">{category}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </FilterSection>
        <FilterSection title="Marca" collapsible defaultOpen={false}>
             <div className="space-y-3 pt-4">
                {['Brightwest', "Nature's Best", 'EcoFarm', 'FarmFresh', 'Green Grower'].map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                       <CustomDashboardCheckbox />
                       <span className="group-hover:text-primary text-gray-800">{brand}</span>
                    </label>
                ))}
            </div>
        </FilterSection>
        <FilterSection title="Preço" collapsible={false}>
            <div className="pt-4">
                <PriceRangeSlider min={0} max={500} />
            </div>
        </FilterSection>
        <FilterSection title="Avaliação" collapsible={false}>
            <div className="space-y-3 pt-4">
                {[5, 4, 3, 2, 1].map(star => (
                    <label key={star} className="flex items-center gap-3 cursor-pointer">
                        <CustomDashboardCheckbox />
                        <div className="flex text-secondary text-lg">
                            {Array(5).fill(0).map((_, i) => <i key={i} className={`ri-star-s-${i < star ? 'fill' : 'line'}`}></i>)}
                        </div>
                    </label>
                ))}
            </div>
        </FilterSection>
        <FilterSection title="Apenas em estoque" collapsible={false}>
            <div className="pt-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
        </FilterSection>
    </div>
);


const FilterSection: React.FC<{title: string, children: React.ReactNode, defaultOpen?: boolean, collapsible?: boolean}> = ({ title, children, defaultOpen = false, collapsible = true }) => {
    const [isOpen, setIsOpen] = useState(collapsible ? defaultOpen : true);

    if (!collapsible) {
        return (
            <div className="border-b border-border py-4">
                <h3 className="font-bold text-heading mb-2">{title}</h3>
                {children}
            </div>
        );
    }

    return (
        <div className="border-b border-border py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full">
                <h3 className="font-bold text-heading">{title}</h3>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-heading text-white' : 'bg-gray-100 text-heading'}`}>
                   <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};


interface ProductGridProps {
    onToggleFilters: () => void;
    isFilterViewOpen: boolean;
    onOpenSortModal: () => void;
    onProductClick: (product: ProductData) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onToggleFilters, isFilterViewOpen, onOpenSortModal, onProductClick }) => {
    const [activeFilters, setActiveFilters] = useState(['Preço : R$25,00 - R$125,00', '5 Estrelas', 'Em Estoque']);

    const clearFilters = () => setActiveFilters([]);
    const removeFilter = (filterToRemove: string) => {
        setActiveFilters(activeFilters.filter(f => f !== filterToRemove));
    };
    
    const activeFilterCount = activeFilters.length;

    return (
        <div className="flex-1 min-w-0">
            {/* --- MOBILE HEADER --- */}
            <div className="flex md:hidden items-center gap-4 mb-6">
                <button 
                    onClick={onToggleFilters}
                    className="relative flex-1 flex items-center justify-center gap-2 border border-border rounded-full px-4 h-12 text-sm font-medium bg-white text-heading"
                >
                    <FilterIcon className="w-5 h-5" />
                    <span>Filtros</span>
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
                <button 
                    onClick={onOpenSortModal}
                    className="flex-1 flex items-center justify-center gap-2 border border-border rounded-full px-4 h-12 text-sm font-medium bg-white text-heading"
                >
                    <SortIcon className="w-5 h-5" />
                    <span>Ordenar por</span>
                </button>
            </div>

            {/* --- DESKTOP HEADER --- */}
            <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-border gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <button 
                        onClick={onToggleFilters}
                        className={`flex items-center gap-2 border rounded-full px-4 h-10 text-sm font-medium transition-colors duration-300
                            ${isFilterViewOpen 
                                ? 'bg-primary text-white border-primary' 
                                : 'bg-white text-heading border-border hover:bg-gray-50'
                            }`}
                    >
                        <FilterIcon className="w-5 h-5" />
                        <span>{isFilterViewOpen ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
                    </button>
                    {activeFilters.length > 0 && (
                        <>
                            <div className="flex flex-wrap items-center gap-2">
                                {activeFilters.map(filter => 
                                    <FilterTag key={filter} label={filter} onRemove={() => removeFilter(filter)} />
                                )}
                            </div>
                            <button onClick={clearFilters} className="text-sm text-primary hover:underline underline-offset-2">Limpar Tudo</button>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                    <CustomSortDropdown />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* FIX: Pass the 'rating' prop to ProductCard, converting 'stockStatus' to a number. */}
                {shopProducts.map(p => <ProductCard key={p.id} {...p} rating={Number(p.stockStatus)} onClick={() => onProductClick(p)} />)}
            </div>

            <Pagination />
        </div>
    );
};


const CustomSortDropdown: React.FC = () => {
    const options = ['Padrão', 'Preço: Menor para o Maior', 'Preço: Maior para o Menor', 'Mais Recentes'];
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSelect = (option: string) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="relative text-sm" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="border border-border rounded-full px-4 h-10 focus:outline-none focus:ring-1 focus:ring-primary appearance-none bg-white text-left flex items-center gap-2"
            >
                <SortIcon className="w-5 h-5 text-heading" />
                <span className="text-heading font-medium">{selected}</span>
                <i className={`ri-arrow-down-s-line text-heading transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>

            <div
                className={`absolute z-10 w-full mt-2 origin-top transition-all duration-200 ease-out transform ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                <div className="bg-white rounded-lg shadow-lg border border-border max-h-60 overflow-auto">
                    <ul className="p-1.5">
                        {options.map(option => (
                            <li key={option} className="p-0">
                                <button
                                    onClick={() => handleSelect(option)}
                                    className="w-full text-left px-3 py-1.5 rounded-md text-sm font-medium text-heading dark:text-dark-text-heading hover:bg-gray-50 dark:hover:bg-dark-subtle cursor-pointer transition-colors duration-200"
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const FilterTag: React.FC<{label: string, onRemove: () => void}> = ({ label, onRemove }) => (
    <div className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 h-10 rounded-full">
        <span>{label}</span>
        <button onClick={onRemove} className="text-white/70 hover:text-white">
            <XIcon className="w-4 h-4" />
        </button>
    </div>
);

const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-12">
        <button className="w-10 h-10 flex items-center justify-center rounded border border-border text-text-body hover:bg-primary hover:text-white transition-colors">
            <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
        {[1, 2, 3, '...', 10].map((page, index) => (
             <button key={index} className={`w-10 h-10 flex items-center justify-center rounded border transition-colors ${page === 1 ? 'bg-primary text-white border-primary' : 'border-border text-text-body hover:bg-primary hover:text-white'}`}>
                {page}
             </button>
        ))}
        <button className="w-10 h-10 flex items-center justify-center rounded border border-border text-text-body hover:bg-primary hover:text-white transition-colors">
            <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
    </div>
);

const FeaturesBar = () => {
    const features = [
        { icon: 'ri-truck-line', title: 'Frete Grátis', desc: 'Frete grátis para pedidos acima de R$50' },
        { icon: 'ri-wallet-3-line', title: 'Pagamento Flexível', desc: 'Múltiplas opções de pagamento seguro' },
        { icon: 'ri-customer-service-2-line', title: 'Suporte 24/7', desc: 'Oferecemos suporte online todos os dias.' },
    ];
    return (
        <section className="py-12 md:py-20 border-y border-border">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map(f => (
                        <div key={f.title} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-3xl text-heading flex-shrink-0">
                                <i className={f.icon}></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-heading">{f.title}</h3>
                                <p className="text-text-body">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const Newsletter = () => (
    <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-heading">Inscreva-se na Nossa Newsletter para Receber <br/> <span className="text-primary">Atualizações sobre Nossas Últimas Ofertas</span></h2>
            <p className="text-text-body mt-4 mb-8">Ganhe 25% de desconto no seu primeiro pedido apenas se inscrevendo em nossa newsletter</p>
            <div className="max-w-lg mx-auto relative">
                <input type="email" placeholder="Digite o Endereço de Email" className="w-full border border-border rounded-full py-4 pl-6 pr-40 h-16 focus:outline-none focus:ring-1 focus:ring-primary" />
                <button className="absolute right-2 top-2 bottom-2 bg-secondary text-heading font-bold px-8 rounded-full hover:brightness-110 transition-all duration-300">Inscrever-se</button>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-primary text-white pt-12 md:pt-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-16">
                 <div className="lg:col-span-2">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                            <i className="ri-shopping-basket-fill text-2xl text-heading"></i>
                        </div>
                        <span className="text-2xl font-bold text-white">Grocery.</span>
                    </div>
                     <p className="text-white/70 mt-4 max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                     <div className="flex items-center gap-3 mt-6">
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-white/80 transition-colors duration-300"><i className="ri-facebook-fill"></i></a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-white/80 transition-colors duration-300"><i className="ri-twitter-fill"></i></a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-white/80 transition-colors duration-300"><i className="ri-pinterest-fill"></i></a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-white/80 transition-colors duration-300"><i className="ri-instagram-line"></i></a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-white/80 transition-colors duration-300"><i className="ri-youtube-fill"></i></a>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Empresa</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-white/70 hover:text-secondary">Sobre Nós</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Blog</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Contate-Nos</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Carreira</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Atendimento ao Cliente</h3>
                     <ul className="space-y-3">
                        <li><a href="#" className="text-white/70 hover:text-secondary">Minha Conta</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Rastreie Seu Pedido</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Devolução</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">FAQ</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-bold mb-4">Nossas Informações</h3>
                     <ul className="space-y-3">
                        <li><a href="#" className="text-white/70 hover:text-secondary">Privacidade</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Termos e Condições do Usuário</a></li>
                        <li><a href="#" className="text-white/70 hover:text-secondary">Política de Devolução</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-bold mb-4">Informações de Contato</h3>
                     <ul className="space-y-3 text-white/70">
                        <li>+0123-456-789</li>
                        <li>example@gmail.com</li>
                        <li>8502 Preston Rd. Inglewood, Maine 98380</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/20 py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-sm text-white/70">
                <p className="mb-4 sm:mb-0">Copyright © 2024 <span className="text-secondary font-semibold">Grocery Website Design</span>. Todos os Direitos Reservados.</p>
                <div className="flex items-center gap-6">
                    <button className="hover:text-secondary flex items-center">Português <i className="ri-arrow-down-s-line ml-1"></i></button>
                    <button className="hover:text-secondary flex items-center">BRL <i className="ri-arrow-down-s-line ml-1"></i></button>
                </div>
            </div>
        </div>
    </footer>
);


const FilterModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const activeFilterCount = 3; // Placeholder
    const modalRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const touchState = useRef({ startY: 0, currentY: 0, moving: false }).current;


    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = requestAnimationFrame(() => setIsVisible(true));
        
        return () => {
            cancelAnimationFrame(timer);
            document.body.style.overflow = 'auto';
        };
    }, []);

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
                        <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Filtros</h2>
                        <button onClick={handleClose} className="p-2 -mr-2">
                            <XIcon className="w-5 h-5 text-text-body dark:text-dark-text-body"/>
                        </button>
                    </div>
                </header>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    <FilterContent />
                </div>
                <footer className="p-4 border-t border-border dark:border-dark-border flex items-center gap-4">
                    <button className="flex-1 px-4 h-12 text-sm font-bold bg-gray-100 dark:bg-dark-subtle text-heading dark:text-dark-text-heading rounded-full">Limpar Filtros</button>
                    <button onClick={handleClose} className="flex-1 px-4 h-12 text-sm font-bold bg-primary text-white rounded-full">Aplicar ({activeFilterCount})</button>
                </footer>
            </div>
        </div>
    );
};

const SortModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Em destaque');
    const sortOptions = [
        'Em destaque', 'Mais vendidos', 'Ordem alfabética, A-Z', 'Ordem alfabética, Z-A',
        'Preço, ordem crescente', 'Preço, ordem decrescente', 'Data, mais antiga primeiro', 'Data, mais recente primeiro'
    ];
     const modalRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const touchState = useRef({ startY: 0, currentY: 0, moving: false }).current;
    
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = requestAnimationFrame(() => setIsVisible(true));
        
        return () => {
            cancelAnimationFrame(timer);
            document.body.style.overflow = 'auto';
        };
    }, []);

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
                setIsVisible(false);
                setTimeout(onClose, 300);
            } else {
                modalRef.current.style.transform = 'translateY(0)';
            }
        }
    };

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
                        <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Ordenar por</h2>
                        <button onClick={handleClose} className="p-2 -mr-2">
                            <XIcon className="w-5 h-5 text-text-body dark:text-dark-text-body"/>
                        </button>
                    </div>
                </header>
                <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
                     {sortOptions.map(option => (
                        <label key={option} className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedSort(option)}>
                            <CustomDashboardCheckbox isRadio checked={selectedSort === option} onChange={() => {}} />
                            <span className="font-medium text-heading dark:text-dark-text-heading">{option}</span>
                        </label>
                     ))}
                </div>
                <footer className="p-4 border-t border-border dark:border-dark-border">
                    <button onClick={handleClose} className="w-full px-4 h-12 text-sm font-bold bg-primary text-white rounded-full">Aplicar</button>
                </footer>
            </div>
        </div>
    );
};

const PriceRangeSlider: React.FC<{ min: number, max: number }> = ({ min, max }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal]);

    return (
        <div>
            <div className="relative h-1 bg-gray-200 rounded-full my-4">
                <div ref={range} className="absolute h-1 bg-primary rounded-full"></div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const value = Math.min(Number(event.target.value), maxVal - 1);
                        setMinVal(value);
                        minValRef.current = value;
                    }}
                    className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none top-0 z-10 slider-thumb"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const value = Math.max(Number(event.target.value), minVal + 1);
                        setMaxVal(value);
                        maxValRef.current = value;
                    }}
                    className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none top-0 z-10 slider-thumb"
                />
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-body pointer-events-none">R$</span>
                    <input type="number" value={minVal} onChange={e => setMinVal(Number(e.target.value))} className="w-28 pl-9 pr-2 py-2 bg-white text-heading border border-border rounded-full text-center focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <span className="text-text-body">até</span>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-body pointer-events-none">R$</span>
                    <input type="number" value={maxVal} onChange={e => setMaxVal(Number(e.target.value))} className="w-28 pl-9 pr-2 py-2 bg-white text-heading border border-border rounded-full text-center focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
            </div>
            <style>{`
                .slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #2E666B;
                    cursor: pointer;
                    pointer-events: all;
                    position: relative;
                    z-index: 2;
                }
                .slider-thumb::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #2E666B;
                    cursor: pointer;
                    pointer-events: all;
                    position: relative;
                    z-index: 2;
                }
            `}</style>
        </div>
    );
};

export default ShopPage;
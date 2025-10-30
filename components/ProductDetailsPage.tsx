import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import { ProductData } from '../types';

interface NavigationProps {
    activeView: 'home' | 'shop' | 'productDetail';
    onNavigateToDashboard: () => void;
    onNavigateToShop: () => void;
    onNavigateToHome: () => void;
    onProductClick: (product: ProductData) => void;
}

interface ProductDetailsPageProps extends NavigationProps {
    product: ProductData;
}

// --- ICONS (local to this component for simplicity) ---
const ShareIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.29581 15.0481 5.58043 15.1382 5.84911L8.29616 9.7201C7.52565 9.27993 6.58266 9 5.5 9C3.567 9 2 10.567 2 12.5C2 14.433 3.567 16 5.5 16C6.58266 16 7.52565 15.7201 8.29616 15.2799L15.1382 19.1509C15.0481 19.4196 15 19.7042 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17C17.0379 17 16.1793 17.2285 15.4842 17.6182L8.51581 13.6818C8.77153 13.1979 8.94002 12.8219 8.98638 12.5H8.98937C8.94002 12.1781 8.77153 11.8021 8.51581 11.3182L15.4842 7.38183C16.1793 7.77148 17.0379 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const productDetailsData = {
    images: [
        'https://images.pexels.com/photos/86733/pexels-photo-86733.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1414644/pexels-photo-1414644.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/708520/pexels-photo-708520.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Frutas',
    name: 'Maçã Verde Fresca',
    rating: 5.0,
    reviews: 245,
    price: 12.00,
    originalPrice: 15.00,
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    weights: ['500 g', '1 Kg', '2 Kg', '5 Kg'],
    seller: {
        name: 'Creative Bobbles',
        avatar: 'https://i.pravatar.cc/150?u=seller',
        location: 'São Paulo, SP',
        rating: 4.8,
        reviews: 1200,
        sales: 5000,
        yearsOnPlatform: 3,
    }
}

const CustomDropdown: React.FC<{
    label: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
}> = ({ label, options, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            <label className="block text-lg font-semibold text-heading mb-3">{label}</label>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="form-input-details !rounded-full w-full flex justify-between items-center text-left"
                >
                    <span className='text-heading'>{selectedValue}</span>
                    <i className={`ri-arrow-down-s-line text-xl text-text-body transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
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
        </div>
    );
};

// FIX: Added FadeIn animation component from HomePage.tsx.
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
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

// FIX: Defined missing ReviewList component to render reviews.
const ReviewList = () => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-heading">Mostrando {reviews.length} Avaliações</h3>
                <ReviewSortDropdown />
            </div>
            {reviews.map((review, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-6 border-b border-border pb-8">
                    <div className="flex-shrink-0 text-center">
                        <img src={review.avatar} alt={review.name} className="w-16 h-16 rounded-full mx-auto" />
                        <p className="mt-2 font-semibold text-heading">{review.name}</p>
                        <p className="text-sm text-text-body">{review.date}</p>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-secondary text-lg">
                                {[...Array(Math.floor(review.rating))].map((_, i) => <i key={i} className="ri-star-s-fill"></i>)}
                            </div>
                            <h4 className="font-bold text-heading">{review.title}</h4>
                        </div>
                        <p className="text-text-body">{review.text}</p>
                        {review.images.length > 0 && (
                            <div className="flex gap-3 mt-4">
                                {review.images.map((img, i) => (
                                    <img key={i} src={img} alt={`review image ${i+1}`} className="w-24 h-24 rounded-lg object-cover" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

// FIX: Defined missing AddReviewForm component.
const AddReviewForm = () => {
    const [rating, setRating] = useState(0);

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-heading mb-4">Adicionar uma avaliação</h2>
            <div className="flex items-center gap-2 mb-4">
                <p className="font-medium text-heading">Sua Avaliação:</p>
                <div className="flex text-2xl text-gray-300">
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <button key={starValue} onMouseEnter={() => setRating(starValue)} onClick={() => setRating(starValue)} className="focus:outline-none">
                                <i className={`ri-star-s-fill transition-colors ${starValue <= rating ? 'text-secondary' : 'text-gray-300'}`}></i>
                            </button>
                        );
                    })}
                </div>
            </div>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nome *" className="form-input-details" />
                    <input type="email" placeholder="Email *" className="form-input-details" />
                </div>
                <input type="text" placeholder="Título da Avaliação" className="form-input-details" />
                <textarea rows={5} placeholder="Sua Avaliação *" className="form-input-details"></textarea>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:brightness-110 transition-all duration-300">
                        Enviar Avaliação
                    </button>
                </div>
            </form>
        </div>
    );
};

// FIX: Added missing FeaturesBar component from HomePage.tsx.
const FeaturesBar = () => {
    const features = [
        { icon: 'ri-truck-line', title: 'Frete Grátis', desc: 'Frete grátis para pedidos acima de R$50' },
        { icon: 'ri-wallet-3-line', title: 'Pagamento Flexível', desc: 'Múltiplas opções de pagamento seguro' },
        { icon: 'ri-customer-service-2-line', title: 'Suporte 24/7', desc: 'Oferecemos suporte online todos os dias.' },
    ];
    return (
        <section className="py-12 md:py-20 border-y border-border">
            <div className="container mx-auto px-4">
                <FadeIn>
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
                </FadeIn>
            </div>
        </section>
    );
}

// FIX: Added missing Newsletter component from HomePage.tsx.
const Newsletter = () => (
    <section className="py-12 md:py-20 bg-cover bg-center relative" style={{backgroundImage: "url('https://i.ibb.co/1f1nH61Y/Gemini-Generated-Image-888yny888yny888y.png')"}}>
        <div className="absolute inset-0 bg-white/50"></div>
         <FadeIn>
        <div className="container mx-auto px-4 text-center relative z-10">
            <p className="text-text-body">Nossa Newsletter</p>
            <h2 className="text-3xl md:text-4xl font-bold text-heading">Inscreva-se na Nossa Newsletter para Receber <br/> <span className="text-primary">Atualizações sobre Nossas Últimas Ofertas</span></h2>
            <p className="text-text-body mt-4 mb-8">Ganhe 25% de desconto no seu primeiro pedido apenas se inscrevendo em nossa newsletter</p>
            <div className="max-w-lg mx-auto relative">
                <input type="email" placeholder="Digite o Endereço de Email" className="w-full border border-border rounded-full py-4 pl-6 pr-40 h-16 focus:outline-none focus:ring-1 focus:ring-primary" />
                <button className="absolute right-2 top-2 bottom-2 bg-secondary text-heading font-bold px-8 rounded-full hover:brightness-110 transition-all duration-300">Inscrever-se</button>
            </div>
        </div>
         </FadeIn>
    </section>
);

// FIX: Added missing Footer component from HomePage.tsx.
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


const ProductDetailsPage: React.FC<ProductDetailsPageProps> = (props) => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const reviewsRef = useRef<HTMLDivElement>(null);

    const handleReviewsClick = () => {
        reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const formStyles = `
            .form-input-details { 
                width: 100%; 
                padding: 0.75rem 1rem; 
                background-color: white; 
                color: #242424; 
                border: 1px solid #EAEAEA; 
                border-radius: 0.5rem; 
                transition: all 0.2s; 
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }
            .form-input-details:focus { 
                outline: none; 
                border-color: #2E666B; 
                box-shadow: 0 0 0 2px #E2F1F2; 
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = formStyles;
        document.head.appendChild(styleSheet);
        return () => { document.head.removeChild(styleSheet); }
    }, []);

    return (
        <div className="font-sans bg-white text-heading">
            <Header {...props} />
            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7">
                        <ProductImageGallery images={productDetailsData.images} />
                    </div>
                    <div className="lg:col-span-5">
                        <ProductInfo 
                            onOpenPaymentModal={() => setIsPaymentModalOpen(true)} 
                            onReviewsClick={handleReviewsClick}
                        />
                    </div>
                </div>
                <div className="mt-16">
                    <DescriptionContent />
                    <hr className="my-8 border-border" />
                    <ProductDetailsTable />
                    <hr className="my-8 border-border" />
                    <div ref={reviewsRef}>
                      <ReviewContent />
                    </div>
                </div>
            </main>
            {isPaymentModalOpen && <PaymentMethodsModal onClose={() => setIsPaymentModalOpen(false)} />}
            <FeaturesBar />
            <Newsletter />
            <Footer />
        </div>
    );
};

const ImageLightbox: React.FC<{ images: string[], startIndex: number, onClose: () => void }> = ({ images, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [isVisible, setIsVisible] = useState(false);

    const nextImage = () => setCurrentIndex(prev => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Match transition duration
    };
    
    useEffect(() => {
        const timer = requestAnimationFrame(() => setIsVisible(true));
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            cancelAnimationFrame(timer);
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-colors duration-300 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`} onClick={handleClose}>
            <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className="absolute top-4 right-4 text-white text-4xl hover:opacity-75 z-10">
                &times;
            </button>
            <div className={`relative w-full h-full max-w-4xl max-h-[80vh] transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} onClick={e => e.stopPropagation()}>
                <img src={images[currentIndex]} alt="Produto ampliado" className="w-full h-full object-contain" />
                {images.length > 1 && <>
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors">
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors">
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </>}
            </div>
        </div>
    );
};

const ProductImageGallery: React.FC<{images: string[]}> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    
    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setActiveIndex(prev => (prev + 1) % images.length);
    };
    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setActiveIndex(prev => (prev - 1 + images.length) % images.length);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 1024) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    const handleMouseEnter = () => {
        if (window.innerWidth >= 1024) {
            setShowZoom(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 1024) {
            setShowZoom(false);
        }
    };

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-8 items-start">
                <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                    {images.map((img, index) => (
                        <button key={index} onClick={() => setActiveIndex(index)} className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${activeIndex === index ? 'border-2 border-primary p-0' : 'border border-border hover:border-primary/50 p-0'}`}>
                            <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
                
                <div className="relative w-full">
                    <div 
                        className="relative border border-border rounded-lg overflow-hidden aspect-square w-full lg:cursor-crosshair" 
                        onClick={() => setIsLightboxOpen(true)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                         <img 
                            src={images[activeIndex]} 
                            alt="Produto principal" 
                            className="w-full h-full object-cover transition-transform duration-300 ease-out"
                            style={{
                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                transform: showZoom ? 'scale(1.5)' : 'scale(1)',
                            }}
                         />
                    </div>
                     <button onClick={prevImage} className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white hover:bg-gray-100 text-heading rounded-full w-12 h-12 items-center justify-center text-xl transition-all shadow-md disabled:opacity-50 z-10">
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <button onClick={nextImage} className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white hover:bg-gray-100 text-heading rounded-full w-12 h-12 items-center justify-center text-xl transition-all shadow-md disabled:opacity-50 z-10">
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>

            {isLightboxOpen && <ImageLightbox images={images} startIndex={activeIndex} onClose={() => setIsLightboxOpen(false)} />}
        </>
    )
}

const ProductInfo: React.FC<{ onOpenPaymentModal: () => void; onReviewsClick: () => void; }> = ({ onOpenPaymentModal, onReviewsClick }) => {
    const [selectedQuantity, setSelectedQuantity] = useState('1');
    const [selectedWeight, setSelectedWeight] = useState(productDetailsData.weights[0]);
    const { seller } = productDetailsData;
    const quantityOptions = Array.from({ length: 10 }, (_, i) => String(i + 1));

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 flex items-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center border border-border rounded-full text-text-body hover:border-primary hover:text-primary transition-colors">
                    <ShareIcon className="w-6 h-6"/>
                </button>
                 <button className="w-12 h-12 flex items-center justify-center border border-border rounded-full text-text-body hover:border-primary hover:text-primary transition-colors">
                    <i className="ri-heart-line text-2xl"></i>
                </button>
            </div>

            <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold text-heading">{productDetailsData.name}</h1>
                <div className="bg-primary-bg text-primary text-sm font-semibold py-1 px-3 rounded-full">Em Estoque</div>
            </div>
            <button onClick={onReviewsClick} className="flex items-center gap-2 mt-3 cursor-pointer group">
                <div className="flex items-center gap-1 text-secondary text-xl">
                     {[...Array(5)].map((_, i) => <i key={i} className="ri-star-s-fill"></i>)}
                </div>
                <span className="text-heading font-medium group-hover:text-primary transition-colors">5.0</span>
                <span className="text-text-body text-sm group-hover:text-primary transition-colors">({productDetailsData.reviews} Avaliações)</span>
            </button>

             <div className="mt-4">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-heading">R${productDetailsData.price.toFixed(2).replace('.', ',')}</span>
                    {productDetailsData.originalPrice && <span className="text-xl text-text-body line-through">R${productDetailsData.originalPrice.toFixed(2).replace('.', ',')}</span>}
                </div>
                <button onClick={onOpenPaymentModal} className="text-sm text-primary hover:underline mt-2">Ver formas de pagamento</button>
            </div>
            
            <div className="mt-6 space-y-4">
                <CustomDropdown
                    label="Peso"
                    options={productDetailsData.weights}
                    selectedValue={selectedWeight}
                    onSelect={setSelectedWeight}
                />
                <CustomDropdown
                    label="Quantidade"
                    options={quantityOptions}
                    selectedValue={selectedQuantity}
                    onSelect={setSelectedQuantity}
                />
            </div>
            
            <div className="mt-6 flex items-center gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-full h-14 hover:brightness-110 transition-all duration-300">
                    <img src="https://i.ibb.co/HLKLy42f/whatsapp-svgrepo-com.png" alt="WhatsApp" className="w-6 h-6" />
                    <span>Comprar via Whatsapp</span>
                </button>
                <button className="flex-1 border border-primary text-primary font-semibold py-3 px-6 rounded-full h-14 hover:bg-primary/5 transition-colors duration-300">
                    Adicionar ao carrinho
                </button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                    <img src={seller.avatar} alt={seller.name} className="w-16 h-16 rounded-full object-cover"/>
                    <div>
                        <h4 className="text-lg font-bold text-heading">{seller.name}</h4>
                        <p className="text-sm text-text-body">{seller.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                             <div className="flex items-center gap-1 text-secondary">
                                <i className="ri-star-s-fill"></i>
                                <span className="text-text-body text-sm font-semibold">{seller.rating}</span>
                            </div>
                            <span className="text-text-body text-sm">({seller.reviews} avaliações)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentMethodsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
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

    // Inline SVG icons for payment methods
    const CashIcon = () => <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 9H11.5C10.6716 9 10 9.67157 10 10.5C10 11.3284 10.6716 12 11.5 12H12.5C13.3284 12 14 12.6716 14 13.5C14 14.3284 13.3284 15 12.5 15H10M12 8V9M12 15V16M18 12H18.01M6 12H6.01M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2ZM18.5 12C18.5 12.2761 18.2761 12.5 18 12.5C17.7239 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.7239 11.5 18 11.5C18.2761 11.5 18.5 11.7239 18.5 12ZM6.5 12C6.5 12.2761 6.27614 12.5 6 12.5C5.72386 12.5 5.5 12.2761 5.5 12C5.5 11.7239 5.72386 11.5 6 11.5C6.27614 11.5 6.5 11.7239 6.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    const PixIcon = () => <img src="https://user-images.githubusercontent.com/741969/99538133-492fe280-298b-11eb-81a2-66779343e064.png" alt="Pix" className="w-7 h-7" />;
    const CreditCardIcon = () => <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 10H2M11 14H6M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:items-center md:justify-center">
            <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`} onClick={handleClose}></div>
            <div
                ref={modalRef}
                className={`relative bg-white dark:bg-dark-surface md:rounded-2xl rounded-t-2xl shadow-lg w-full md:max-w-lg transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 md:translate-y-0 md:scale-100 md:opacity-100' : 'translate-y-full md:translate-y-0 md:scale-95 md:opacity-0'}`}
            >
                <header 
                    ref={headerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="md:pt-0"
                >
                    <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark-border">
                        <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Formas de pagamento</h2>
                        <button onClick={handleClose} className="p-2 -mr-2"><i className="ri-close-line text-2xl text-text-body dark:text-dark-text-body"></i></button>
                    </div>
                </header>
                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <CashIcon />
                            <h3 className="font-semibold text-heading dark:text-dark-text-heading">Dinheiro</h3>
                        </div>
                        <p className="text-text-body dark:text-dark-text-body text-sm">Pagamento em espécie no momento da entrega.</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <PixIcon />
                            <h3 className="font-semibold text-heading dark:text-dark-text-heading">Pix</h3>
                        </div>
                        <p className="text-text-body dark:text-dark-text-body text-sm">Pagamento instantâneo. A chave será informada ao finalizar a compra.</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <CreditCardIcon />
                            <h3 className="font-semibold text-heading dark:text-dark-text-heading">Cartão de Crédito e Débito</h3>
                        </div>
                        <p className="text-text-body dark:text-dark-text-body text-sm mb-3">Aceitamos as principais bandeiras. Pague na entrega ou online.</p>
                        <div className="flex items-center gap-2">
                           <img className="h-6" src="https://logopng.com.br/logos/visa-3.svg" alt="Visa"/>
                           <img className="h-6" src="https://logopng.com.br/logos/mastercard-4.svg" alt="Mastercard"/>
                           <img className="h-6" src="https://logopng.com.br/logos/elo-2.svg" alt="Elo"/>
                           <img className="h-6" src="https://logopng.com.br/logos/hipercard.svg" alt="Hipercard"/>
                        </div>
                    </div>
                </div>
                <footer className="p-4 border-t border-border dark:border-dark-border">
                    <button onClick={handleClose} className="w-full px-4 h-12 text-sm font-bold bg-primary text-white rounded-full">Entendi</button>
                </footer>
            </div>
        </div>
    );
};

const DescriptionContent = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-heading mb-4">Descrição</h2>
            <div className="text-text-body space-y-4">
                <p>Totalmente personalizado com suas fotos! Um presente incrível para aniversários, casamentos ou qualquer ocasião especial. Feito à mão com argila de polímero de alta qualidade.</p>
            </div>
        </div>
    );
};

const ProductDetailsTable = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-heading mb-4">Detalhes do produto</h2>
            <div className="text-text-body space-y-3">
                <table className="w-full text-left">
                    <tbody>
                        <tr className="border-b border-border">
                            <td className="py-3 font-semibold text-heading">Peso</td>
                            <td className="py-3">0.5 kg, 1kg, 2kg, 5kg</td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 font-semibold text-heading">Dimensões</td>
                            <td className="py-3">10 x 10 x 15 cm</td>
                        </tr>
                        <tr className="border-b border-border">
                            <td className="py-3 font-semibold text-heading">Material</td>
                            <td className="py-3">Orgânico, Fresco</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-semibold text-heading">Info Envio</td>
                            <td className="py-3">Envio para todo o Brasil. Devoluções aceitas em até 7 dias.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ReviewContent = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-heading mb-6">Avaliações</h2>
            <div className="text-text-body space-y-12">
                <ReviewSummary />
                <ReviewList />
                <AddReviewForm />
            </div>
        </div>
    );
};

const ReviewSummary = () => {
    const ratings = [
        { star: 5, percentage: 80 }, { star: 4, percentage: 15 }, { star: 3, percentage: 3 },
        { star: 2, percentage: 2 }, { star: 1, percentage: 0 },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 bg-white rounded-lg">
            <div className="text-center md:text-left flex-shrink-0">
                <p className="text-5xl font-bold text-heading">5.0 <span className="text-2xl text-text-body font-normal">de 5</span></p>
                <div className="flex items-center justify-center md:justify-start gap-1 text-secondary text-2xl my-2">
                     {[...Array(5)].map((_, i) => <i key={i} className="ri-star-s-fill"></i>)}
                </div>
                <p className="text-text-body">(245 Avaliações)</p>
            </div>
            <div className="w-full flex-1 space-y-2">
                {ratings.map(r => (
                    <div key={r.star} className="flex items-center gap-4">
                        <span className="text-sm text-text-body font-medium w-20">{r.star} {r.star === 1 ? 'Estrela' : 'Estrelas'}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-secondary h-1.5 rounded-full" style={{width: `${r.percentage}%`}}></div>
                        </div>
                        <span className="text-sm text-text-body font-medium w-10 text-right">{r.percentage}%</span>
                    </div>
                ))}
            </div>
            <div className="w-px h-32 bg-border hidden md:block mx-8"></div>
            <div className="text-center">
                <h3 className="text-xl font-bold text-heading">Avalie este produto</h3>
                <p className="text-text-body my-2">Compartilhe seus pensamentos com outros clientes</p>
                <button className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:brightness-110 transition-all duration-300">
                    Escreva uma avaliação
                </button>
            </div>
        </div>
    );
};

const reviews = [
    { name: 'Kristin Watson', date: 'há 1 mês', title: 'Maçãs Verdes Sempre Frescas e Deliciosas', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 5.0, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', images: ['https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg?auto=compress&cs=tinysrgb&w=300', 'https://images.pexels.com/photos/86733/pexels-photo-86733.jpeg?auto=compress&cs=tinysrgb&w=300', 'https://images.pexels.com/photos/708520/pexels-photo-708520.jpeg?auto=compress&cs=tinysrgb&w=300']},
    { name: 'Bessie Cooper', date: 'há 2 meses', title: 'Maçãs Verdes Super Frescas', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 5.0, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', images: []},
    { name: 'Darlene Robertson', date: 'há 2 meses', title: 'Maçãs Verdes de Alta Qualidade Sempre', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 5.0, avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100', images: []},
];

const ReviewSortDropdown: React.FC = () => {
    const options = ['Mais Recentes', 'Mais Antigas', 'Maior Pontuação', 'Menor Pontuação'];
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleSelect = (option: string) => { setSelected(option); setIsOpen(false); };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-text-body">Ordenar por:</span>
            <div className="relative text-sm" ref={dropdownRef}>
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="border border-border rounded-full px-4 h-10 focus:outline-none focus:ring-1 focus:ring-primary bg-white flex items-center gap-2">
                    <span className="font-semibold text-heading">{selected}</span>
                    <i className={`ri-arrow-down-s-line text-lg text-text-body transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`absolute z-10 w-full mt-2 origin-top-right right-0 transition-all duration-200 ease-out transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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
        </div>
    );
};

export default ProductDetailsPage;
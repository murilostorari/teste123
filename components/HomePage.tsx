import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import Header from './Header';
import { ProductData } from '../types';

// --- ANIMATION COMPONENT ---
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


// --- CAROUSEL WRAPPER ---
const Carousel: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    return (
        <div ref={scrollRef} className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide ${className}`}>
            {children}
        </div>
    );
};

interface NavigationProps {
    activeView: 'home' | 'shop' | 'productDetail';
    onNavigateToDashboard: () => void;
    onNavigateToShop: () => void;
    onNavigateToHome: () => void;
    onProductClick: (product: ProductData) => void;
}

const HomePage: React.FC<NavigationProps> = (props) => {
    return (
        <div className="font-sans bg-white text-heading">
            <Header {...props} />
            <main>
                <HeroSection onNavigateToShop={props.onNavigateToShop} />
                <FeaturedCategories />
                <PromotionBanners />
                <FeaturedProducts onProductClick={props.onProductClick} />
                <SummerDiscountBanner />
                <UnbeatableOffers />
                <BestSellers onProductClick={props.onProductClick} />
                <Testimonials />
                <LatestNews />
                <FAQ />
                <FeaturesBar />
                <ImageGallery />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
};

const HeroSection: React.FC<{onNavigateToShop: () => void}> = ({ onNavigateToShop }) => (
    <section className="bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url('https://i.ibb.co/1f1nH61Y/Gemini-Generated-Image-888yny888yny888y.png')"}}>
         <div className="absolute inset-0"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-xl">
                <FadeIn>
                     <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-md w-fit">
                         <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                            <i className="ri-shopping-basket-fill text-lg text-heading"></i>
                        </div>
                        <span className="font-semibold text-heading text-sm sm:text-base">A Melhor Mercearia Online</span>
                     </div>
                    <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-heading leading-tight">Sua Parada Única para Compras de <span className="text-primary">Qualidade</span></h1>
                    <p className="mt-4 mb-8 max-w-md text-text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    <div className="flex items-center gap-4">
                        <button onClick={onNavigateToShop} className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:brightness-110 transition-all duration-300 flex items-center gap-2">Compre Agora <i className="ri-arrow-right-line"></i></button>
                        <button onClick={onNavigateToShop} className="font-semibold text-heading hover:text-primary underline">Ver Todos os Produtos</button>
                    </div>
                     <div className="mt-12 flex items-center gap-4">
                        <div className="flex -space-x-2">
                            <img className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                            <img className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                            <img className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white" src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white bg-secondary flex items-center justify-center text-heading font-bold">+</div>
                        </div>
                        <div>
                            <p className="font-bold text-heading text-base sm:text-lg">4.8+ Avaliações</p>
                            <p className="text-text-body text-sm">Confiado por mais de 75 mil clientes</p>
                        </div>
                     </div>
                </FadeIn>
            </div>
        </div>
        <div className="absolute right-4 sm:right-16 lg:right-32 bottom-8 sm:bottom-20 flex flex-col gap-6 z-10">
            <FadeIn><div className="bg-white/80 backdrop-blur-sm p-3 rounded-full flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"><i className="ri-shield-check-fill text-2xl"></i></div>
                <span className="font-semibold text-heading hidden sm:block">Pagamento Seguro</span>
            </div></FadeIn>
            <FadeIn><div className="bg-white/80 backdrop-blur-sm p-3 rounded-full flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"><i className="ri-rocket-2-fill text-2xl"></i></div>
                <span className="font-semibold text-heading hidden sm:block">Entrega Rápida</span>
            </div></FadeIn>
        </div>
    </section>
);

const newCategories = [
    { name: 'Produtos', img: 'https://i.ibb.co/yFct4XYd/pacote-de-viagem-ainda-vida.jpg' },
    { name: 'Serviços', img: 'https://i.ibb.co/YFbMh19r/services.png' },
    { name: 'Locais', img: 'https://i.ibb.co/gbR3Wzmh/locais.png' },
    { name: 'Locações', img: 'https://i.imgur.com/7gK5Y0Y.jpg' },
];

const FeaturedCategories = () => (
    <section className="py-12 md:py-20 bg-white relative">
        <div className="container mx-auto px-4">
            <FadeIn>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">Navegue por Categoria</h2>
                </div>
            </FadeIn>
            <FadeIn>
                <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
                    {newCategories.map((cat, index) => (
                        <div key={index} className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[5/4] w-2/3 sm:w-auto flex-shrink-0 snap-center">
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6">
                                <h3 className="text-white font-bold text-base sm:text-xl tracking-wider">{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </div>
    </section>
);

const PromotionBanners = () => (
    <section className="container mx-auto px-4 pb-12 md:pb-20">
        <FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative bg-cover bg-center rounded-lg p-6 sm:p-10 text-white flex items-center min-h-[280px] overflow-hidden group" style={{backgroundImage: "url('https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}>
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                <div className="max-w-xs relative z-10">
                    <div className="bg-secondary text-heading font-bold py-1 px-3 rounded-md inline-block">20% de Desconto</div>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-4 leading-tight">Vegetais Puramente Frescos</h2>
                    <p className="mt-4 text-white/80 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <button className="mt-6 bg-primary text-white font-semibold py-3 px-6 rounded-full text-sm hover:brightness-110 transition-all duration-300 flex items-center gap-2">Compre Agora <i className="ri-arrow-right-line"></i></button>
                </div>
            </div>
             <div className="relative bg-cover bg-center rounded-lg p-6 sm:p-10 text-white flex items-center min-h-[280px] overflow-hidden group" style={{backgroundImage: "url('https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                <div className="max-w-xs relative z-10">
                    <div className="bg-secondary text-heading font-bold py-1 px-3 rounded-md inline-block">25% de Desconto</div>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-4 leading-tight">Frutas Frescas, Pura Qualidade</h2>
                    <p className="mt-4 text-white/80 text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    <button className="mt-6 bg-primary text-white font-semibold py-3 px-6 rounded-full text-sm hover:brightness-110 transition-all duration-300 flex items-center gap-2">Compre Agora <i className="ri-arrow-right-line"></i></button>
                </div>
            </div>
        </div>
        </FadeIn>
    </section>
);


const products: ProductData[] = [
    { id: 1, discount: 20, imageUrl: 'https://images.pexels.com/photos/1131868/pexels-photo-1131868.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Morango Fresco', price: 8.00, compareAtPrice: 10.00, stockStatus: '4.8', seller: { name: 'Fazenda Feliz', avatarUrl: 'https://i.pravatar.cc/32?u=seller1' }, distance: 2.5 },
    { id: 2, discount: 20, imageUrl: 'https://images.pexels.com/photos/1306543/pexels-photo-1306543.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Vegetais', name: 'Couve-Flor Fresca', price: 12.00, compareAtPrice: 15.00, stockStatus: '4.9', seller: { name: 'Horta Orgânica', avatarUrl: 'https://i.pravatar.cc/32?u=seller2' }, distance: 0.8 },
    { id: 3, discount: 20, imageUrl: 'https://images.pexels.com/photos/225383/pexels-photo-225383.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Limão Siciliano Fresco', price: 8.00, compareAtPrice: 10.00, stockStatus: '4.8', seller: { name: 'Pomar do Sol', avatarUrl: 'https://i.pravatar.cc/32?u=seller3' }, distance: 5.1 },
    { id: 4, discount: 20, imageUrl: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Frutas', name: 'Manga Fresca', price: 12.00, compareAtPrice: 15.00, stockStatus: '4.9', seller: { name: 'Frutas Tropicais', avatarUrl: 'https://i.pravatar.cc/32?u=seller4' }, distance: 12.7 },
    { id: 9, discount: 15, imageUrl: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Laticínios', name: 'Leite de Amêndoa', price: 8.50, compareAtPrice: 10.00, stockStatus: '4.7', seller: { name: 'Laticínios da Serra', avatarUrl: 'https://i.pravatar.cc/32?u=seller5' }, distance: 3.2 },
];

const FeaturedProducts: React.FC<{onProductClick: (product: ProductData) => void}> = ({ onProductClick }) => (
    <section className="pb-12 md:pb-20">
        <div className="container mx-auto px-4">
            <FadeIn>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                 <div className="mb-6 md:mb-0">
                    <p className="text-text-body">Produtos</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">Produtos em <span className="text-primary">Destaque</span></h2>
                </div>
                <a href="#" className="bg-primary text-white font-semibold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 flex items-center gap-2 self-start md:self-center">Ver Todos os Produtos <i className="ri-arrow-right-line"></i></a>
            </div>
            </FadeIn>
            <FadeIn>
                <Carousel>
                    {products.map(p => (
                        <div key={p.id} className="snap-center shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[18%]">
                            <ProductCard {...p} rating={Number(p.stockStatus)} onClick={() => onProductClick(p)} />
                        </div>
                    ))}
                </Carousel>
            </FadeIn>
        </div>
    </section>
);

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-09-01") - +new Date();
        let timeLeft: { [key: string]: number } = {};
        if (difference > 0) {
            timeLeft = {
                dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="text-center">
            <div className="text-2xl sm:text-4xl font-bold text-heading">{String(value).padStart(2, '0')}</div>
            <div className="text-xs sm:text-sm mt-1 uppercase text-text-body">{interval}</div>
        </div>
    ));

    return (
        <div className="flex gap-2 sm:gap-4 items-center">
            {timerComponents.length ? (
                <>
                {timerComponents[0]} <span className="text-xl sm:text-3xl font-bold text-heading">:</span>
                {timerComponents[1]} <span className="text-xl sm:text-3xl font-bold text-heading">:</span>
                {timerComponents[2]} <span className="text-xl sm:text-3xl font-bold text-heading">:</span>
                {timerComponents[3]}
                </>
            ) : (
                <span className="text-2xl font-bold text-heading">O tempo acabou!</span>
            )}
        </div>
    );
}

const SummerDiscountBanner = () => (
    <section className="container mx-auto px-4 pb-12 md:pb-20">
        <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <img src="https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Shopping" className="rounded-2xl w-full md:w-1/4 object-cover h-48 md:h-96"/>
             <div className="flex-1 bg-white border-2 border-dashed border-primary/50 rounded-2xl p-6 md:p-10 text-center bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]">
                <h2 className="text-3xl sm:text-5xl font-bold text-heading">Desconto de <span className="text-primary">Verão</span></h2>
                <p className="mt-2 text-base sm:text-lg text-text-body">Ganhe 50% de desconto - Oferta por tempo limitado!</p>
                <div className="my-8 flex justify-center">
                    <CountdownTimer />
                </div>
                <button className="bg-primary text-white font-semibold py-3 px-8 rounded-full hover:brightness-110 transition-all duration-300 flex items-center gap-2 mx-auto">Compre Agora <i className="ri-arrow-right-line"></i></button>
            </div>
             <img src="https://images.pexels.com/photos/1089144/pexels-photo-1089144.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Shopping" className="rounded-2xl w-full md:w-1/4 object-cover h-48 md:h-96"/>
        </div>
        </FadeIn>
    </section>
);

const UnbeatableOffers = () => (
    <section className="container mx-auto px-4 pb-12 md:pb-20">
        <FadeIn>
        <div className="bg-primary rounded-2xl p-8 md:p-16 flex justify-between items-center bg-no-repeat bg-right bg-contain" style={{backgroundImage: "url('https://i.ibb.co/LhLfc5g/offers-bg.png')"}}>
            <div className="max-w-lg">
                <p className="text-secondary font-medium">Ofertas Semanais</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2">Ofertas Imperdíveis: Seus <span className="text-secondary">Especiais de Mercearia da Semana</span></h2>
                <p className="text-white/80 mt-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem</p>
                <button className="mt-8 bg-secondary text-heading font-bold py-3 px-8 rounded-full hover:brightness-110 transition-all duration-300 flex items-center gap-2">Compre Agora <i className="ri-arrow-right-line"></i></button>
            </div>
        </div>
        </FadeIn>
    </section>
);


const bestSellerProducts: ProductData[] = [
    { id: 5, discount: 50, imageUrl: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Doces e Salgados', name: 'Bola de Chocolate', price: 25.00, compareAtPrice: 50.00, stockStatus: '4.9', seller: { name: 'Doceria da Vovó', avatarUrl: 'https://i.pravatar.cc/32?u=seller6' }, distance: 0.8 },
    { id: 6, discount: 50, imageUrl: 'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Padaria', name: 'Pão Integral', price: 5.00, compareAtPrice: 10.00, stockStatus: '5.0', seller: { name: 'Pão de Ouro', avatarUrl: 'https://i.pravatar.cc/32?u=seller7' }, distance: 1.1 },
    { id: 7, discount: 20, imageUrl: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Laticínios', name: 'Leite de Amêndoa', price: 8.00, compareAtPrice: 10.00, stockStatus: '4.9', seller: { name: 'Laticínios da Serra', avatarUrl: 'https://i.pravatar.cc/32?u=seller5' }, distance: 3.2 },
    { id: 8, discount: 20, imageUrl: 'https://images.pexels.com/photos/5945763/pexels-photo-5945763.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Óleos', name: 'Óleo de Coco', price: 20.00, compareAtPrice: 25.00, stockStatus: '4.8', seller: { name: 'Mundo Natural', avatarUrl: 'https://i.pravatar.cc/32?u=seller8' }, distance: 2.0 },
    { id: 10, discount: 25, imageUrl: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600', category: 'Vegetais', name: 'Couve-Flor Orgânica', price: 15.00, compareAtPrice: 20.00, stockStatus: '4.9', seller: { name: 'Horta Orgânica', avatarUrl: 'https://i.pravatar.cc/32?u=seller2' }, distance: 0.8 },
];

const BestSellers: React.FC<{onProductClick: (product: ProductData) => void}> = ({ onProductClick }) => (
     <section className="pb-12 md:pb-20">
        <div className="container mx-auto px-4">
            <FadeIn>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                 <div className="mb-6 md:mb-0">
                    <p className="text-text-body">Mais Vendidos</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">Produtos Mais <span className="text-primary">Vendidos</span></h2>
                </div>
                <a href="#" className="bg-primary text-white font-semibold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 flex items-center gap-2 self-start md:self-center">Ver Todos os Produtos <i className="ri-arrow-right-line"></i></a>
            </div>
            </FadeIn>
            <FadeIn>
                 <Carousel>
                    {bestSellerProducts.map(p => (
                        <div key={p.id} className="snap-center shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[18%]">
                           <ProductCard {...p} rating={Number(p.stockStatus)} onClick={() => onProductClick(p)} />
                       </div>
                    ))}
                </Carousel>
            </FadeIn>
        </div>
    </section>
);

const Testimonials = () => (
    <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
            <FadeIn>
            <div className="text-center mb-12">
                <p className="text-text-body">Depoimentos</p>
                <h2 className="text-3xl md:text-4xl font-bold text-heading">Depoimentos de Nossos <span className="text-primary">Clientes Fiéis</span></h2>
            </div>
            </FadeIn>
            <FadeIn>
            <div className="relative max-w-4xl mx-auto text-center">
                 <button className="hidden md:flex bg-heading text-white w-12 h-12 rounded-full items-center justify-center text-2xl absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hover:bg-primary transition-all duration-300 z-10"><i className="ri-arrow-left-s-line"></i></button>
                 <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
                    <img className="h-12 w-12 sm:h-16 sm:w-16 rounded-full opacity-50 object-cover" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                    <img className="h-16 w-16 sm:h-20 sm:w-20 rounded-full opacity-50 object-cover" src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                    <img className="h-20 w-20 sm:h-28 sm:w-28 rounded-full ring-4 ring-secondary z-10 object-cover" src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                    <img className="h-16 w-16 sm:h-20 sm:w-20 rounded-full opacity-50 object-cover" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                    <img className="h-12 w-12 sm:h-16 sm:w-16 rounded-full opacity-50 object-cover" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                </div>
                <p className="text-lg sm:text-xl italic text-text-body max-w-3xl mx-auto">"Já experimentei vários serviços de entrega de supermercado, e este é de longe o melhor. O site é fácil de usar, a seleção é vasta e o atendimento ao cliente é excelente. Recomendo muito!"</p>
                <div className="text-secondary text-2xl my-4 flex items-center justify-center gap-1">
                    <i className="ri-star-s-fill"></i><i className="ri-star-s-fill"></i><i className="ri-star-s-fill"></i><i className="ri-star-s-fill"></i><i className="ri-star-s-fill"></i>
                    <span className="text-heading font-bold text-lg ml-2">5.0</span>
                </div>
                <h3 className="font-bold text-heading text-lg">Bessie Cooper</h3>
                <p className="text-sm text-text-body">Dona de casa</p>
                 <button className="hidden md:flex bg-primary text-white w-12 h-12 rounded-full items-center justify-center text-2xl absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hover:bg-heading transition-all duration-300 z-10"><i className="ri-arrow-right-s-line"></i></button>
                 <div className="md:hidden flex justify-center gap-4 mt-8">
                    <button className="bg-heading text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-primary transition-colors"><i className="ri-arrow-left-s-line"></i></button>
                    <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-heading transition-colors"><i className="ri-arrow-right-s-line"></i></button>
                </div>
            </div>
            </FadeIn>
        </div>
    </section>
);

const posts = [
    {img: 'https://images.pexels.com/photos/7989337/pexels-photo-7989337.jpeg?auto=compress&cs=tinysrgb&w=800', tag: 'Dicas de Compras', title: 'Como Criar uma Lista de Compras: Mantenha-se Organizado...', author: 'Jenny Alexander', date: '14 de Agosto de 2024'},
    {img: 'https://images.pexels.com/photos/139259/pexels-photo-139259.jpeg?auto=compress&cs=tinysrgb&w=800', tag: 'Guias Sazonais', title: 'Guia de Produtos de Verão: Frutas e Vegetais Frescos para Aproveitar', author: 'Jenny Alexander', date: '13 de Agosto de 2024'},
    {img: 'https://images.pexels.com/photos/1150447/pexels-photo-1150447.jpeg?auto=compress&cs=tinysrgb&w=800', tag: 'Alimentação Saudável', title: 'Top 10 Superalimentos para uma Dieta Equilibrada: Melhore Sua Saúde...', author: 'Jenny Alexander', date: '12 de Agosto de 2024'},
];

const LatestNews = () => (
    <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
            <FadeIn>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
                <div className="mb-6 md:mb-0">
                    <p className="text-text-body">Notícias e Blogs</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">Nossas Últimas <span className="text-primary">Notícias e Blogs</span></h2>
                </div>
                <a href="#" className="bg-primary text-white font-semibold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 flex items-center gap-2 self-start md:self-center">Ver Tudo <i className="ri-arrow-right-line"></i></a>
            </div>
            </FadeIn>
            <FadeIn>
                <Carousel className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                    {posts.map((post, index) => (
                         <div key={index} className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto">
                            <NewsCard {...post} />
                        </div>
                    ))}
                </Carousel>
            </FadeIn>
        </div>
    </section>
);

const NewsCard = ({ img, tag, title, author, date }: { img: string, tag: string, title: string, author: string, date: string }) => (
    <div className="bg-white rounded-2xl overflow-hidden transition-all group">
        <div className="relative">
            <img src={img} alt={title} className="w-full h-56 object-cover rounded-2xl"/>
             <div className="absolute top-4 right-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300">
                <i className="ri-arrow-right-up-line text-2xl"></i>
            </div>
             <div className="absolute bottom-4 left-6 bg-secondary text-heading text-sm font-bold py-2 px-4 rounded-lg" >
                {tag}
            </div>
        </div>
        <div className="p-6">
            <div className="text-sm text-text-body mb-2 flex items-center gap-2">
                <span>{author}</span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                <span>{date}</span>
            </div>
            <h3 className="text-lg font-bold text-heading group-hover:text-primary transition-colors cursor-pointer leading-tight mb-4">{title}</h3>
            <a href="#" className="font-semibold text-primary relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-300">Leia Mais</a>
        </div>
    </div>
);

const FAQ = () => {
    const [open, setOpen] = useState<number | null>(1);
    const faqs = [
        { q: 'Os produtos são frescos e de alta qualidade?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'},
        { q: 'Quais são os horários de entrega?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'},
        { q: 'Quais métodos de pagamento vocês aceitam?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'},
        { q: 'Vocês oferecem descontos ou promoções?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'},
        { q: 'Como posso dar feedback sobre minha experiência?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' },
        { q: 'Vocês oferecem pedidos em grande quantidade para eventos ou empresas?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.' }
    ];
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <FadeIn>
                <div className="text-center mb-10">
                    <p className="text-text-body">Perguntas Frequentes</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">Se você tem perguntas, nós temos <span className="text-primary">respostas</span>.</h2>
                </div>
                 <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) =>(
                        <div key={i} className={`rounded-lg transition-all duration-300 ${open === i ? 'bg-primary text-white' : 'bg-background text-heading'}`}>
                            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                                <span className="font-semibold">{faq.q}</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform text-xl ${open === i ? 'bg-secondary text-primary transform' : 'bg-white'}`}>
                                   {open === i ? <i className="ri-subtract-line"></i> : <i className="ri-add-line"></i>}
                                </div>
                            </button>
                            <div className={`grid grid-rows-[0fr] transition-all duration-500 ${open === i ? 'grid-rows-[1fr]' : ''}`}>
                                 <div className="overflow-hidden">
                                    <p className="px-6 pb-6 text-white/80">{faq.a}</p>
                                 </div>
                            </div>
                        </div>
                    ))}
                </div>
                </FadeIn>
            </div>
        </section>
    );
};

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

const ImageGallery = () => (
    <section className="py-12 md:py-20">
        <FadeIn>
        <div className="flex">
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Galeria imagem 1" className="w-1/5 object-cover h-48 md:h-80"/>
            <img src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Galeria imagem 2" className="w-1/5 object-cover h-48 md:h-80"/>
            <img src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Galeria imagem 3" className="w-1/5 object-cover h-48 md:h-80"/>
            <img src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Galeria imagem 4" className="w-1/5 object-cover h-48 md:h-80"/>
            <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Galeria imagem 5" className="w-1/5 object-cover h-48 md:h-80"/>
        </div>
        </FadeIn>
    </section>
);

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


export default HomePage;

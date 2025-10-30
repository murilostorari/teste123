import React, { useState, useMemo } from 'react';
import { ProductData } from '../types';

type CartItem = {
    product: ProductData;
    quantity: number;
};

const posProducts: (ProductData & { stock: number; description: string; category: string })[] = [
    { id: 101, name: 'Nike Waffle Debut', description: 'Retro gets modernized in the Nike Waffle Debut. Remember that smooth...', price: 80.00, imageUrl: 'https://i.imgur.com/8cb3m2x.png', stock: 218, category: 'Shoes', size: 42, color: 'Beige' },
    { id: 102, name: 'Nike Tech', description: 'Crafted with stretchy, breathable material, the Nike Tech Woven Jacket', price: 130.83, imageUrl: 'https://i.imgur.com/plN4a5j.png', stock: 198, category: 'Clothing' },
    { id: 103, name: 'Nike V2K Run New', description: 'The Nike Elite Crew Basketball Socks offer a supportive fit and feel', price: 16.50, imageUrl: 'https://i.imgur.com/n14aG6r.png', stock: 123, category: 'Others Product' },
    { id: 104, name: 'Nike P-6000', description: 'The Nike P-6000 draws on the 2006 Nike Air Pegasus, bringing of iconic', price: 115.28, imageUrl: 'https://i.imgur.com/kHdtL2z.png', stock: 121, category: 'Shoes' },
    { id: 105, name: 'Nike Zoom Vomero Roam', description: 'Designed for city conditions, this winterized version', price: 187.43, imageUrl: 'https://i.imgur.com/yU55aA3.png', stock: 119, category: 'Shoes' },
    { id: 106, name: "Men's Fleece Cargo Pants", description: 'Clean meets casual with these brushed fleece cargo pants.', price: 65.42, imageUrl: 'https://i.imgur.com/1Gpqy2O.png', stock: 192, category: 'Clothing' },
    { id: 107, name: 'Phantom and Baroque Br...', description: 'A classic shoe with modern comfort.', price: 187.92, imageUrl: 'https://i.imgur.com/Jz2eH7R.png', stock: 218, category: 'Shoes', size: 42, color: 'Brown' },
    { id: 108, name: 'Nike V2K Run New', description: 'Retro gets modernized in the Nike Waffle Debut.', price: 182.72, imageUrl: 'https://i.imgur.com/L4xxa1l.png', stock: 218, category: 'Shoes', size: 42, color: 'Green' },
    { id: 109, name: 'Nike Air Max 90', description: 'Classic Air Max style with a modern twist.', price: 120.00, imageUrl: 'https://i.imgur.com/8cb3m2x.png', stock: 150, category: 'Shoes', size: 43, color: 'White' },
    { id: 110, name: 'Essential Hoodie', description: 'A comfortable hoodie for everyday wear.', price: 55.00, imageUrl: 'https://i.imgur.com/plN4a5j.png', stock: 250, category: 'Clothing' },
];

const posCategories = [
    { name: 'All Product', count: 320 },
    { name: 'Shoes', count: 182 },
    { name: 'Clothing', count: 78 },
    { name: 'Others Product', count: 60 },
];

const initialCart: CartItem[] = [
    { product: posProducts.find(p => p.id === 108)!, quantity: 1 },
    { product: posProducts.find(p => p.id === 107)!, quantity: 1 }
].filter(item => item.product) as CartItem[];


const POSPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All Product');
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All Product') return posProducts;
        return posProducts.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const handleAddToCart = (product: ProductData) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const handleQuantityChange = (productId: number, delta: number) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.product.id === productId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean) as CartItem[];
        });
    };
    
    const handleRemoveFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const handleResetOrder = () => {
        setCart([]);
    };

    const subTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0), [cart]);
    const tax = useMemo(() => subTotal * 0.12, [subTotal]);
    const discount = useMemo(() => -subTotal * 0.1, [subTotal]); // Example 10% discount
    const totalPayment = useMemo(() => subTotal + tax + discount, [subTotal, tax, discount]);


    return (
        <div className="flex h-full font-sans gap-6 bg-white dark:bg-dark-background -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
            {/* Left Panel: Products */}
            <div className="w-[65%] flex flex-col gap-6">
                <header className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        {posCategories.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    activeCategory === cat.name
                                    ? 'bg-primary-bg text-primary'
                                    : 'bg-surface dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-dark-subtle text-text-body dark:text-dark-text-body'
                                }`}
                            >
                                {cat.name} <span className="ml-1 bg-gray-200 dark:bg-dark-subtle text-gray-600 dark:text-dark-text-body text-xs font-bold px-1.5 py-0.5 rounded-md">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                    <button className="bg-surface dark:bg-dark-surface rounded-full w-10 h-10 flex items-center justify-center text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors">
                        <i className="ri-search-line text-xl"></i>
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto -mr-4 pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-surface dark:bg-dark-surface rounded-2xl p-4 shadow-sm border border-border dark:border-dark-border relative">
                                <span className="absolute top-4 left-4 bg-heading dark:bg-dark-active-bg text-white dark:text-dark-text-heading text-xs font-bold px-3 py-1 rounded-full">{product.stock} Stock</span>
                                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                                <h3 className="font-bold text-lg text-heading dark:text-dark-text-heading">{product.name}</h3>
                                <p className="text-text-body dark:text-dark-text-body text-sm mt-1 h-10">{product.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="font-bold text-xl text-heading dark:text-dark-text-heading">${product.price?.toFixed(2)}</p>
                                    <button onClick={() => handleAddToCart(product)} className="flex items-center gap-2 border border-gray-border dark:border-dark-border rounded-lg px-4 py-2 text-sm font-semibold text-text-body dark:text-dark-text-body hover:bg-gray-50 dark:hover:bg-dark-subtle transition-colors">
                                        <i className="ri-add-line"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Right Panel: Transaction */}
            <div className="w-[35%] bg-surface dark:bg-dark-surface rounded-2xl shadow-sm border border-border dark:border-dark-border flex flex-col p-6">
                <header className="flex items-center justify-between pb-4 border-b border-border dark:border-dark-border">
                    <h2 className="font-bold text-xl text-heading dark:text-dark-text-heading">Detail Transaction</h2>
                    <button onClick={handleResetOrder} className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
                        <i className="ri-delete-bin-line text-lg"></i> Reset Order
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto my-4 -mr-3 pr-3">
                    <div className="space-y-4">
                       {cart.map(item => (
                           <div key={item.product.id} className="bg-background dark:bg-dark-background rounded-xl p-4">
                               <div className="flex items-center gap-4">
                                   <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                                   <div className="flex-1">
                                       <div className="flex justify-between items-start">
                                           <h4 className="font-bold text-heading dark:text-dark-text-heading">{item.product.name}</h4>
                                            <button onClick={() => handleRemoveFromCart(item.product.id!)} className="w-7 h-7 flex-shrink-0 bg-red-tag-bg text-red-tag rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                                <i className="ri-delete-bin-7-line text-sm"></i>
                                            </button>
                                       </div>
                                       <div className="flex items-center gap-2 text-sm text-text-body dark:text-dark-text-body mt-1">
                                            <span>Size {item.product.size}</span>
                                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                            <span>{item.product.color}</span>
                                       </div>
                                       <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleQuantityChange(item.product.id!, -1)} className="w-7 h-7 bg-gray-200 dark:bg-dark-subtle rounded-md font-bold text-gray-600 dark:text-dark-text-body hover:bg-gray-300 dark:hover:bg-dark-border">-</button>
                                                <span className="font-bold w-6 text-center text-heading dark:text-dark-text-heading">{String(item.quantity).padStart(2, '0')}</span>
                                                <button onClick={() => handleQuantityChange(item.product.id!, 1)} className="w-7 h-7 bg-primary text-primary-fg rounded-md font-bold hover:brightness-110 transition-all duration-300">+</button>
                                            </div>
                                            <p className="font-bold text-heading dark:text-dark-text-heading">Total: ${( (item.product.price || 0) * item.quantity).toFixed(2)}</p>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       ))}
                    </div>
                </div>
                <footer className="pt-4 border-t border-border dark:border-dark-border">
                    <div className="bg-background dark:bg-dark-background rounded-xl p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <i className="ri-percent-line text-xl text-text-body dark:text-dark-text-body"></i>
                            <span className="font-semibold text-heading dark:text-dark-text-heading">Promo New User (10%)</span>
                        </div>
                        <button className="bg-primary-bg text-primary text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">Change Promo</button>
                    </div>
                    <div className="space-y-3 mt-4 text-heading dark:text-dark-text-heading">
                        <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Sub-Total</span><span className="font-semibold">${subTotal.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Tax (12%)</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Discount</span><span className="font-semibold text-red-500">${discount.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center font-bold text-lg"><span className="">Total Payment</span><span className="">${totalPayment.toFixed(2)}</span></div>
                    </div>
                    <div className="bg-background dark:bg-dark-background rounded-xl p-3 flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                            <i className="ri-mastercard-fill text-3xl text-orange-500"></i>
                            <span className="font-semibold text-heading dark:text-dark-text-heading">Credit Card</span>
                        </div>
                        <button className="text-sm font-bold text-text-body dark:text-dark-text-body hover:text-heading dark:hover:text-dark-text-heading transition-colors">Change Method <i className="ri-arrow-right-s-line align-middle"></i></button>
                    </div>
                    <button className="w-full bg-primary text-primary-fg font-bold text-lg py-4 rounded-xl mt-4 hover:brightness-110 transition-all duration-300">Continue</button>
                </footer>
            </div>
        </div>
    );
};

export default POSPage;
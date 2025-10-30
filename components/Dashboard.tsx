import React, { useState, useRef, useEffect } from 'react';
// FIX: Import XAxis and YAxis from recharts to resolve 'Cannot find name' errors.
import { AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Sector } from 'recharts';
import CustomDropdown from './CustomDropdown';
import FadeIn from './FadeIn';

// --- ICONS ---
const StatCardIconWrapper: React.FC<{ children: React.ReactNode, color: string, darkColor?: string }> = ({ children, color, darkColor }) => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10" style={{ backgroundColor: color+'1A' }}>
        <div className="text-xl" style={{ color }}>{children}</div>
    </div>
);

const NominalBalanceIcon = () => <StatCardIconWrapper color="#EC4899"><i className="ri-wallet-3-line"></i></StatCardIconWrapper>;
const TotalStockIcon = () => <StatCardIconWrapper color="#14B8A6"><i className="ri-archive-line"></i></StatCardIconWrapper>;
const NominalRevenueIcon = () => <StatCardIconWrapper color="#10B981"><i className="ri-money-dollar-circle-line"></i></StatCardIconWrapper>;
const NominalExpenseIcon = () => <StatCardIconWrapper color="#F59E0B"><i className="ri-bar-chart-2-line"></i></StatCardIconWrapper>;
const CustomerActivityIcon = () => <StatCardIconWrapper color="#F97316"><i className="ri-line-chart-line"></i></StatCardIconWrapper>;
const CustomersActiveIcon = () => <StatCardIconWrapper color="#14B8A6"><i className="ri-group-2-line"></i></StatCardIconWrapper>;

// --- DATA ---
const tinyChartData = Array.from({ length: 10 }, (_, i) => ({ v: Math.random() * 30 + (i > 5 ? 20 : 5) }));
const statCards = [
    { title: 'Nominal Balance', value: '7,500.00', unit: 'USD', change: 1.19, Icon: NominalBalanceIcon, chartColor: '#EC4899', data: tinyChartData.map(d=>({v: d.v + Math.random() * 10})) },
    { title: 'Total Stock Product', value: '3,142', unit: 'ITEMS', change: 0.29, Icon: TotalStockIcon, chartColor: '#3B8289', data: tinyChartData.map(d=>({v: d.v - Math.random() * 10})) },
    { title: 'Nominal Revenue', value: '21,430.00', unit: 'USD', change: 0.29, Icon: NominalRevenueIcon, chartColor: '#3B8289', data: tinyChartData.map(d=>({v: d.v + Math.random() * 15})) },
    { title: 'Nominal Expense', value: '12,980.00', unit: 'USD', change: -0.15, Icon: NominalExpenseIcon, chartColor: '#EF4444', data: tinyChartData.map(d=>({v: d.v - Math.random() * 5})) }
];
const productActivityData = [
    { name: 'To Be Packed', value: 110000, color: '#3B82F6' },
    { name: 'Process Delivery', value: 98000, color: '#F59E0B' },
    { name: 'Delivery Done', value: 140000, color: '#14B8A6' },
    { name: 'Returned', value: 67236, color: '#EC4899' },
];
const totalActivity = productActivityData.reduce((sum, item) => sum + item.value, 0);

const customerActivityData = [
    { name: 'Apr 2025', paid: 890, checkout: 1050 },
    { name: 'May 2025', paid: 1450, checkout: 1750 },
    { name: 'Jun 2025', paid: 1200, checkout: 1500 },
    { name: 'Jul 2025', paid: 900, checkout: 1300 },
    { name: 'Aug 2025', paid: 1000, checkout: 750 },
    { name: 'Sep 2025', paid: 1450, checkout: 1250 },
    { name: 'Oct 2025', paid: 1800, checkout: 1550 },
];

const customersActiveData = [
    { name: 'United Kingdom', flag: '🇬🇧', value: 12628, percentage: 80, color: '#3B8289' },
    { name: 'United States', flag: '🇺🇸', value: 10628, percentage: 70, color: '#F59E0B' },
    { name: 'Sweden', flag: '🇸🇪', value: 8628, percentage: 60, color: '#3B82F6' },
    { name: 'Turkey', flag: '🇹🇷', value: 6628, percentage: 40, color: '#A855F7' },
    { name: 'Spain', flag: '🇪🇸', value: 3628, percentage: 30, color: '#60A5FA' },
];

const transactionData = [
    { id: 'AR-47380416-61', product: 'Meta Quest 3', details: '512GB • White', price: 499, customer: 'Liam Smith', avatar: 'https://i.pravatar.cc/40?u=a', date: '02 Apr 2025, 8:15 am', payment: 'visa', last4: '4321', email: 'smith@example.com' },
    { id: 'AR-30631995-17', product: 'iPhone 15 Pro Max', details: '512GB • eSIM', price: 1399, customer: 'Lily Thompson', avatar: 'https://i.pravatar.cc/40?u=b', date: '06 Apr 2025, 6:45 pm', payment: 'mastercard', last4: '8890', email: 'thom@example.com' },
    { id: 'AR-79609316-32', product: 'MacBook Air M3 (13")', details: 'M3 chip • Ultra-light', price: 1299, customer: 'Lucas Young', avatar: 'https://i.pravatar.cc/40?u=c', date: '10 Apr 2025, 11:30 am', payment: 'visa', last4: '1023', email: 'young@example.com' },
    { id: 'AR-17288760-13', product: 'AirPods Pro', details: '2nd Gen • USB-C case', price: 229, customer: 'Isabella Garcia', avatar: 'https://i.pravatar.cc/40?u=d', date: '14 Apr 2025, 7:50 pm', payment: 'visa', last4: '5678', email: 'garcia@example.com' },
    { id: 'AR-24593385-96', product: 'Apple Vision Pro', details: 'AR Headset', price: 3499, customer: 'Amelia Davis', avatar: 'https://i.pravatar.cc/40?u=e', date: '18 Apr 2025, 9:05 am', payment: 'visa', last4: '3301', email: 'davis@example.com' },
    { id: 'AR-57722580-75', product: 'Oura Ring 4', details: 'Health Wearable', price: 399, customer: 'Caleb Turner', avatar: 'https://i.pravatar.cc/40?u=f', date: '22 Apr 2025, 10:10 pm', payment: 'stripe', last4: '9823', email: 'turner@example.com' },
];

const paymentIcons: {[key: string]: string} = {
    visa: 'https://js.wlead.net/assets/images/payment_methods/visa.svg',
    mastercard: 'https://js.wlead.net/assets/images/payment_methods/mastercard.svg',
    stripe: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg'
}

// --- SUB-COMPONENTS ---
const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-surface dark:bg-dark-surface p-6 rounded-2xl border border-border dark:border-dark-border ${className}`}>{children}</div>
);

const StatCard: React.FC<typeof statCards[0] & { isDarkMode: boolean }> = ({ title, value, unit, change, Icon, chartColor, data }) => {
    const [timeframe, setTimeframe] = useState('This Month');
    
    return (
    <Card>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Icon />
                <h3 className="font-semibold text-text-body dark:text-dark-text-body">{title}</h3>
            </div>
             <CustomDropdown 
                label=""
                options={['Today', 'This Week', 'This Month']}
                value={timeframe}
                onSelect={setTimeframe}
                buttonClass="h-9 px-3 rounded-lg"
                dropdownClass="origin-top-right right-0 w-36"
            />
        </div>
        <div className="mt-4">
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-heading dark:text-dark-text-heading">{value}</p>
                {unit && <span className="text-sm font-medium text-text-body dark:text-dark-text-body">{unit}</span>}
            </div>
            <div className="flex items-end justify-between mt-2">
                <div className={`flex items-center gap-2 text-sm font-semibold ${change > 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${change > 0 ? 'bg-brand-green/10' : 'bg-brand-red/10'}`}>
                      <i className={`ri-arrow-${change > 0 ? 'up' : 'down'}-line`}></i>
                    </div>
                    <span>{Math.abs(change)}%</span>
                </div>
                <div className="w-24 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`grad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={chartColor} stopOpacity={change > 0 ? 0.3 : 0.2} />
                                    <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke={chartColor} strokeWidth={2} fill={`url(#grad-${title.replace(/\s+/g, '')})`} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </Card>
)};


const ProductActivity: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const [activeFilter, setActiveFilter] = useState('1M');
    const [activeIndex, setActiveIndex] = useState<number>();

    const onPieEnter = (_:any, index:number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };
    
    const renderActiveShape = (props: any) => {
      const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
      return (
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={8}
        />
      );
    };

    const CustomPieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-heading dark:bg-dark-subtle text-white dark:text-dark-text-heading p-3 rounded-lg shadow-lg text-sm min-w-[120px]">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.fill }}></div>
                            <span>{data.name}</span>
                        </div>
                        <strong>{data.value.toLocaleString()}</strong>
                    </div>
                </div>
            );
        }
        return null;
    };


    return (
        <Card className="h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 flex-shrink-0">
                <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Product Activity</h2>
                <CustomDropdown
                    label=""
                    options={['1W', '1M', '3W', 'YTD', 'Total']}
                    value={activeFilter}
                    onSelect={setActiveFilter}
                    buttonClass="h-9 px-4 rounded-lg bg-gray-100 dark:bg-dark-background"
                    dropdownClass="origin-top-right right-0 w-36"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1">
                <div className="relative h-64 md:h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={productActivityData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius="75%" 
                                outerRadius="100%" 
                                startAngle={90} 
                                endAngle={450} 
                                cornerRadius={8} 
                                paddingAngle={2}
                                // FIX: Suppress TypeScript error for the 'activeIndex' prop. It is a valid prop for Recharts' Pie component but is missing from the current type definitions.
                                // @ts-ignore
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                onMouseEnter={onPieEnter}
                                onMouseLeave={onPieLeave}
                                isAnimationActive={true}
                                animationDuration={400}
                            >
                                {productActivityData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} stroke="none" />)}
                            </Pie>
                            <Tooltip 
                                content={<CustomPieTooltip />} 
                                cursor={{ fill: 'transparent' }} 
                                isAnimationActive={true}
                                animationDuration={300}
                                animationEasing="ease-in-out"
                                wrapperStyle={{ zIndex: 9999 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-4xl font-bold text-heading dark:text-dark-text-heading">{totalActivity.toLocaleString()}</p>
                        <p className="text-text-body dark:text-dark-text-body">Total Activity</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {productActivityData.map(item => (
                        <div key={item.name} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                <span className="font-medium text-text-body dark:text-dark-text-body">{item.name}</span>
                            </div>
                            <span className="font-bold text-heading dark:text-dark-text-heading">{item.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

const CustomerActivity: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const paidColor = '#3B82F6';
    const checkoutColor = '#60A5FA';

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const paidPayload = payload.find(p => p.dataKey === 'paid');
            const checkoutPayload = payload.find(p => p.dataKey === 'checkout');
            if (!paidPayload || !checkoutPayload) return null;

            return (
                <div className="bg-heading dark:bg-dark-subtle text-white dark:text-dark-text-heading p-3 rounded-lg shadow-lg text-sm min-w-[120px]">
                    <p className="font-bold mb-2">Activity</p>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: paidColor }}></div>
                                <span>Paid</span>
                            </div>
                            <strong>{paidPayload.value}</strong>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                           <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: checkoutColor }}></div>
                               <span>Checkout</span>
                           </div>
                           <strong>{checkoutPayload.value}</strong>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <CustomerActivityIcon />
                    <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Customers Activity</h2>
                </div>
                <div className="flex items-center gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-2 text-text-body dark:text-dark-text-body"><span className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: paidColor}}></span>Paid product</div>
                    <div className="flex items-center gap-2 text-text-body dark:text-dark-text-body"><span className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor: checkoutColor}}></span>Checkout Product</div>
                </div>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                        data={customerActivityData} 
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }} 
                    >
                         <defs>
                            <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={paidColor} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={paidColor} stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorCheckout" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={checkoutColor} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={checkoutColor} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#A1A1AA' : '#6B7280', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#A1A1AA' : '#6B7280', fontSize: 12 }} ticks={[500, 1000, 1500, 2000]} domain={[0, 2200]}/>
                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }} 
                            isAnimationActive={true}
                            animationDuration={300}
                            animationEasing="ease-in-out"
                            wrapperStyle={{ zIndex: 9999 }}
                        />
                        
                        <Area type="monotone" dataKey="paid" stroke={paidColor} strokeWidth={2.5} fillOpacity={1} fill="url(#colorPaid)" activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }} />
                        <Area type="monotone" dataKey="checkout" stroke={checkoutColor} strokeWidth={2.5} fillOpacity={1} fill="url(#colorCheckout)" activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

const ProgressBar: React.FC<{ percentage: number, color: string }> = ({ percentage, color }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(percentage);
        }, 150);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="w-full bg-gray-100 dark:bg-dark-subtle rounded-full h-2">
            <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${width}%`, backgroundColor: color }}
            ></div>
        </div>
    );
};

const CustomersActive = () => (
    <Card>
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <CustomersActiveIcon />
                <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Customers Active</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-primary">View All <i className="ri-arrow-right-s-line align-middle"></i></a>
        </div>
        <div className="space-y-5">
            {customersActiveData.map(customer => (
                <div key={customer.name}>
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-2 text-sm gap-y-1 md:gap-x-4">
                        <div className="flex items-center gap-2 font-medium text-heading dark:text-dark-text-heading">
                            <span>{customer.flag}</span>
                            <span>{customer.name}</span>
                        </div>
                        <span className="font-semibold text-text-body dark:text-dark-text-body">{customer.value.toLocaleString()} ({customer.percentage}%)</span>
                    </div>
                    <ProgressBar percentage={customer.percentage} color={customer.color} />
                </div>
            ))}
        </div>
    </Card>
);

const RecentTransaction: React.FC<{isDarkMode: boolean}> = ({ isDarkMode }) => {
    const [openRow, setOpenRow] = useState<string | null>(null);

    return (
        <Card>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                <h2 className="text-lg font-bold text-heading dark:text-dark-text-heading">Recent Transaction <span className="text-sm font-medium text-text-body dark:text-dark-text-body ml-2">24</span></h2>
                <div className="flex items-center gap-2 text-sm text-text-body dark:text-dark-text-body flex-wrap">
                    <button className="flex items-center gap-2 hover:text-heading dark:hover:text-dark-text-heading"><i className="ri-search-line text-base"></i> <span className="hidden md:inline">Search</span></button>
                    <button className="flex items-center gap-2 hover:text-heading dark:hover:text-dark-text-heading"><i className="ri-eye-off-line text-base"></i> <span className="hidden md:inline">Hide</span></button>
                    <button className="flex items-center gap-2 hover:text-heading dark:hover:text-dark-text-heading"><i className="ri-settings-3-line text-base"></i> <span className="hidden md:inline">Customize</span></button>
                    <button className="flex items-center gap-2 border border-border dark:border-dark-border px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-subtle">
                        <i className="ri-download-2-line text-base"></i> <span className="hidden md:inline">Export</span> <i className="ri-arrow-down-s-line hidden md:inline"></i>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-text-body dark:text-dark-text-body">
                        <tr className="border-b border-border dark:border-dark-border">
                            <th className="px-4 py-3 font-medium"></th>
                            <th className="px-4 py-3 font-medium">ORDER ID</th>
                            <th className="px-4 py-3 font-medium">PRODUCT ITEM</th>
                            <th className="px-4 py-3 font-medium">PRICE</th>
                            <th className="px-4 py-3 font-medium hidden lg:table-cell">CUSTOMER</th>
                            <th className="px-4 py-3 font-medium hidden lg:table-cell">DATE CHECKOUT</th>
                            <th className="px-4 py-3 font-medium hidden lg:table-cell">PAYMENT METHOD</th>
                            <th className="px-4 py-3 font-medium hidden lg:table-cell">EMAIL</th>
                        </tr>
                    </thead>
                    <tbody className="text-heading dark:text-dark-text-heading">
                        {transactionData.map(tx => (
                            <tr key={tx.id} className="border-b border-border dark:border-dark-border last:border-0">
                                <td className="px-4 py-4 w-12">
                                    <button onClick={() => setOpenRow(openRow === tx.id ? null : tx.id)} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-dark-subtle flex items-center justify-center">
                                        <i className={`ri-arrow-down-s-line transition-transform ${openRow === tx.id ? 'rotate-180' : ''}`}></i>
                                    </button>
                                </td>
                                <td className="px-4 py-4 font-semibold text-primary">{tx.id}</td>
                                <td className="px-4 py-4">
                                    <p className="font-semibold">{tx.product}</p>
                                    <p className="text-xs text-text-body dark:text-dark-text-body">{tx.details}</p>
                                </td>
                                <td className="px-4 py-4 font-semibold">${tx.price.toLocaleString()}</td>
                                <td className="px-4 py-4 hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                        <img src={tx.avatar} alt={tx.customer} className="w-8 h-8 rounded-full" />
                                        <span className="font-medium">{tx.customer}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 hidden lg:table-cell">{tx.date}</td>
                                <td className="px-4 py-4 hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                        <img src={paymentIcons[tx.payment]} alt={tx.payment} className="h-4"/>
                                        <span>•••• {tx.last4}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 hidden lg:table-cell">{tx.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

// --- MAIN COMPONENT ---
const Dashboard: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    return (
        <FadeIn>
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {statCards.map(card => <StatCard key={card.title} {...card} isDarkMode={isDarkMode} />)}
                    </div>
                    <div className="lg:col-span-1">
                         <ProductActivity isDarkMode={isDarkMode} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <CustomerActivity isDarkMode={isDarkMode} />
                    </div>
                    <div>
                        <CustomersActive />
                    </div>
                </div>

                <div>
                    <RecentTransaction isDarkMode={isDarkMode} />
                </div>
            </div>
        </FadeIn>
    );
};

export default Dashboard;
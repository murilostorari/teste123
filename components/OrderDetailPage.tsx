import React from 'react';
import { OrderDashboardData } from '../types';
import FadeIn from './FadeIn';

interface OrderDetailPageProps {
    order: OrderDashboardData | null;
    onBack: () => void;
}

// Reusable Card Component
const Card: React.FC<{ children: React.ReactNode, className?: string, noPadding?: boolean }> = ({ children, className, noPadding }) => (
    <div className={`bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border ${noPadding ? '' : 'p-6'} ${className}`}>
        {children}
    </div>
);

const getDeliveryStatusClass = (status: OrderDashboardData['deliveryStatus'] | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
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

const getDeliveryStatusIcon = (status: OrderDashboardData['deliveryStatus'] | undefined) => {
    if (!status) return 'ri-question-mark';
    switch (status) {
        case 'Retirada': return 'ri-store-2-line';
        case 'Enviada': return 'ri-truck-line';
        case 'Por embalar': return 'ri-loader-3-line';
        default: return 'ri-question-mark';
    }
}


// Header Component
const PageHeader: React.FC<{ order: OrderDashboardData | null; onBack: () => void; }> = ({ order, onBack }) => (
    <header className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
      <div className="flex items-start gap-4">
        <button onClick={onBack} className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white dark:bg-dark-surface rounded-full text-xl hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors border border-border dark:border-dark-border mt-1">
          <i className="ri-arrow-left-line"></i>
        </button>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-heading dark:text-dark-text-heading">Pedido-{order?.id.substring(1)}</h1>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">
              <i className="ri-check-fill"></i> {order?.status}
            </span>
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium ${getDeliveryStatusClass(order?.deliveryStatus)}`}>
                <i className={`${getDeliveryStatusIcon(order?.deliveryStatus)}`}></i> {order?.deliveryStatus}
            </span>
          </div>
          <p className="text-sm text-text-body dark:text-dark-text-body mt-1">
            Data do pedido {order?.date}・Pedido de <a href="#" className="font-medium text-heading dark:text-dark-text-heading underline">{order?.customer.name}</a>・Comprado via loja online
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 text-sm self-end sm:self-auto">
        <div className="flex items-center gap-2">
          <a href="#" className="font-semibold text-heading dark:text-dark-text-heading hover:underline">Relatório</a>
          <span className="text-text-body dark:text-dark-text-body">・</span>
          <a href="#" className="font-semibold text-heading dark:text-dark-text-heading hover:underline">Duplicar</a>
          <span className="text-text-body dark:text-dark-text-body">・</span>
          <a href="#" className="font-semibold text-heading dark:text-dark-text-heading hover:underline">Compartilhar Pedido</a>
          <div className="flex items-center rounded-lg border border-border dark:border-dark-border ml-2">
            <button className="w-8 h-8 flex items-center justify-center border-r border-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-subtle"><i className="ri-arrow-left-s-line"></i></button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-dark-subtle"><i className="ri-arrow-right-s-line"></i></button>
          </div>
        </div>
        <span className="text-xs text-text-body dark:text-dark-text-body mt-1 pr-12">Pedido 12.567 de 32.068</span>
      </div>
    </header>
);

const ProductsCard: React.FC<{ deliveryStatus: OrderDashboardData['deliveryStatus'] | undefined }> = ({ deliveryStatus }) => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-heading dark:text-dark-text-heading">Produtos</h3>
             <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium ${getDeliveryStatusClass(deliveryStatus)}`}>
                <i className={`${getDeliveryStatusIcon(deliveryStatus)}`}></i> {deliveryStatus}
            </span>
        </div>
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <div className="bg-gray-100 dark:bg-dark-subtle rounded-lg p-1 border border-border dark:border-dark-border">
                    <img src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100" alt="Macbook" className="w-14 h-14 rounded-md object-cover"/>
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-heading dark:text-dark-text-heading text-base">Macbook Pro 14 Inch 512GB M1 Pro</p>
                    <p className="text-sm text-text-body dark:text-dark-text-body">SKU: Mac-1000</p>
                    <p className="text-sm text-text-body dark:text-dark-text-body">Cinza・Quantidade 1</p>
                </div>
                <p className="font-semibold text-heading dark:text-dark-text-heading text-base">R$1.659,25</p>
            </div>
            <div className="flex items-start gap-4">
                 <div className="bg-gray-100 dark:bg-dark-subtle rounded-lg p-1 border border-border dark:border-dark-border">
                    <img src="https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Display" className="w-14 h-14 rounded-md object-cover"/>
                 </div>
                <div className="flex-1">
                    <p className="font-semibold text-heading dark:text-dark-text-heading text-base">APPLE 32” R6KD Pro Display XDR MWPF2ID/A</p>
                    <p className="text-sm text-text-body dark:text-dark-text-body">SKU: Mac-5006</p>
                    <p className="text-sm text-text-body dark:text-dark-text-body">Prata・Quantidade 1</p>
                    <a href="#" className="text-sm text-primary underline font-semibold mt-1 inline-block">Item Reservado</a>
                </div>
                <p className="font-semibold text-heading dark:text-dark-text-heading text-base">R$5.848,77</p>
            </div>
        </div>
    </Card>
);

const PaymentDetailsCard = () => (
    <Card className="text-base">
        <h3 className="font-bold text-lg text-heading dark:text-dark-text-heading mb-4 flex items-center gap-2">Detalhes do Pagamento 
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"><i className="ri-check-fill"></i> Pago</span>
        </h3>
        <div className="space-y-3">
            <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Método de Pagamento</span> <span className="font-medium text-heading dark:text-dark-text-heading flex items-center gap-2"><img src="https://js.wlead.net/assets/images/payment_methods/visa.svg" className="h-4"/> VISA #3634</span></div>
            <div className="flex justify-between items-start"><span className="text-text-body dark:text-dark-text-body">Subtotal</span><div className="text-right"><span className="font-medium text-heading dark:text-dark-text-heading">2 itens</span><br/><span className="font-medium text-heading dark:text-dark-text-heading">R$7.508,02</span></div></div>
            <div className="flex justify-between items-start"><span className="text-text-body dark:text-dark-text-body">Tipo de Envio</span> <span className="font-medium text-heading dark:text-dark-text-heading text-right max-w-[50%]">O cliente selecionou Frete Grátis (R$0,00) no checkout</span></div>
            <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Taxa de Envio</span> <span className="font-medium text-heading dark:text-dark-text-heading">R$20,00</span></div>
            <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Imposto</span> <span className="font-medium text-heading dark:text-dark-text-heading">10%</span></div>
            <div className="flex justify-between items-center"><span className="text-text-body dark:text-dark-text-body">Desconto</span> <span className="font-medium text-heading dark:text-dark-text-heading">R$0,00</span></div>
            <div className="flex justify-between items-center font-bold text-base pt-3 border-t border-border dark:border-dark-border mt-2"><span className="text-heading dark:text-dark-text-heading">Total</span> <span className="text-heading dark:text-dark-text-heading">R$8.092,90</span></div>
        </div>
    </Card>
);

// Right Sidebar card - using the single merged card approach now
const SidebarInfo: React.FC<{order: OrderDashboardData | null, isPickup: boolean}> = ({ order, isPickup }) => (
    <Card noPadding>
        {/* Customer Section */}
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={order?.customer.avatarUrl} alt={order?.customer.name} className="w-16 h-16 rounded-full"/>
                    <div>
                        <p className="font-semibold text-lg text-heading dark:text-dark-text-heading">{order?.customer.name}</p>
                        <p className="text-lg text-text-body dark:text-dark-text-body">Total: 2 pedidos</p>
                    </div>
                </div>
                <button className="text-text-body dark:text-dark-text-body border border-border dark:border-dark-border rounded-lg w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-subtle">
                    <i className="ri-chat-1-line text-xl"></i>
                </button>
            </div>
        </div>

        {/* Shipping Address Section */}
        {!isPickup && (
            <div className="p-6 border-t border-border dark:border-dark-border">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-heading dark:text-dark-text-heading text-lg">Endereço de Entrega</h3>
                    <button className="text-text-body dark:text-dark-text-body hover:text-heading">
                        <i className="ri-pencil-line text-xl"></i>
                    </button>
                </div>
                <div className="relative mb-4">
                    <img src="https://i.imgur.com/gKj4p4j.png" alt="Map" className="w-full h-24 rounded-lg object-cover"/>
                </div>
                <div>
                    <div className="flex justify-between items-start">
                        <p className="font-semibold text-heading dark:text-dark-text-heading text-lg">{order?.customer.name}</p>
                        <a href="#" className="font-semibold text-primary underline text-base flex-shrink-0 ml-4">Ver no Mapa</a>
                    </div>
                    <p className="text-text-body dark:text-dark-text-body mt-1 text-base leading-relaxed">
                        2118 Thornridge Cir. Syracuse,<br/>
                        Connecticut 35624<br/>
                        United States
                    </p>
                </div>
            </div>
        )}

        {/* Contact Information Section */}
        <div className="p-6 border-t border-border dark:border-dark-border">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-heading dark:text-dark-text-heading text-lg">Informações de Contato</h3>
                <button className="text-text-body dark:text-dark-text-body hover:text-heading">
                    <i className="ri-pencil-line text-xl"></i>
                </button>
            </div>
            <div className="space-y-2">
                <a href="mailto:bagus.fikri@mail.com" className="font-semibold text-blue-600 dark:text-blue-400 text-base block border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg text-center hover:bg-blue-100 dark:hover:bg-blue-900/80">bagus.fikri@mail.com</a>
                <a href="tel:+221789907" className="font-semibold text-blue-600 dark:text-blue-400 text-base block border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg text-center hover:bg-blue-100 dark:hover:bg-blue-900/80">+(22)-789-907</a>
            </div>
        </div>

        {/* Tags Section */}
        <div className="p-6 border-t border-border dark:border-dark-border">
            <h3 className="font-semibold text-heading dark:text-dark-text-heading text-lg mb-2">Etiquetas</h3>
            <input type="text" placeholder="Adicionar etiquetas ao pedido" className="w-full text-base h-12 px-4 border border-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-dark-surface"/>
            <p className="text-sm mt-2 text-text-body dark:text-dark-text-body">Se algo parece estar faltando ou incorreto, entre em contato com nosso <a href="#" className="text-primary underline">Especialista de Suporte ao Cliente</a></p>
        </div>
    </Card>
);

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ order, onBack }) => {
    const isPickup = order?.deliveryMethod === 'Pickup';
    const hasNote = !!order?.note;
    
    if (!order) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Pedido não encontrado. <button onClick={onBack} className="text-primary underline">Voltar para a lista de pedidos.</button></p>
            </div>
        );
    }
    
    return (
        <FadeIn>
            <div className="bg-white dark:bg-dark-surface min-h-full -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 font-sans">
                <div className="max-w-7xl mx-auto">
                    <PageHeader order={order} onBack={onBack} />
                    <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <ProductsCard deliveryStatus={order.deliveryStatus}/>
                            <PaymentDetailsCard />
                        </div>
                        {/* Right Sidebar */}
                        <aside className="lg:col-span-1 space-y-6">
                            {hasNote && (
                                <Card className="bg-[#FFFBF5] dark:bg-orange-900/10 border-[#FBEFDE] dark:border-orange-800/20">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-heading dark:text-dark-text-heading text-base">Nota do Pedido</h3>
                                        <button className="text-text-body dark:text-dark-text-body text-xl"><i className="ri-pencil-line"></i></button>
                                    </div>
                                    <p className="text-base text-text-body dark:text-dark-text-body">{order.note}</p>
                                </Card>
                            )}
                            <SidebarInfo order={order} isPickup={isPickup} />
                        </aside>
                    </main>
                </div>
            </div>
        </FadeIn>
    );
};

export default OrderDetailPage;
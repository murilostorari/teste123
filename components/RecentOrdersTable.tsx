
import React from 'react';
import { OrderData } from '../types';
import { IconProps } from './icons/IconProps';

// ICONS
const SearchIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const DownloadIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6667 12.5V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.866 17.3244 15.442 17.5 15 17.5H5.00001C4.55798 17.5 4.13406 17.3244 3.82149 17.0118C3.50893 16.6993 3.33334 16.2754 3.33334 15.8333V12.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.83331 8.33337L9.99998 12.5L14.1666 8.33337" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12.5V2.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CalendarIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="4.16663" width="15" height="13.3333" rx="2" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.3333 1.66663V4.16663" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.66669 1.66663V4.16663" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 8.33337H17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronDownIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SortIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.83331H10" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 10H7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 14.1667H7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.5 16.6667V3.33331" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 14.1667L12.5 16.6667L10 14.1667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const FilterIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6667 2.5H3.33333L8.33333 9.35833V14.1667L11.6667 16.6667V9.35833L16.6667 2.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const MoreHorizontalIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1.66667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="4.16669" r="1.66667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="15.8333" r="1.66667" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CheckIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>;


const CustomCheckbox = () => (
    <div className="relative flex items-center justify-center w-4 h-4">
        <input 
            type="checkbox" 
            className="peer appearance-none h-4 w-4 rounded border border-gray-300 dark:border-dark-border checked:bg-brand-green checked:border-brand-green focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-green transition-colors duration-200" 
        />
        <CheckIcon className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none" />
    </div>
);


interface RecentOrdersTableProps {
  data: OrderData[];
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ data }) => {
  const getStatusClass = (status: OrderData['status']) => {
    switch(status) {
      case 'Entregue': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'Pendente': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
      case 'Cancelado': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-heading dark:text-dark-text-heading">Pedidos Recentes</h2>
        <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-sm font-medium text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors duration-200">
                <span>Exportar CSV</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-sm font-medium text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors duration-200">
                <CalendarIcon className="w-4 h-4" />
                <span>10 Jan, 2025 - 16 Jan, 2025</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-sm font-medium text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors duration-200">
                <span>Status Recente</span>
                <ChevronDownIcon className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-sm font-medium text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors duration-200">
                <SortIcon className="w-4 h-4" />
                <span>Ordenar</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-border dark:border-dark-border rounded-lg text-sm font-medium text-text-body dark:text-dark-text-body hover:bg-gray-100 dark:hover:bg-dark-subtle transition-colors duration-200">
                <FilterIcon className="w-4 h-4" />
                <span>Filtros</span>
            </button>
        </div>
      </div>
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Buscar pedidos recentes..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-dark-surface text-heading dark:text-dark-text-heading placeholder-text-body dark:placeholder-dark-text-body border border-gray-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all duration-200" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-text-body dark:text-dark-text-body">
          <thead className="text-xs text-gray-500 dark:text-dark-text-body uppercase bg-gray-50 dark:bg-dark-surface/50">
            <tr>
              <th scope="col" className="p-4 w-12"><CustomCheckbox /></th>
              <th scope="col" className="px-6 py-3">ID do Pedido</th>
              <th scope="col" className="px-6 py-3">Nome do Produto</th>
              <th scope="col" className="px-6 py-3">Nome do Cliente</th>
              <th scope="col" className="px-6 py-3">Quantidade</th>
              {/* FIX: Corrected typo from py_3 to py-3 for Tailwind CSS class. */}
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Data do Pedido</th>
              <th scope="col" className="px-6 py-3">Data de Entrega</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id} className="bg-white dark:bg-dark-surface border-b dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-subtle">
                <td className="p-4"><CustomCheckbox /></td>
                <td className="px-6 py-4 font-medium text-heading dark:text-dark-text-heading">{order.id}</td>
                <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <img src={order.productImage} alt={order.productName} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-heading dark:text-dark-text-heading">{order.productName}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                         { order.customerName === 'Emma Brown' ? (
                            <img src="https://picsum.photos/id/40/24/24" alt={order.customerName} className="w-6 h-6 rounded-full" />
                         ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-subtle flex items-center justify-center text-xs font-bold text-gray-500 dark:text-dark-text-body">{order.customerInitials}</div>
                         )}
                        <div>
                            <p className="font-medium text-heading dark:text-dark-text-heading">{order.customerName}</p>
                            <p className="text-gray-500 dark:text-dark-text-body text-xs">{order.customerLocation}</p>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">{order.quantity} pcs</td>
                <td className="px-6 py-4 font-medium text-heading dark:text-dark-text-heading">R${order.total.toFixed(2).replace('.', ',')}</td>
                <td className="px-6 py-4">{order.orderDate}</td>
                <td className="px-6 py-4">{order.deliveryDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                    ● {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                    <button>
                        <MoreHorizontalIcon className="w-5 h-5 -rotate-90 text-gray-500 dark:text-dark-text-body" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
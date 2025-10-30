import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './Sidebar';
import Dashboard from './Dashboard';
import CustomersPage from './CustomersPage';
import ProductsPage from './ProductsPage';
import ProductEditPage from './ProductEditPage';
import { InventoryRowData, OrderDashboardData } from '../types';
import POSPage from './POSPage';
import OrdersPage from './OrdersPage';
import OrderDetailPage from './OrderDetailPage';

interface DashboardAppProps {
    onNavigateToHome: () => void;
}

const DashboardApp: React.FC<DashboardAppProps> = ({ onNavigateToHome }) => {
  const [activePage, setActivePage] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState<InventoryRowData | null>(null);
  const [viewingOrder, setViewingOrder] = useState<OrderDashboardData | null>(null);

  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const originalFontSize = htmlElement.style.fontSize;
    // Set font-size to 80% to scale down the UI, as requested by the user.
    htmlElement.style.fontSize = '80%';

    // Cleanup function to restore the original font size when the component unmounts.
    return () => {
        htmlElement.style.fontSize = originalFontSize;
    };
  }, []); // Run only once on mount and unmount

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleEditProduct = (product: InventoryRowData) => {
    setEditingProduct(product);
    setActivePage('product-edit');
  };

  const handleBackToProducts = () => {
    setEditingProduct(null);
    setActivePage('products');
  };

  const handleViewOrder = (order: OrderDashboardData) => {
    setViewingOrder(order);
    setActivePage('order-detail');
  };

  const handleBackToOrders = () => {
    setViewingOrder(null);
    setActivePage('orders');
  };
  
  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <Dashboard isDarkMode={isDarkMode} />;
      case 'products':
        return <ProductsPage onAddProduct={() => setActivePage('product-add')} onEditProduct={handleEditProduct} />;
      case 'product-add':
        return <ProductEditPage mode="add" onBack={handleBackToProducts} isDarkMode={isDarkMode} />;
      case 'product-edit':
        return <ProductEditPage mode="edit" product={editingProduct} onBack={handleBackToProducts} isDarkMode={isDarkMode}/>;
      case 'orders':
        return <OrdersPage onViewOrder={handleViewOrder} />;
      case 'order-detail':
        return <OrderDetailPage order={viewingOrder} onBack={handleBackToOrders} />;
      case 'audience':
        return <CustomersPage />;
      case 'pos':
        return <POSPage />;
      default:
        return (
            <div className="p-8">
                {/* FIX: Corrected typo from `active-page` to `activePage` to correctly reference the state variable. */}
                <h1 className="text-3xl font-semibold text-heading">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
                <p className="text-text-body">Esta página ainda não foi implementada.</p>
            </div>
        );
    }
  };

  return (
    <div className="relative flex h-screen text-heading dark:text-dark-text-heading font-sans overflow-hidden bg-background dark:bg-dark-background">
       {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      <DashboardSidebar
        activePage={activePage} 
        onNavigate={(page) => {
          setActivePage(page);
          setIsMobileSidebarOpen(false); // Close mobile sidebar on navigation
        }} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-dark-background">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 h-full">
                {renderPage()}
            </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardApp;
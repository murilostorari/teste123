
import React, { useState } from 'react';
import HomePage from './HomePage';
import ShopPage from './ShopPage';
import ProductDetailsPage from './ProductDetailsPage';
import DashboardApp from './DashboardApp';
import { ProductData } from '../types';

type ActiveView = 'home' | 'shop' | 'productDetail' | 'dashboard';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const handleNavigateToDashboard = () => {
    setActiveView('dashboard');
  };

  const handleNavigateToShop = () => {
    setActiveView('shop');
  };
  
  const handleNavigateToHome = () => {
    setActiveView('home');
    setSelectedProduct(null);
  };

  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setActiveView('productDetail');
  };

  const navigationProps = {
    onNavigateToDashboard: handleNavigateToDashboard,
    onNavigateToShop: handleNavigateToShop,
    onNavigateToHome: handleNavigateToHome,
    onProductClick: handleProductClick,
  };
  
  const renderContent = () => {
      switch (activeView) {
        case 'dashboard':
          return <DashboardApp onNavigateToHome={handleNavigateToHome} />;
        case 'shop':
          // FIX: Pass the correctly typed `activeView` prop to resolve type mismatch.
          return <ShopPage {...navigationProps} activeView={activeView} />;
        case 'productDetail':
          if (selectedProduct) {
            // FIX: Pass the correctly typed `activeView` prop to resolve type mismatch.
            return <ProductDetailsPage {...navigationProps} product={selectedProduct} activeView={activeView} />;
          }
          // FIX: Pass the correctly typed `activeView` prop to resolve type mismatch.
          return <HomePage {...navigationProps} activeView={'home'} />;
        case 'home':
        default:
          // FIX: Pass the correctly typed `activeView` prop to resolve type mismatch.
          return <HomePage {...navigationProps} activeView={activeView} />;
      }
  }

  return renderContent();
};

export default App;
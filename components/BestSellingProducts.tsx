
import React from 'react';
import { ProductData } from '../types';

interface BestSellingProductsProps {
  data: ProductData[];
}

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold text-heading mb-4">Produtos Mais Vendidos</h2>
      <div className="flex flex-col justify-between flex-1 space-y-4">
        {data.map((product) => (
          <div key={product.name} className="flex items-center space-x-4">
            <div className="bg-gray-light p-2 rounded-xl flex-shrink-0">
              <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-between self-stretch py-1">
              <div>
                <p className="font-medium text-heading text-sm">{product.name}</p>
                <p className="text-xs text-text-body">{product.quantitySold} vendidos</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-brand-green h-1.5 rounded-full"
                    style={{ width: `${product.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-text-body font-medium w-8 text-right">{product.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
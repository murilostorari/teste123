import React from 'react';

interface ProductCardProps {
  discount?: number;
  imageUrl: string;
  name: string;
  price?: number;
  compareAtPrice?: number;
  rating: number;
  onClick?: () => void;
  seller?: {
    name: string;
    avatarUrl: string;
  };
  distance?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ discount, imageUrl, name, price, compareAtPrice, rating, onClick, seller, distance }) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-square bg-background rounded-2xl overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {discount && (
          <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold py-1.5 px-4 rounded-full">
            {discount}% off
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="font-semibold text-lg text-heading truncate">{name}</h3>
        
        {seller && (
          <div className="flex items-center gap-2 mt-2 text-sm">
              <img src={seller.avatarUrl} alt={seller.name} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
              <p className="font-medium text-text-body truncate min-w-0">{seller.name}</p>
              {distance !== undefined && (
                  <span className="bg-primary-bg text-primary text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                      {distance.toFixed(1)}km
                  </span>
              )}
          </div>
        )}
        
        <div className="flex justify-between items-end mt-3">
          <div>
            {compareAtPrice && (
              <p className="text-xs text-text-body line-through sm:hidden">
                R${compareAtPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <div className="flex items-baseline gap-2">
              {price !== undefined && (
                <p className="text-lg font-semibold text-heading">
                  R${price.toFixed(2).replace('.', ',')}
                </p>
              )}
              {compareAtPrice && (
                <p className="hidden sm:block text-sm text-text-body line-through">
                  R${compareAtPrice.toFixed(2).replace('.', ',')}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
              <i className="ri-star-s-fill text-secondary text-lg"></i>
              <span className="font-bold text-heading text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
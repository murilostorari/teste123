// FIX: Replaced placeholder content with actual type definitions.
export interface StatCardData {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  period?: string;
}

export interface SalesData {
  name: string;
  // FIX: Changed property names from English to Portuguese to match the data provided in Dashboard.tsx.
  'Este Ano': number;
  'Ano Passado': number;
}

export interface ProductData {
  id?: number;
  name: string;
  imageUrl: string;
  sku?: string;
  category?: string;
  price?: number;
  stock?: number;
  // FIX: Changed status enum from English to Portuguese to match the data provided in ProductsPage.tsx.
  status?: 'Publicado' | 'Rascunho';
  percentage?: number;
  quantitySold?: number;
  brandName?: string;
  compareAtPrice?: number;
  quantity?: number;
  skuNumber?: string;
  stockStatus?: string;
  description?: string;
  // FIX: Added optional discount property to allow products to have a discount value.
  discount?: number;
  seller?: {
    name: string;
    avatarUrl: string;
  };
  distance?: number;
  size?: number;
  color?: string;
}

export interface DashboardProductData {
  id: number;
  checked: boolean;
  initials: string;
  avatarBg: string;
  avatarFg: string;
  name: string;
  description: string;
  stock: number;
  price: string;
  netWeight: string;
  category: string;
}

export interface ProductRowData {
    id: number;
    checked: boolean;
    name: string;
    imageUrl: string;
    sku: string;
    status: 'Active' | 'Draft' | 'Archived';
    tags: {type: 'text' | 'icon', label: string}[];
    retailPrice: string;
    wholesalePrice: string;
    stock: number;
    stockLevel: 'High' | 'Low' | 'Out of stock';
    variantsCount?: number;
}

export interface InventoryRowData {
    id: number;
    checked: boolean;
    name: string;
    imageUrl: string;
    sku: string;
    category: string;
    supplier: {
        name: string;
        logoUrl: string;
    };
    stock: number;
    stockLevel: 'High' | 'Low' | 'Out of stock' | 'Empty';
    unitPrice: number;
}


export interface OrderData {
  id: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerInitials: string;
  customerLocation: string;
  quantity: number;
  total: number;
  orderDate: string;
  deliveryDate: string;
  // FIX: Changed status enum from English to Portuguese to match the data provided in Dashboard.tsx and used in RecentOrdersTable.tsx.
  status: 'Entregue' | 'Pendente' | 'Cancelado';
}

export interface CustomerData {
  id: number;
  checked: boolean;
  name: string;
  avatar: string;
  phone: string;
  caseRef: string;
  openedAt: string;
  doa: string;
  source: string;
  serviceProvider: string;
  services: string[];
  amount: number;
}

export interface CustomerDashboardData {
  id: string;
  name: string;
  avatarUrl: string;
  orders: number;
  totalOrder: number;
  avgOrderValue: number;
  status: 'Active' | 'Inactive';
  lastOrder: string;
  checked: boolean;
}

export interface OrderDashboardData {
  id: string;
  customer: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  status: 'Pendente' | 'Pago' | 'Cancelada' | 'Arquivada';
  total: number;
  items: number;
  delivery: 'Grátis' | 'N/A' | string;
  deliveryStatus: 'Retirada' | 'Por embalar' | 'Enviada';
  deliveryMethod?: 'Shipping' | 'Pickup';
  note?: string;
}


export interface ResellerData {
    initials: string;
    name: string;
    sold: number;
    profit: number;
    color: string;
}

export interface PopularProductData {
    initials: string;
    name: string;
    size: string;
    sold: number;
    color: string;
}
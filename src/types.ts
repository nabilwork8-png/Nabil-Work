export type ProductColor = 'blue' | 'gray';

export interface OrderData {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address?: string;
  color: ProductColor;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  paymentMethod: 'COD'; // الدفع عند الاستلام
}

export interface PixelEventLog {
  id: string;
  eventName: 'PageView' | 'Lead' | 'Purchase';
  data?: Record<string, unknown>;
  timestamp: string;
}

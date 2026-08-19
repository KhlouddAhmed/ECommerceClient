export interface CreateOrder {
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  productName: string;
  quantity: number;
  price: number;
}
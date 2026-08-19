import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrder, OrderResponse } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'https://localhost:7012/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(dto: CreateOrder) {
    return this.http.post<OrderResponse>(this.apiUrl, dto);
  }

  getMyOrders() {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }
}
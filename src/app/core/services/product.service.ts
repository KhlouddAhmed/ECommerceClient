import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProduct, Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:7012/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(dto: CreateProduct) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  updateProduct(id: number, dto: CreateProduct) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(name: string) {
    return this.http.post<Category>(`${this.apiUrl}/categories`, { name });
  }
}
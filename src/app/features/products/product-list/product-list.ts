import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { CartService } from '../../../core/services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  cartService = inject(CartService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  filtered = signal<Product[]>([]);
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  loading = signal(true);

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
      this.filtered.set(products);
      this.loading.set(false);
    });

    this.productService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }

  filterByCategory(name: string) {
    this.selectedCategory.set(name);
    this.applyFilters();
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  applyFilters() {
    let result = this.products();

    if (this.selectedCategory() !== 'All') {
      result = result.filter(p => p.categoryName === this.selectedCategory());
    }

    if (this.searchQuery()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery().toLowerCase())
      );
    }

    this.filtered.set(result);
  }

  addToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
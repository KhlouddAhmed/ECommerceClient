import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  showAddProduct = signal(false);
  showAddCategory = signal(false);
  error = '';
  success = '';

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    categoryId: [0, Validators.required]
  });

  categoryForm = this.fb.group({
    name: ['', Validators.required]
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe(p => {
      this.products.set(p);
      this.loading.set(false);
    });
    this.productService.getCategories().subscribe(c => {
      this.categories.set(c);
    });
  }

  addProduct() {
    if (this.productForm.invalid) return;
    this.productService.createProduct(this.productForm.value as any).subscribe({
      next: () => {
        this.success = 'Product added!';
        this.showAddProduct.set(false);
        this.productForm.reset();
        this.loadData();
        setTimeout(() => this.success = '', 3000);
      },
      error: () => this.error = 'Failed to add product.'
    });
  }

  addCategory() {
    if (this.categoryForm.invalid) return;
    this.productService.createCategory(this.categoryForm.value.name!).subscribe({
      next: () => {
        this.success = 'Category added!';
        this.showAddCategory.set(false);
        this.categoryForm.reset();
        this.loadData();
        setTimeout(() => this.success = '', 3000);
      },
      error: () => this.error = 'Failed to add category.'
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    this.productService.deleteProduct(id).subscribe(() => this.loadData());
  }
}
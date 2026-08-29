import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  cartService = inject(CartService);

  product = signal<Product | null>(null);
  loading = signal(true);
  added = signal(false);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(p => {
      this.product.set(p);
      this.loading.set(false);
    });
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addItem(this.product()!);
      this.added.set(true);
      setTimeout(() => this.added.set(false), 2000);
    }
  }
}
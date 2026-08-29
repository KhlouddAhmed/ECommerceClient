import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  loading = false;
  error = '';
  success = false;

  placeOrder() {
    if (this.cartService.items().length === 0) return;
    this.loading = true;
    this.error = '';

    const dto = {
      items: this.cartService.items().map(i => ({
        productId: i.product.id,
        quantity: i.quantity
      }))
    };

    this.orderService.placeOrder(dto).subscribe({
      next: () => {
        this.cartService.clear();
        this.success = true;
        setTimeout(() => this.router.navigate(['/orders']), 2000);
      },
      error: () => {
        this.error = 'Failed to place order. Try again.';
        this.loading = false;
      }
    });
  }
}
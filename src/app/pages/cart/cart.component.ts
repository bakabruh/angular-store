import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cart: Cart = { items: [
    { product: 'https://via.placeholder.com/150', name: 'Product 1', price: 100, quantity: 1, id: 1 },
    { product: 'https://via.placeholder.com/150', name: 'Product 2', price: 200, quantity: 2, id: 2 },
    { product: 'https://via.placeholder.com/150', name: 'Product 3', price: 300, quantity: 3, id: 3 }
  ] }
  dataSource: CartItem[] = [];
  displayedColumns: string[] = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  constructor(private _cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

  onClearCart(): void {
    this._cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this._cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this._cartService.addToCart(item);
  }

  onSoustractQuantity(item: CartItem): void {
    this._cartService.soustractQuantity(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51OysGrRqyIZqbrVbSvOEuvzcLqKk3MM9TRHmEnYqhQwiu1Mvnezfaf5pOaCNCntUbnv6ZjDcIA1cMkj1TxVM7qFT00pI3hmI4i');
      stripe?.redirectToCheckout({ sessionId: res.id });
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/Cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] };
  itemsQuantity: number = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items);
  }

  removeItemsFromCart(): void {
    this._cartService.clearCart();
  }

}

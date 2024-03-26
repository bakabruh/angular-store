import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/Cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemsInCart = items.find((_item)=> _item.id === item.id);

    if(itemsInCart){
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('Product added to cart', 'Ok', {
      duration: 2000,
    });
  }

  getTotal(items: CartItem[]): number {
    return items.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart cleared', 'Ok', {
      duration: 2000,
    });
  }

  removeFromCart(item: CartItem, update: boolean = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if(update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('Product removed from cart', 'Ok', {
        duration: 2000,
      });
    }

    return filteredItems;
  }

  soustractQuantity(item: CartItem): void {
    let removalItems: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity -= 1;

        if(_item.quantity === 0){
          this.removeFromCart(_item);
        }
      }
      return _item;
    });

    if(removalItems) {
      filteredItems = this.removeFromCart(removalItems, false);
    }

    if(item.quantity > 0) {
      this.cart.next({ items: filteredItems });
    }

    this._snackBar.open('1 item removed from cart', 'Ok', {
      duration: 2000
    })

  }

}

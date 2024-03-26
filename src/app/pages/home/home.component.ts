import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  cols: number = 3;
  category:string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Product[] | undefined;
  sort = "desc";
  count = 12;
  productSubscription: Subscription | undefined;

  constructor(private _cartService: CartService, private _storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this._storeService.getAllProducts(this.count.toString(), this.sort, this.category).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log('error ', error)
      }
    );
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onItemsCountChange(count: number): void {
    this.count = count;
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this._cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      product: product.image
    });
  }

  ngOnDestroy(): void {
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}

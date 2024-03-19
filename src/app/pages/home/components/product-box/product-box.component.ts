import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode: boolean = false;
  product: Product | undefined = {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    price: 100,
    category: "category 1",
    image: "https://via.placeholder.com/150"
  };
  @Output() addToCart = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

}

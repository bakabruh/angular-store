import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort: string = "desc";
  itemsCount: number = 12;

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(this.sort);
  }

  onItemsUpdated(count: number): void {
    this.itemsCount = count;
    this.itemsCountChange.emit(this.itemsCount);
  }

  onColumnsUpdated(columnsNb: number): void {
    this.columnsCountChange.emit(columnsNb);
  }

}

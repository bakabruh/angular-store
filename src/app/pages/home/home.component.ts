import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  cols: number = 3;
  category:string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  constructor() { }

  ngOnInit(): void {
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

}

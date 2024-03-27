import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit: string = '12', sort: string = 'desc', category?: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${STORE_BASE_URL}/products${ category ? '/category/' + category : '' }?limit=${limit}&sort=${sort}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${STORE_BASE_URL}/products/categories`
    );
  }

}

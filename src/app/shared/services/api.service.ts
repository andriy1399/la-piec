import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Subject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlOrder = 'http://localhost:3000/orders';
  public basket = new Subject<number>();
  constructor(private http: HttpClient) { }

  setLocalOrder(product: IProduct): void {
    let orders = JSON.parse(localStorage.getItem('orders'));
    if (orders) {
      if (orders.some(prod => prod.id === product.id)) {
        const index = orders.findIndex(prod => prod.id === product.id);
        orders[index].count += product.count;
      }
      else {
        orders.push(product);
      }
    }
    else {
      orders = [];
      orders.push(product);
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    this.basket.next(1);
  }
  postOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.urlOrder, order);
  }
  getOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.urlOrder);
  }
  
}

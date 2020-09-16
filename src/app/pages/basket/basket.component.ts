import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orders: Array<IProduct> = [];
  totalPrice = 0;

  name: string;
  phone: string;
  comment: string;
  city: string;
  street: string;
  house: string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getLocalOrder();
  }

  private getLocalOrder(): void {
    const localOrders = JSON.parse(localStorage.getItem('orders'));
    if (localOrders) {
      this.orders = localOrders;
      this.getTotalPrice();
    }
  }

  productCount(status: boolean, product: IProduct): void {
    if (status) {
      ++product.count;
    }
    else {
      if (product.count > 1) {
        --product.count;
      }
    }
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.apiService.basket.next(1);
    this.getTotalPrice();
  }

  private getTotalPrice(): void {
    this.totalPrice = this.orders.reduce((total, prod) => total + (prod.count * prod.price), 0);
  }
  deleteProduct(id: string | number): void {
    const index = this.orders.findIndex(prod => prod.id === id);
    console.log(index);
    console.log(this.orders);
    this.orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.apiService.basket.next(1);
  }

  formOrder(): void {
    const order = new Order(
      this.name,
      this.phone,
      this.comment,
      this.city,
      this.street,
      this.house,
      this.orders,
      this.totalPrice
    );
    delete order.id;
    this.apiService.postOrder(order)
      .subscribe(() => {
        this.orders = [];
        localStorage.removeItem('orders');
        this.apiService.basket.next(1);
      });
  }
}

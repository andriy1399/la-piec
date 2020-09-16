import { Injectable } from '@angular/core';
import { IDiscount } from '../interfaces/discount.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private serviceDiscount: Array<IDiscount> = [
    {
      id: 1,
      title: 'Наша фірмова акція “2+1”',
      text: `Акція «2+1» діє в понеділок, вівторок, середу та четвер. Замовляйте дві піци та отримуйте ще одну безкоштовно!<br>
      * Безкоштовною вважається піца з найменшою вартістю.<br>
      ** Ця акція не поєднується з іншими акціями.`,
      image: 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg'
    }
  ];
  private url = 'http://localhost:3000/discounts';
  constructor(private http: HttpClient) { }

  getServiceDiscount(): Array<IDiscount> {
    return this.serviceDiscount;
  }

  addServiceDiscount(discount: IDiscount): void {
    this.serviceDiscount.push(discount);
  }

  deleteServiceDiscount(discount: IDiscount): void{
    const index = this.serviceDiscount.findIndex(d => d.id === discount.id);
    this.serviceDiscount.splice(index, 1);
  }

  updateServiceDiscount(discount: IDiscount): void{
    const index = this.serviceDiscount.findIndex(d => d.id === discount.id);
    this.serviceDiscount.splice(index, 1, discount);
  }

  // --------------------------- JSON-SERVER ----------------------------------

  getJSONDiscount(): Observable<Array<IDiscount>> {
    return this.http.get<Array<IDiscount>>(this.url);
  }

  postJSONDiscount(discount: IDiscount): Observable<IDiscount> {
    return this.http.post<IDiscount>(this.url, discount);
  }

  deleteJSONDiscount(id: number): Observable<IDiscount> {
    return this.http.delete<IDiscount>(`${this.url}/${id}`);
  }

  updateJSONDiscount(discount: IDiscount): Observable<IDiscount> {
    return this.http.put<IDiscount>(`${this.url}/${discount.id}`, discount);
  }

  getOneJSONProduct(id: number): Observable<IDiscount> {
    return this.http.get<IDiscount>(`${this.url}/${id}`);
  }

}

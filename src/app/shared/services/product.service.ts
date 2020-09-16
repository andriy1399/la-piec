import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000/products';
  constructor(
    private http: HttpClient,
    private afFirestore: AngularFirestore
    ) { }

  getJSONProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }

  postJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  deleteJSONProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  }

  updateJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  }

  getCategoryProduct(name: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${name}`);
  }

  getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
  getFirestoreProduct(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('products').snapshotChanges();
  }

  getFirestoreCategory(name: string): any {
    return this.afFirestore.collection; //
  }
  createFirestoreProduct(product: IProduct): Promise<DocumentReference>{
    return this.afFirestore.collection('products').add({...product});
  }
}

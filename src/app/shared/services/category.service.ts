import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://localhost:3000/categories';
  constructor(
    private http: HttpClient,
    private afFirestore: AngularFirestore
    ) { }

  getJSONCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }

  postJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.url, category);
  }

  deleteJSONCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.url}/${id}`);
  }

  updateJSONCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.url}/${category.id}`, category);
  }

  getFirestoreCategory(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afFirestore.collection('categories').snapshotChanges();
  }
}

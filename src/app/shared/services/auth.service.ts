import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userCredential = new Subject<string>();
  constructor(
    private afAuth: AngularFireAuth,
    private afFireStore: AngularFirestore,
    private router: Router
  ) { }

  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.afFireStore.collection('users').ref.where('id', '==', userCredential.user.uid)
          .onSnapshot(document => {
            document.forEach(user => {
              const data = user.data();
              if (data.role === 'admin' && data.access) {
                localStorage.setItem('userCredential', JSON.stringify(data));
                this.router.navigateByUrl('admin');
                this.userCredential.next('admin');
              } else if (data.role === 'user') {
                localStorage.setItem('userCredential', JSON.stringify(data));
                localStorage.setItem('userID', JSON.stringify(user.id));
                this.router.navigateByUrl('cabinet');
                this.userCredential.next('cabinet');
              }
            });
          });
      })
      .catch(err => console.error(err));
  }

  signUp(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = {
          email: userCredential.user.email,
          role: 'user',
          id: userCredential.user.uid
        };
        this.afFireStore.collection('users').add(user)
          .then(() => console.log('add to db'))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('userCredential');
        localStorage.removeItem('userId');
        this.router.navigateByUrl('home');
        this.userCredential.next('logout');
      });
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalPrice = 0;
  modalRef: BsModalRef;
  userEmail: string;
  userPassword: string;

  urlAddress: string;
  urlName: string;
  loginStatus: boolean;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private modalService: BsModalService) { }
  ngOnInit(): void {
    this.changeTotalPrice();
    this.getTotalPrice();
    this.parseData();
    this.checkLogin();
  }
  private getTotalPrice(): void {
    const orders = JSON.parse(localStorage.getItem('orders'));
    if (orders) {
      this.totalPrice = orders.reduce((total: number, prod: { count: number; price: number; }) => total + (prod.count * prod.price), 0);
    }
    else {
      this.totalPrice = 0;
    }
  }
  private changeTotalPrice(): void {
    this.apiService.basket.subscribe(
      () => {
        this.getTotalPrice();
      }
    );
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  signIn(): void {
    this.authService.signIn(this.userEmail, this.userPassword);
    this.modalRef.hide();
  }
  signUp(): void {
    this.authService.signUp(this.userEmail, this.userPassword);
    this.modalRef.hide();
  }

  checkLogin(): void {
    this.authService.userCredential.subscribe(
      () => {
        this.parseData();
      }
    );
  }

  parseData(): void {
    const data = JSON.parse(localStorage.getItem('userCredential'));

    if (data) {
      if (data.role === 'admin') {
        this.urlAddress = 'admin';
        this.urlName = 'адмін';
      }
      else if (data.role === 'user') {
        this.urlAddress = 'cabinet';
        this.urlName = 'кабінет';
      }
      this.loginStatus = true;
    }
    else {
      this.urlAddress = '';
      this.urlName = '';
      this.loginStatus = false;
    }
  }
}

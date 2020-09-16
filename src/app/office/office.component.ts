import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IAddress } from '../shared/interfaces/address.interface';
import { Address } from '../shared/models/address.model';
import { AddressService } from '../shared/services/address.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  phone = '';
  name = '';
  lastName = '';
  dateOfB: string;
  address: string;

  addAddressRef: BsModalRef;
  confirmRef: BsModalRef;

  addressCity: string;
  addressStreet: string;
  addressBuild: string;
  addressFlour: string;
  addressHomeNumber: string;

  addresses: Array<IAddress> = [];
  constructor(
    private modalService: BsModalService,
    private addressService: AddressService,
    private authService: AuthService,
    private afFirestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getLocalAddress();
    const a = 2;
    const b = 4;
  }
  openModal(template: TemplateRef<any>): void {
    this.addAddressRef = this.modalService.show(template);
  }

  openModalConfirm(template: TemplateRef<any>): void {
    if (this.addresses.some(adr => adr.toStr === this.address)) {
      this.confirmRef = this.modalService.show(template, { class: 'modal-md' });
    }
  }

  confirm(): void {
    this.addressService.deleteLocalAddress(this.address);
    this.confirmRef.hide();
    this.getLocalAddress();
  }

  private getLocalAddress(): void {
    const localAddresses = JSON.parse(localStorage.getItem('addresses'));
    if (localAddresses) {
      this.addresses = localAddresses;
      this.address = this.addresses[0].toStr;
    } else {
      localStorage.removeItem('addresses');
      this.address = '';
    }
  }
  addAddress(): void {
    if (this.checkForm()) {
      const ars = new Address(
        this.addressCity,
        this.addressStreet,
        this.addressBuild,
        this.addressFlour,
        this.addressHomeNumber,
        `${this.addressCity}, ${this.addressStreet}, ${this.addressBuild}, ${this.addressFlour}, ${this.addressHomeNumber}`
      );
      this.addressService.setLocalAddress(ars);
      this.getLocalAddress();
      this.addAddressRef.hide();
      this.clearForm();
    }
  }

  private checkForm(): boolean {
    return this.addressCity.trim()
      && this.addressStreet.trim()
      && this.addressBuild.trim()
      && this.addressFlour
      && this.addressHomeNumber.trim() ? true : false;
  }

  private clearForm(): void {
    this.addressCity = '';
    this.addressStreet = '';
    this.addressBuild = '';
    this.addressFlour = null;
    this.addressHomeNumber = '';
  }

  signOut(): void {
    this.authService.signOut();
  }

  updateData(): void {
    const data = JSON.parse(localStorage.getItem('userCredential'));
    const userID = JSON.parse(localStorage.getItem('userID'));
    const newData = new User(this.phone, this.name, this.lastName, this.dateOfB, this.address);
    this.afFirestore.collection('users').doc(userID).update({ ...newData, ...data })
      .then(() => console.log('success'))
      .catch(err => console.error(err));
  }
}

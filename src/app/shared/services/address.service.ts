import { Injectable } from '@angular/core';
import { IAddress } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() { }

  setLocalAddress(address: IAddress): void {
    let addresses = JSON.parse(localStorage.getItem('addresses'));
    if (addresses) {
      addresses.push(address);
    }
    else {
      addresses = [];
      addresses.push(address);
    }
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }

  deleteLocalAddress(str: string): void {
    let addresses = JSON.parse(localStorage.getItem('addresses'));
    if (addresses) {
      for (const iterator of addresses) {
        console.log(iterator);
      }
      addresses = addresses.filter((adr: IAddress) => adr.toStr !== str);
    }
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }
}

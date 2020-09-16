import { IAddress } from '../interfaces/address.interface';
export class Address implements IAddress {
  constructor(
    public city: string,
    public street: string,
    public build: string,
    public flour: string | number,
    public homeNumber: string,
    public toStr: string
  ) {}
}

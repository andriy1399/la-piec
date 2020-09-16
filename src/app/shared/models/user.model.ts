import { IUser } from '../interfaces/user.interface';
export class User implements IUser {
  constructor(
    public phone: string,
    public name: string,
    public lastName: string,
    public dateOfB: string,
    public address: string
  ) { }
}

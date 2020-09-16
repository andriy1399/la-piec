import { IProduct } from './product.interface';
export interface IOrder {
    name: string;
    phone: string;
    comment: string;
    city: string;
    street: string;
    house: string;
    product: Array<IProduct>;
    totalPrice: number;
    id?: number | string;
}

import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';
export class Order implements IOrder {
    constructor(
        public name: string,
        public phone: string,
        public comment: string,
        public city: string,
        public street: string,
        public house: string,
        public product: Array<IProduct>,
        public totalPrice: number,
        public id?: number | string
    ) {}
}

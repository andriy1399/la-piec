import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';

export class Product implements IProduct {
    constructor(public category: ICategory,
                public nameEN: string,
                public nameUA: string,
                public description: string,
                public weight: string,
                public price: number,
                public image: string,
                public count: number,
                public id?: number | string) {}
}

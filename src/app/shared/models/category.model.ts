import { ICategory } from '../interfaces/category.interface';

export class Category implements ICategory {
    constructor(public nameEN: string,
                public nameUA: string,
                public id?: number | string) {}
}

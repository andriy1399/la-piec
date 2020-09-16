import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  category: string;
  constructor(
    private prodService: ProductService,
    private router: Router,
    private acdRoute: ActivatedRoute,
    private apiService: ApiService) {
      this.checkRouter();
  }

  ngOnInit(): void { }

  private getProducts(categoryName: string): void {
    this.prodService.getCategoryProduct(categoryName).subscribe(
      data => {
        this.products = data;
        this.category = this.products[0]?.category.nameUA;
      }
    );
  }

  private checkRouter(): void{
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd){
        const category = this.acdRoute.snapshot.paramMap.get('category');
        this.getProducts(category);
      }
    });
  }

  public productCount(status: boolean, product: IProduct): void{
    if (status) {
      ++product.count;
    }
    else {
      if (product.count > 1) {
        --product.count;
      }
    }
  }

  public addToBasket(product: IProduct): void {
    this.apiService.setLocalOrder(product);
    product.count = 1;
  }
}

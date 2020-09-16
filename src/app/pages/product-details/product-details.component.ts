import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(
    private prodService: ProductService,
    private acdRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    const id = +this.acdRoute.snapshot.paramMap.get('id');
    this.prodService.getOneProduct(id).subscribe(
      data => {
        this.product = data;
        console.log(this.product);
      }
    );
  }

  productCount(status: boolean, product: IProduct): void {
    if (status) {
      ++product.count;
    }
    else {
      if (product.count > 1) {
        --product.count;
      }
    }
  }

  addToBasket(product: IProduct): void {
    this.apiService.setLocalOrder(product);
    product.count = 1;
  }
}

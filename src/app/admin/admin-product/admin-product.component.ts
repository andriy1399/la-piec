import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { Product } from '../../shared/models/product.model';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  adminProducts: Array<IProduct> = [];
  adminCategory: Array<ICategory> = [];
  categoryName: string;

  productID: number | string;
  productCategory: ICategory;
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productImage = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2018/07/LA-P_yets-1.png';

  imageStatus: boolean;
  isEditing = false;
  editedProd: IProduct;
  editingID: number | string;
  uploadProgress: Observable<number>;
  constructor(
    private catService: CategoryService,
    private prodService: ProductService,
    private fireStorage: AngularFireStorage,
  ) { }


  ngOnInit(): void {
    this.getAdminCategory();
    this.getAdminProduct();
  }

  private getAdminCategory(): void {
    this.catService.getJSONCategory().subscribe(
      data => {
        this.adminCategory = data;
        this.productCategory = this.adminCategory[0];
      },
      err => { console.log(err); }
    );
  }

  setCategory(): void {
    this.productCategory = this.adminCategory.filter(cat => cat.nameEN === this.categoryName)[0];
  }

  private getAdminProduct(): void {
    this.prodService.getJSONProduct().subscribe(
      data => { this.adminProducts = data; },
      err => { console.log(err); }
    );
  }

  addProduct(): void {
    const newProduct = new Product(
      this.productCategory,
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
      1);
    this.prodService.postJSONProduct(newProduct).subscribe(
      () => { this.getAdminProduct(); }
    );
    this.resetForm();
  }

  uploadFile(event): void {
    console.log(event);
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    const task = this.fireStorage.upload(`images/${name}`, file);
    this.uploadProgress = task.percentageChanges();
    task.then(image => {
      this.fireStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.imageStatus = true;
      });
    });
  }

  deleteImage(): void {
    if (confirm('Are you sure')) {
      this.fireStorage.storage.refFromURL(this.productImage).delete()
        .then(
          () => {
            this.imageStatus = false;
            this.productImage = '';
          }
        );
    }
  }

  saveEditProduct(): void {
    this.editedProd = new Product(
      this.adminCategory.find(val => val.nameEN === this.categoryName),
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
      1,
      this.editingID);
    this.prodService.updateJSONProduct(this.editedProd)
      .subscribe(() => this.getAdminProduct());

    this.resetForm();
    this.isEditing = false;
  }

  editProduct(p: IProduct): void {
    this.isEditing = true;
    this.productWeight = p.weight;
    this.categoryName = p.category.nameEN;
    this.productImage = p.image;
    this.productDescription = p.description;
    this.productNameEN = p.nameEN;
    this.productNameUA = p.nameUA;
    this.productPrice = p.price;
    this.editingID = p.id;
  }

  deleteProduct(id: number): void {
    this.prodService.deleteJSONProduct(id)
      .subscribe(() => this.getAdminProduct());
  }


  private resetForm(): void {
    this.productNameEN = '';
    this.productNameUA = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = null;
    this.productImage = '';
    this.imageStatus = false;
  }


}

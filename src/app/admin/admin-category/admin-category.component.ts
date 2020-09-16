import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Category } from '../../shared/models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategory: Array<ICategory> = [];
  categoryID: number | string;
  categoryNameEN: string;
  categoryNameUA: string;

  isEditing = false;
  editingCat: ICategory;
  constructor(
    private catService: CategoryService,
    private afFirestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getAdminCategory();
  }

  private getAdminCategory(): void {
    this.catService.getJSONCategory().subscribe(
      data => { this.adminCategory = data; },
      err => { console.log(err); }
    );
   
  }

  addCategory(): void {
    const newCategory = new Category(this.categoryNameEN.toLowerCase(), this.categoryNameUA.toLowerCase());
    this.catService.postJSONCategory(newCategory).subscribe(
      () => {
        this.getAdminCategory();
      }
    );
   
  }
  editCategory(category: ICategory): void {
    this.categoryNameEN = category.nameEN;
    this.categoryNameUA = category.nameUA;
    this.isEditing = true;
    this.editingCat = category;
  }

  saveEditCategory(): void {
    this.editingCat.nameEN = this.categoryNameEN;
    this.editingCat.nameUA = this.categoryNameUA;
    this.catService.updateJSONCategory(this.editingCat)
      .subscribe(() => this.getAdminCategory());
    this.isEditing = false;
    this.resetForm();
  }

  deleteCategory(id: number): void {
    this.catService.deleteJSONCategory(id)
      .subscribe(() => this.getAdminCategory());
  }

  private resetForm(): void {
    this.categoryID = null;
    this.categoryNameEN = '';
    this.categoryNameUA = '';
  }

}

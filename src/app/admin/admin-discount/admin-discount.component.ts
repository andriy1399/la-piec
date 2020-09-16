import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../shared/services/discount.service';
import { IDiscount } from '../../shared/interfaces/discount.interface';
import { Discount } from '../../shared/models/discount.model';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  adminDiscount: Array<IDiscount> = [];
  discountID = 1;
  title: string;
  text: string;
  image = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  editStatus = false;

  constructor(private discService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  // private getDiscount(): void {
  //   this.adminDiscount = this.discService.getServiceDiscount();
  //   console.log(this.adminDiscount);
  // }

  private getDiscount(): void {
    this.discService.getJSONDiscount().subscribe(
      data => {
        this.adminDiscount = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  // addDiscount(): void {
  //   const disc = new Discount(this.discountID, this.title, this.text, this.image);
  //   if (this.adminDiscount.length > 0) {
  //     disc.id = this.adminDiscount.slice(-1)[0].id + 1;
  //   }
  //   this.discService.addServiceDiscount(disc);
  //   // console.log(this.adminDiscount);
  //   this.resetForm();
  // }

  addDiscount(): void {
    const disc = new Discount(this.discountID, this.title, this.text, this.image);
    delete disc.id;
    this.discService.postJSONDiscount(disc).subscribe(
      () => {
        this.getDiscount();
      }
    );
    this.resetForm();
  }

  deleteDiscount(discount: IDiscount): void {
    if (confirm('Are you sure?')){
      // this.discService.deleteServiceDiscount(discount);
      this.discService.deleteJSONDiscount(discount.id).subscribe(
        () => {
          this.getDiscount();
        }
      );
    }
  }

  editDiscount(discount: IDiscount): void {
    this.discountID = discount.id;
    this.title = discount.title;
    this.text = discount.text;
    this.image = discount.image;
    this.editStatus = true;
  }

  saveDiscount(): void {
    const updateDisc = new Discount(this.discountID, this.title, this.text, this.image);
    // this.discService.updateServiceDiscount(updateDisc);
    this.discService.updateJSONDiscount(updateDisc).subscribe(() => { this.getDiscount(); });
    this.resetForm();
    this.editStatus = false;
  }

  private resetForm(): void{
    this.discountID = 1;
    this.title = '';
    this.text = '';
    this.image = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  }
}

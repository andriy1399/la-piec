import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../shared/services/discount.service';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from '../../shared/interfaces/discount.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  discount: IDiscount;
  constructor(private discService: DiscountService,
              private activatedRoute: ActivatedRoute,
              public location: Location){}

  ngOnInit(): void {
    this.getMyDiscount();
  }

  private getMyDiscount(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.discService.getOneJSONProduct(id).subscribe(
      data => {
        this.discount = data;
      }
    );
  }


}

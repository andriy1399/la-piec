import { Component, OnInit } from '@angular/core';
import { IDiscount } from '../../shared/interfaces/discount.interface';
import { DiscountService } from '../../shared/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  userDiscount: Array<IDiscount> = [];
  constructor(private discService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscount();
  }

  private getDiscount(): void {
    this.discService.getJSONDiscount().subscribe(
      data => {
        this.userDiscount = data;
      }
    );
  }

}

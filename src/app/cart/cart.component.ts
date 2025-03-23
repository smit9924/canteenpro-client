import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FODD_ITEM_MENU } from '../common/appConstants';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { ICartItems } from '../common/models/interfaces';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public FODD_ITEM_MENU = FODD_ITEM_MENU;
  public cartItemsList: ICartItems[] | null = []

  constructor(
    private dataService: DataService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.cartItemsList = await this.dataService.getCartItemListData();
  }

  public isCartEmpty(): boolean {
    if(this.cartItemsList === null || this.cartItemsList.length === 0) {
      return true;
    }
    return false;
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FILE_UPLOAD_URL, FODD_ITEM_MENU, IMAGE_FILE_DIRECTORTY } from '../common/appConstants';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { ICartItems, IMediaDataModel } from '../common/models/interfaces';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE } from '../common/appEnums';

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
  public FOOD_ITEM_TYPE = FOOD_ITEM_TYPE;
  public cartItemsList: ICartItems[] | null = []

  constructor(
    private dataService: DataService
  ) { }

  public async ngOnInit(): Promise<void> {
    this.cartItemsList = await this.dataService.getCartItemListData();
  }

  public isCartEmpty(): boolean {
    if (this.cartItemsList === null || this.cartItemsList.length === 0) {
      return true;
    }
    return false;
  }

  public getImageURL(imageData: IMediaDataModel | undefined): string {
    if (imageData) {
      const imageURL = FILE_UPLOAD_URL + IMAGE_FILE_DIRECTORTY + imageData.guid + '.' + imageData.extension;
      return imageURL;
    }
    return "";
  }

  public getItemQuantityWithUnit(quantity: number, unitType: FOOD_ITEM_QUANTITY_UNIT): string {
      let quantityWithUnit = `${quantity} `;
      switch (unitType) {
        case FOOD_ITEM_QUANTITY_UNIT.PIECES:
          quantityWithUnit += 'pcs.';
          break;
        case FOOD_ITEM_QUANTITY_UNIT.GRAM:
          quantityWithUnit += 'gm';
          break;
        case FOOD_ITEM_QUANTITY_UNIT.MILLI_LITER:
          quantityWithUnit += 'ml';
          break;
      }
  
      return quantityWithUnit;
    }
}

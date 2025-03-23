import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FILE_UPLOAD_URL, FODD_ITEM_MENU, IMAGE_FILE_DIRECTORTY } from '../common/appConstants';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { IAPIResponse, ICartItems, IMediaDataModel } from '../common/models/interfaces';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE, UPDATE_ITEM_QUANTITY_TYPE } from '../common/appEnums';
import { API_ADD_MENU_ITEM_IN_CART, API_DECREASE_MENU_ITEM_QUANTITY, API_INCREASE_MENU_ITEM_QUANTITY } from '../common/apiConstants';
import { PreLoaderService } from '../services/pre-loader.service';

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
  public UPDATE_ITEM_QUANTITY_TYPE = UPDATE_ITEM_QUANTITY_TYPE;
  public cartItemsList: ICartItems[] = []

  constructor(
    private dataService: DataService,
    private preloaderService: PreLoaderService
  ) { }

  public async ngOnInit(): Promise<void> {
    const cartItems = await this.dataService.getCartItemListData();
    if(cartItems !== null) {
      this.cartItemsList = cartItems;
    }
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

  public updateItemQuantity(updateItemQuantityType: UPDATE_ITEM_QUANTITY_TYPE, itemGuid: string): void {
    let URL = "";
    let updatedItemCount = 0;
    const updatedItem = this.cartItemsList.find(item => item.guid === itemGuid);
    if (!updatedItem) {
      throw new Error("item to be updated not found");
    }

    // Choose the URL based on type
    switch (updateItemQuantityType) {
      case UPDATE_ITEM_QUANTITY_TYPE.INCREASE:
        URL = API_INCREASE_MENU_ITEM_QUANTITY;
        updatedItemCount = updatedItem.itemCount + 1;
        break;
      case UPDATE_ITEM_QUANTITY_TYPE.DECREASE:
        URL = API_DECREASE_MENU_ITEM_QUANTITY;
        updatedItemCount = updatedItem.itemCount - 1;
        break;
    }


    this.preloaderService.show();
    this.dataService.put(URL, { guid: itemGuid })
      .then(async (response: IAPIResponse<any>) => {
        if (!response.success) {
          throw new Error();
        }
        updatedItem.itemCount = updatedItemCount;
        if (updatedItemCount <= 0) {
          this.cartItemsList = this.cartItemsList.filter(item => item.guid !== updatedItem.guid);
        }
        this.dataService.setCartItemsListData(this.cartItemsList);
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      });
  }
}

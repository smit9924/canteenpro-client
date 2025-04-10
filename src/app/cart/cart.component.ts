import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FILE_UPLOAD_URL, FODD_ITEM_MENU, IMAGE_FILE_DIRECTORTY, ORDER_HISTORY_PAGE } from '../common/appConstants';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { IAPIResponse, ICartItems, IMediaDataModel, IToastEventData } from '../common/models/interfaces';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE, TOAST_TYPE, UPDATE_ITEM_QUANTITY_TYPE } from '../common/appEnums';
import { API_ADD_MENU_ITEM_IN_CART, API_DECREASE_MENU_ITEM_QUANTITY, API_INCREASE_MENU_ITEM_QUANTITY, API_ORDERS } from '../common/apiConstants';
import { PreLoaderService } from '../services/pre-loader.service';
import { ToastService } from '../services/toast.service';

const ORDER_PLACE_SUCCESSFULLY_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Your order placed successfully!"
}

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
    private router: Router,
    private dataService: DataService,
    private preloaderService: PreLoaderService,
    private toastService: ToastService
  ) { }

  public async ngOnInit(): Promise<void> {
    const cartItems = await this.dataService.getCartItemListData();
    if(cartItems !== null) {
      this.cartItemsList = cartItems;
    }
  }

  public placeOrder(): void {
    this.preloaderService.show();
    this.dataService.post(API_ORDERS, this.cartItemsList)
      .then((response) => {
        this.toastService.enque(ORDER_PLACE_SUCCESSFULLY_TOAST_DATA);
        this.router.navigateByUrl(ORDER_HISTORY_PAGE);
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      })
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

  public getSubTotal(): number {
    if(this.cartItemsList.length === 0) {
      return 0;
    }
    let subTotal = 0;
    this.cartItemsList.forEach(item => {
      subTotal += item.price * item.itemCount;
    });

    return subTotal;
  }

  public getGSTAmount(): number {
    const gstAmount = Math.floor(this.getSubTotal() * 0.05);
    return gstAmount;
  }

  public geTotalBill(): number {
    return this.getSubTotal() + this.getGSTAmount();
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

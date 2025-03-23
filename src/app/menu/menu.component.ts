import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { PreLoaderService } from '../services/pre-loader.service';
import { IAPIResponse, ICreateItemModel, IMediaDataModel, IMenuCategories, IMenuItems } from '../common/models/interfaces';
import { API_ADD_MENU_ITEM_IN_CART, API_DECREASE_MENU_ITEM_QUANTITY, API_INCREASE_MENU_ITEM_QUANTITY, API_MENU_CATEGORY, API_MENU_ITEMS } from '../common/apiConstants';
import { FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY, QUERY_PARAM_CATEGORY, QUERY_PARAM_KEY_GUID } from '../common/appConstants';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE, UPDATE_ITEM_QUANTITY_TYPE } from '../common/appEnums';

const CATEGORY_ALL = "ALL";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  public FOOD_ITEM_TYPE = FOOD_ITEM_TYPE;
  public UPDATE_ITEM_QUANTITY_TYPE = UPDATE_ITEM_QUANTITY_TYPE;
  public CATEGORY_ALL = CATEGORY_ALL;
  public menuItems: IMenuItems[] = [];
  public currentCategory: string = CATEGORY_ALL;
  public categories: IMenuCategories[] = [];

  constructor(
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ) { }

  public ngOnInit(): void {
    // Fetch food categories
    this.fetchCategories();

    // Fetch food items
    this.fetchCategoryMenuItems();
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

  public changeCategory(guid: string): void {
    this.currentCategory = guid;
    this.fetchCategoryMenuItems();
  }

  public get pageTitle(): string {
    let pageTitle = "Today's Special";
    if(this.currentCategory !== CATEGORY_ALL) {
      const category = this.categories.filter(
        category => category.guid === this.currentCategory
      );

      pageTitle = category[0].name;
    }

    return pageTitle;
  }

  public updateItemQuantity(updateItemQuantityType: UPDATE_ITEM_QUANTITY_TYPE, itemGuid: string): void {
    let URL = "";
    let updatedItemCount = 0;
    let isItemAddedIntoCart = true;
    const updatedItem = this.menuItems.find(item => item.guid === itemGuid);
    if(!updatedItem) {
      throw new Error("item to be updated not found");
    }

    // Choose the URL based on type
    switch(updateItemQuantityType) {
      case UPDATE_ITEM_QUANTITY_TYPE.ADD:
        URL = API_ADD_MENU_ITEM_IN_CART;
        updatedItemCount = 1;
        break;
      case UPDATE_ITEM_QUANTITY_TYPE.INCREASE:
        URL = API_INCREASE_MENU_ITEM_QUANTITY;
        updatedItemCount = updatedItem.itemCount + 1;
        break;
      case UPDATE_ITEM_QUANTITY_TYPE.DECREASE:
        URL = API_DECREASE_MENU_ITEM_QUANTITY;
        updatedItemCount = updatedItem.itemCount - 1;
        if(updatedItemCount <= 0) {
          isItemAddedIntoCart = false;
        }
        break;
    }

    
    this.preloaderService.show();
    this.dataService.put(URL, {guid: itemGuid})
      .then(async (response: IAPIResponse<any>) => {
        if (!response.success) {
          throw new Error();
        }
        updatedItem.itemCount = updatedItemCount;
        updatedItem.foodItemAddedIntoCart = isItemAddedIntoCart;
        await this.dataService.updateCartItemListData();
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      });
  }

  private fetchCategories(): void {
    this.preloaderService.show();
    this.dataService.get(API_MENU_CATEGORY)
      .then((response: IAPIResponse<IMenuCategories[]>) => {
        if (!response.success) {
          throw new Error();
        }
        this.categories = response.data;
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      });
  }


  private fetchCategoryMenuItems(): void {
    this.preloaderService.show();
    let URL = API_MENU_ITEMS;

    // Attach category GUID
    if(this.currentCategory !== CATEGORY_ALL) {
      URL += `?${QUERY_PARAM_CATEGORY}=${this.currentCategory}`;
    }

    this.dataService.get(URL)
      .then((response: IAPIResponse<IMenuItems[]>) => {
        if (!response.success) {
          throw new Error("");
        }
        this.menuItems = response.data;
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      })
  }
}

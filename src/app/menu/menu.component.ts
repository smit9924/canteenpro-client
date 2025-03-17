import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { PreLoaderService } from '../services/pre-loader.service';
import { IAPIResponse, ICreateItemModel, IMediaDataModel } from '../common/models/interfaces';
import { API_MENU_ITEMS } from '../common/apiConstants';
import { FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY } from '../common/appConstants';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE } from '../common/appEnums';

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
  public FOOD_ITEM_TYPE = FOOD_ITEM_TYPE
  public menuItems: ICreateItemModel[] = [];

  constructor(
    private dataService: DataService,
    private toastService: ToastService,
    private preloaderService: PreLoaderService
  ) {}

  public ngOnInit(): void {
    this.fetchMenuData();
  }

  public getImageURL(imageData: IMediaDataModel | undefined): string {
    if(imageData) {
      const imageURL = FILE_UPLOAD_URL + IMAGE_FILE_DIRECTORTY + imageData.guid + '.' + imageData.extension;
      return imageURL;
    }
    return "";
  }

  public getItemQuantityWithUnit(quantity: number, unitType: FOOD_ITEM_QUANTITY_UNIT): string {
    let quantityWithUnit = `${quantity} `;
    switch(unitType) {
      case FOOD_ITEM_QUANTITY_UNIT.PIECES:
        quantityWithUnit += 'pcs.';
        break;
      case FOOD_ITEM_QUANTITY_UNIT.GRAM:
        quantityWithUnit += 'gm';
        break;
    }

    return quantityWithUnit;
  }

  private fetchMenuData(): void {
    this.preloaderService.show();

    this.dataService.get(API_MENU_ITEMS)
      .then((response: IAPIResponse<ICreateItemModel[]>) => {
        if(!response.success) {
          throw new Error("");
        }
        this.menuItems = response.data;
        console.log(this.menuItems)
        this.preloaderService.hide();
      } )
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      })
  }
}

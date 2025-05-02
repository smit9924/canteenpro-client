import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY, ORDER_HISTORY_PAGE, QUERY_PARAM_KEY_GUID } from '../common/appConstants';
import { DataService } from '../services/data.service';
import { PreLoaderService } from '../services/pre-loader.service';
import { API_ORDERS } from '../common/apiConstants';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE, ORDER_STATUS } from '../common/appEnums';
import { IMediaDataModel } from '../common/models/interfaces';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  public ORDER_STATUS = ORDER_STATUS;
  public FOOD_ITEM_TYPE = FOOD_ITEM_TYPE;
  public orderDetails!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private preloaderService: PreLoaderService
  ) { }

  ngOnInit(): void {
    this.fetchOrderData();
  }

  public get orderGuid(): string | null {
    let guid: string | null = this.route.snapshot.queryParamMap.get(QUERY_PARAM_KEY_GUID);
    return guid;
  }

  public fetchOrderData(): void {
    this.preloaderService.hide();
    this.dataService.get(`${API_ORDERS}?${QUERY_PARAM_KEY_GUID}=${this.orderGuid}`)
      .then((response) => {
        console.log(response);
        this.orderDetails = response.data;
      })
      .catch((e) => {
        console.error(e);
      })
  }

  public goBack(): void {
    this.router.navigateByUrl(ORDER_HISTORY_PAGE)
  }

  public getProgressBarWidth(): string {
    let percentage = 0;
    switch (this.orderDetails?.orderStatus) {
      case ORDER_STATUS.PLACED:
        percentage = 25;
        break;
      case ORDER_STATUS.COOKING:
        percentage = 50;
        break;
      case ORDER_STATUS.COMPLETED:
        percentage = 75
        break;
      case ORDER_STATUS.DELIVERED:
        percentage = 100;
    }

    return `width: ${percentage}%`
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
    if (this.orderDetails?.orderItems.length === 0) {
      return 0;
    }
    let subTotal = 0;
    this.orderDetails?.orderItems.forEach((item: { price: number; itemCount: number; }) => {
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

  public isOrderPlaced(orderStatus: ORDER_STATUS): boolean {
    return orderStatus === ORDER_STATUS.PLACED
      || orderStatus === ORDER_STATUS.COOKING
      || orderStatus === ORDER_STATUS.COMPLETED
      || orderStatus === ORDER_STATUS.DELIVERED;
  }

  public isOrderCooked(orderStatus: ORDER_STATUS): boolean {
    return orderStatus === ORDER_STATUS.COOKING
      || orderStatus === ORDER_STATUS.COMPLETED
      || orderStatus === ORDER_STATUS.DELIVERED;
  }

  public isOrderCompleted(orderStatus: ORDER_STATUS): boolean {
    return  orderStatus === ORDER_STATUS.COMPLETED
      || orderStatus === ORDER_STATUS.DELIVERED;
  }

  public isOrderDelivered(orderStatus: ORDER_STATUS): boolean {
    return orderStatus === ORDER_STATUS.DELIVERED;
  }
}

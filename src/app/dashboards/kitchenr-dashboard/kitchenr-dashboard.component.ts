import { Component } from '@angular/core';
import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TYPE, ORDER_STATUS, TOAST_TYPE } from '../../common/appEnums';
import { CommonModule } from '@angular/common';
import { IMediaDataModel, IToastEventData } from '../../common/models/interfaces';
import { FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY, QUERY_PARAM_KEY_GUID, QUERY_PARAM_STATUS } from '../../common/appConstants';
import { DataService } from '../../services/data.service';
import { PreLoaderService } from '../../services/pre-loader.service';
import { API_PENDING_ORDERS_LIST, API_UPDATE_ORDER_STATUS } from '../../common/apiConstants';
import { ToastService } from '../../services/toast.service';

const SUCCESS_TOAST_DATA: IToastEventData = {
  type: TOAST_TYPE.SUCCESS,
  message: "Order status updated successfully"
}

@Component({
  selector: 'app-kitchenr-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './kitchenr-dashboard.component.html',
  styleUrl: './kitchenr-dashboard.component.scss'
})
export class KitchenrDashboardComponent {
  public ordersData: any = [];
  public FOOD_ITEM_TYPE = FOOD_ITEM_TYPE;
  public ORDER_STATUS = ORDER_STATUS;

  constructor(
    private dataService: DataService,
    private preloaderService: PreLoaderService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.preloaderService.show();
    this.dataService.get(API_PENDING_ORDERS_LIST)
      .then((response) => {
        this.ordersData = response.data
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      })
  }

  public getImageURL(imageData: any): string {
      if (imageData) {
        const imageURL = FILE_UPLOAD_URL + IMAGE_FILE_DIRECTORTY + imageData.guid + '.' + imageData.extension;
        return imageURL;
      }
      return "";
    }

  public getItemQuantityWithUnit(quantity: number, unitType: any): string {
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

  updateOrderStatus(orderGuid: string, newStatus: ORDER_STATUS): void {
    this.preloaderService.show();
    this.dataService.get(`${API_UPDATE_ORDER_STATUS}?${QUERY_PARAM_KEY_GUID}=${orderGuid}&${QUERY_PARAM_STATUS}=${newStatus}`)
      .then((response) => {
        this.ordersData.forEach((order: { orderId: string; orderStatus: ORDER_STATUS; }) => {
          if(order.orderId === orderGuid) {
            order.orderStatus = newStatus;
          }
        })
        this.toastService.enque(SUCCESS_TOAST_DATA);
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
        this.preloaderService.hide();
      })
  }

  getStatusClass(status: ORDER_STATUS): string {
    switch (status) {
      case ORDER_STATUS.PLACED:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case ORDER_STATUS.COOKING:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case ORDER_STATUS.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200';
      case ORDER_STATUS.DELIVERED:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    } else {
      const diffHrs = Math.floor(diffMins / 60);
      return `${diffHrs} hr${diffHrs === 1 ? '' : 's'} ago`;
    }
  }

  public getOrderStatus(orderStatus: ORDER_STATUS): string {
      switch(orderStatus) {
        case ORDER_STATUS.NOT_PLACED:
          return "not placed";
  
        case ORDER_STATUS.PLACED:
          return "placed";
  
        case ORDER_STATUS.COOKING:
          return "cooking";
  
        case ORDER_STATUS.COMPLETED:
          return "completed";
  
        case ORDER_STATUS.DELIVERED:
          return "delivered"
  
        case ORDER_STATUS.CANCELLED:
          return "cancelled";
  
        default:
          return "";
      }
    }
  
}

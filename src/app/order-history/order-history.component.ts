import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ORDER_DETAIL_PAGE, QUERY_PARAM_KEY_GUID } from '../common/appConstants';
import { Router } from '@angular/router';
import { PreLoaderService } from '../services/pre-loader.service';
import { DataService } from '../services/data.service';
import { API_ORDERS_LIST } from '../common/apiConstants';
import { ORDER_STATUS } from '../common/appEnums';
import { IAPIResponse, IOrderList } from '../common/models/interfaces';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: Date;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'completed' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: string;
    lastFour: string;
  };
}


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  public ORDER_STATUS = ORDER_STATUS;
  public orderData: IOrderList[] = [];

  constructor(
    private router: Router,
    private preloaderService: PreLoaderService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.fetchOrderData();
  }

  private fetchOrderData(): void {
    this.preloaderService.show();
    this.dataService.get(API_ORDERS_LIST)
      .then((response: IAPIResponse<IOrderList[]>) => {
        this.orderData = response.data;
        console.log(response);
        this.preloaderService.hide();
      })
      .catch((e) => {
        console.error(e);
      });
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

  public cancelOrder(orderGuid: string): void {

  }

  public filterByStatus(event: any) {

  }

  public exportOrders(): void {

  }

  public searchOrders(event: any): void {

  }

  public viewOrderDetails(orderGuid: string): void {
    this.router.navigateByUrl(`${ORDER_DETAIL_PAGE}?${QUERY_PARAM_KEY_GUID}=${orderGuid}`);
  }
}

import { IOrderItemQuantity, IPlaceOrder } from "./interfaces";

export class PlaceOrderModel {
    public orderItems: IOrderItemQuantity[];
    public instructions: string;
    public canteenGuid: string;

    constructor() {
        this.orderItems = [];
        this.instructions = "";
        this.canteenGuid = "";
    }

    public import(data: IPlaceOrder) {
        this.orderItems = data.orderItems;
        this.instructions = data.instructions;
        this.canteenGuid = data.canteenGuid;
    }
}
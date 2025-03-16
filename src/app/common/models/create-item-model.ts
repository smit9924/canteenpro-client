import { FILE_UPLOAD_URL, IMAGE_FILE_DIRECTORTY, UPLOAD_IMAGE_DEFAULT_URL } from "../appConstants";
import { CANTEEN_TYPE, FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TASTE, FOOD_ITEM_TYPE } from "../appEnums";
import { isNullOrEmpty } from "../utils";
import { ICreateItemModel } from "./interfaces";
import { MediaDataModel } from "./media-data-model";

export class CreateItemModel {
    public guid: string;
    public isEditMode: boolean;
    public itemName: string;
    public description: string;
    public quantity: number;
    public quantityUnit: FOOD_ITEM_QUANTITY_UNIT;
    public type: FOOD_ITEM_TYPE;
    public taste: FOOD_ITEM_TASTE;
    public price: number;
    public imageURL: string;
    public imageData: MediaDataModel;

    constructor() {
        this.guid = "";
        this.isEditMode = false;
        this.itemName = "";
        this.description = "";
        this.quantity = 0;
        this.quantityUnit = FOOD_ITEM_QUANTITY_UNIT.NOT_SELECTED;
        this.type = FOOD_ITEM_TYPE.NOT_SELECTED;
        this.taste = FOOD_ITEM_TASTE.NOT_SELECTED;
        this.price = 0;
        this.imageURL = "";
        this.imageData = new MediaDataModel();
    }

    public import(data: ICreateItemModel) {
        this.guid = data.guid ? data.guid : "";
        this.isEditMode = data.isEditMode ? data.isEditMode : false;
        this.itemName = data.itemName;
        this.description = data.description;
        this.quantity = data.quantity;
        this.quantityUnit = data.quantityUnit;
        this.type = data.type
        this.taste = data.taste;
        this.price = data.price;
        this.imageURL = data.imageURL ? data.imageURL : "";
        if (data.imageData !== null && data.imageData !== undefined) {
            this.imageData.import(data.imageData)
        }
    }

    public isValid(): boolean {
        return ((this.isEditMode && !isNullOrEmpty(this.guid))
            || (!this.isEditMode && isNullOrEmpty(this.guid)))
            && !isNullOrEmpty(this.itemName)
            && this.quantity !== 0
            && this.quantityUnit !== FOOD_ITEM_QUANTITY_UNIT.NOT_SELECTED
            && this.taste !== FOOD_ITEM_TASTE.NOT_SELECTED
            && this.type !== FOOD_ITEM_TYPE.NOT_SELECTED
            && this.price !== 0
            && (!isNullOrEmpty(this.imageURL) || this.imageData.isValid());
    }

    public setImageURL(): void {
        if (!isNullOrEmpty(this.imageData.guid) && !isNullOrEmpty(this.imageData.extension)) {
            this.imageURL = FILE_UPLOAD_URL + IMAGE_FILE_DIRECTORTY + this.imageData.guid + '.' + this.imageData.extension;
        } else {
            this.imageURL = UPLOAD_IMAGE_DEFAULT_URL;
        }
    }
}
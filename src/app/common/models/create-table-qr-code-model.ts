import { isNullOrEmpty } from "../utils";
import { ICreateTableQRCode } from "./interfaces";
import { MediaDataModel } from "./media-data-model";

export class CreateTableQRCodeModel {
    public isEditMode: boolean;
    public guid: string;
    public name: string;
    public selfServiceQRCode: boolean;
    public number: number;
    public capacity: number;
    public qrImageURL: string;

    constructor() {
        this.isEditMode = false;
        this.guid = "";
        this.selfServiceQRCode = false;
        this.name = "";
        this.number = 0;
        this.capacity = 0;
        this.qrImageURL = "";
    }

    public import(data: ICreateTableQRCode) {
        this.guid = data.guid ? data.guid : "";
        this.selfServiceQRCode = data.selfServiceQRCode;
        this.name = data.name ? data.name : '';
        this.number = data.number;
        this.capacity = data.capacity;
        this.qrImageURL = data.qrImageURL != null ? data.qrImageURL : "";
    }

    public isValid(): boolean {
        return ((this.capacity > 0 && this.number > 0) || this.selfServiceQRCode)
            && !isNullOrEmpty(this.name);
    }
    
}
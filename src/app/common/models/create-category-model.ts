import { USER_ROLES } from "../appEnums";
import { isNullOrEmpty } from "../utils";
import { ICreateCategoryModel, IUpsertUserModel } from "./interfaces";
import { MediaDataModel } from "./media-data-model";

export class CreateCategotyModel {
    public isEditMode: boolean;
    public guid: string;
    public categoryName: string;
    public description: string;
    public imageURL: string;
    public imageData: MediaDataModel;

    constructor(
        isEditMode: boolean = false
    ) {
        this.isEditMode = isEditMode
        this.guid = "";
        this.categoryName = "";
        this.description = "";
        this.imageURL = "";
        this.imageData = new MediaDataModel();
    }

    public import(data: ICreateCategoryModel) {
        this.isEditMode = data.isEditMode ? data.isEditMode : false;
        this.guid = data.guid ? data.guid : "";
        this.categoryName = data.categoryName;
        this.description = data.description;
        this.imageURL = data.image
        if(data.imageData !== null && data.imageData !== undefined) {
            this.imageData.import(data.imageData);
        }
    }

    public isValid(): boolean {
        return !isNullOrEmpty(this.categoryName)
            && !isNullOrEmpty(this.description)
            && !isNullOrEmpty(this.imageURL);
    }
}
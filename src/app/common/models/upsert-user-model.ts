import { USER_ROLES } from "../appEnums";
import { isNullOrEmpty } from "../utils";
import { IUpsertUserModel } from "./interfaces";

export class UpsertUserModel {
    public isEditMode: boolean;
    public guid: string;
    public userType: number;
    public firstname: string;
    public lastname: string;
    public email: string;

    constructor(
        isEditMode: boolean = false
    ) {
        this.isEditMode = isEditMode
        this.guid = "";
        this.userType = USER_ROLES.WAITER;
        this.firstname = "";
        this.lastname = "";
        this.email = "";
    }

    public import(data: IUpsertUserModel) {
        this.isEditMode = data.isEditMode ? data.isEditMode : false;
        this.guid = data.guid ? data.guid : "";
        this.userType = data.userType;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
    }

    public isValid(): boolean {
        return !isNullOrEmpty(this.firstname)
            && !isNullOrEmpty(this.lastname)
            && !isNullOrEmpty(this.email);
    }
}
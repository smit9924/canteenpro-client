import { isNullOrEmpty } from "../utils";

export class CreateUserModel {
    public firstname: string;
    public lastname: string;
    public email: string;

    constructor() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
    }

    public isValid(): boolean {
        return !isNullOrEmpty(this.firstname)
            && !isNullOrEmpty(this.lastname)
            && !isNullOrEmpty(this.email);
    }
}
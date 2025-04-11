import { isNullOrEmpty } from "../utils";
import { IContactUsSubject as IContactUsSubject } from "./interfaces";

export class ContactUsSubjectModel {
    public guid: string;
    public subject: string;

    constructor() {
        this.guid = "";
        this.subject = "";
    }

    public import(data: IContactUsSubject) {
        this.guid = data.guid
        this.subject = data.subject;
    }

    public isValid(): boolean {
        return !isNullOrEmpty(this.subject);
    }
}
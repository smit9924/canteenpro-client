import { isNullOrEmpty } from "../utils";
import { ContactUsSubjectModel } from "./contact-us-subject-model";
import { IContactUsForm } from "./interfaces";

export class ContactUsFormModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public countryCode: string;
    public contactNo: string;
    public subject: ContactUsSubjectModel;
    public customSubject: string;
    public message: string;
    public sendUpdateMessage: boolean;

    constructor() {
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.countryCode = ""
        this.contactNo = ""
        this.subject = new ContactUsSubjectModel();
        this.customSubject = ""
        this.message = ""
        this.sendUpdateMessage = false;
    }

    public import(data: IContactUsForm) {
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.email = data.email
        this.contactNo = data.countryCode
        this.contactNo = data.contactNo
        this.subject.import(data.subject);
        this.customSubject = data.customSubject
        this.message = data.message
        this.sendUpdateMessage = data.sendUpdateMessage;
    }

    public isValid(): boolean {
        return !isNullOrEmpty(this.firstName)
        && !isNullOrEmpty(this.lastName)
        && !isNullOrEmpty(this.email)
        && ((!isNullOrEmpty(this.countryCode) && !isNullOrEmpty(this.contactNo))
        || isNullOrEmpty(this.countryCode) && isNullOrEmpty(this.contactNo))
        && (this.subject.isValid() || !isNullOrEmpty(this.customSubject))
        && !isNullOrEmpty(this.message);
    }
}
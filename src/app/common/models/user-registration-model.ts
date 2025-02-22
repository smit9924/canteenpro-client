import { isNullOrEmpty } from "../utils";

export class AddressModel {
    public shop: string;
    public apartment: string;
    public area: string;
    public landmark: string;
    public city: string;
    public state: string;
    public country: string;
    public zipcode: string;

    constructor() {
        this.shop = "";
        this.apartment = "";
        this.area = "";
        this.landmark = "";
        this.city = "";
        this.state = "";
        this.country = "";
        this.zipcode = "";
    }

    public isValid(): boolean {
        return !isNullOrEmpty(this.shop) && !isNullOrEmpty(this.apartment)
            && !isNullOrEmpty(this.area) && !isNullOrEmpty(this.city)
            && !isNullOrEmpty(this.state) && !isNullOrEmpty(this.country)
            && this.isZipcodeValid(this.zipcode);
    }

    public isZipcodeValid(zipcode: string): boolean {
        const pinCodeRegex = /^[1-9][0-9]{5}$/;
        return pinCodeRegex.test(zipcode);
    }
}

export class CanteenDetailsMode extends AddressModel {
    public canteenName: string;
    public canteenType: number;

    constructor() {
        super();
        this.canteenName = "";
        this.canteenType = 0;
    }

    public override isValid(): boolean {
        return super.isValid()
            && !isNullOrEmpty(this.canteenName)
            && this.canteenType !== 0;
    }
}
export class UserRegistrationModel extends CanteenDetailsMode {
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    public passwordErrorMessage: string = "Password is required."
    
    constructor() {
        super();
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.password = "";
    }

    public override isValid(): boolean {
        return super.isValid()
            && !isNullOrEmpty(this.firstname)
            && !isNullOrEmpty(this.lastname)
            && !isNullOrEmpty(this.email)
            && this.isPasswordValid();
    }

    public isPasswordValid():boolean {
        const passwordStrengthValidationRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(isNullOrEmpty(this.password)) {
            this.passwordErrorMessage = "Password is required!";
            return false;
        } else if (this.password.length < 6) {
            this.passwordErrorMessage = "Password should be atleast 6 characters long.";
            return false;
        } else if (!passwordStrengthValidationRegex.test(this.password)) {
            this.passwordErrorMessage = "Password must contain atleast 1 digit, 1 capial letter and 1 special character."
            return false
        }

        return true;
    }
}
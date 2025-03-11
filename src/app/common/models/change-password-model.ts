import { isNullOrEmpty } from "../utils";

export class ChangePasswordModel {
    public password: string;
    public passwordErrorMessage: string = "Password is required."

    constructor() {
        this.password = "";
    }

    public isValid(): boolean {
        return this.isPasswordValid();
    }

    public isPasswordValid(): boolean {
        const passwordStrengthValidationRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (isNullOrEmpty(this.password)) {
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
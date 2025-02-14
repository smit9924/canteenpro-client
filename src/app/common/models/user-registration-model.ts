export class UserRegistrationModel {
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    
    constructor() {
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.password = "";
    }
}
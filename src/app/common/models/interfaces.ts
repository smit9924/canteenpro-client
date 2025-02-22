import { USER_ROLES } from "../appEnums";

// JWT response interface to catct token
export interface IJwtResponse {
    exp: number;
    iat: number;
    role: USER_ROLES;
    sub: string;
}
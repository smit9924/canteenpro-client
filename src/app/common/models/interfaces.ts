import { TOAST_TYPE, USER_ROLES } from "../appEnums";

// JWT token decoded information
export interface IJwtDecodedData {
    exp: number;
    iat: number;
    role: USER_ROLES;
    sub: string;
}

export interface IToastEventData {
  type: TOAST_TYPE,
  message: string
}

// *** interface for API responses ***
export interface IAPIResponse<T> {
  data: T;
  success: boolean;
  exception: string;
  message: string;
}

export interface IAuthSuccessData {
  token: string;
}
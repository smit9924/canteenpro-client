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

export interface IKeyValue<T> {
  [key: string]: T
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

export interface IRoleList {
  role: string,
  level: number
}

export interface IUserListing {
  guid: string;
  email: string;
  firstname: string;
  lastname: string;
  dateCreated: string;
  dateEdited: string;
}

export interface IUpsertUserModel {
  isEditMode?: boolean;
  guid?: string;
  userType: number;
  firstname: string;
  lastname: string;
  email: string;
}
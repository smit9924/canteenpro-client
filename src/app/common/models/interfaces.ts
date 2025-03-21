import { FOOD_ITEM_QUANTITY_UNIT, FOOD_ITEM_TASTE, FOOD_ITEM_TYPE, TOAST_TYPE, USER_ROLES } from "../appEnums";

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

export interface IMediaDataModel {
  guid?: string;
  fileName: string;
  extension: string;
  initiallyUploadedOn?: string;
  latestUploadOn?: string;
}

export interface ICreateCategoryModel {
  isEditMode?: boolean;
  guid?: string;
  categoryName: string;
  description: string;
  image: string;
  imageData?: IMediaDataModel;
}

export interface IUserProfile {
  firstname: string;
  lastname: string;
  email: string;
  guid: string;
  defaultPasswordUpdated: boolean;
  roleLevel: number;
}

export interface ICategoryListing {
  categoryName: string;
  guid: string;
  dateCreated: string;
  dateEdited: string;
}

export interface IFoodItemsCategories {
  categoryName: string;
  guid: string;
}

export interface IItemListing {
  guid: string;
  itemName: string;
  quantity: number;
  quantityUnit: FOOD_ITEM_QUANTITY_UNIT;
  price: number;
  type: FOOD_ITEM_TYPE;
  dateCreated: string;
  dateEdited: string;
}

export interface ICreateItemModel {
  guid?: string;
  isEditMode?: boolean;
  itemName: string;
  description: string;
  quantity: number;
  quantityUnit: FOOD_ITEM_QUANTITY_UNIT;
  type: FOOD_ITEM_TYPE;
  taste: FOOD_ITEM_TASTE;
  price: number;
  imageURL?: string;
  imageData?: IMediaDataModel;
  categories: IFoodItemsCategories[];
}

export interface IMenuCategories {
  guid: string,
  name: string,
  description: string,
}
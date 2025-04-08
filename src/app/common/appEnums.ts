export enum REQUEST_TYPE {
  GET = 0,
  POST = 1
}

export enum JS_EVENT_TYPES {
  CLICK = "CLICK"
}

export enum USER_ROLES {
  ADMIN = 1,
  OWNER = 2,
  MANAGER = 3,
  KITCHENER = 4,
  WAITER = 5,
  CASHIER = 6,
  CUSTOMER = 7
}

export enum CANTEEN_TYPE {
  VEG = 1,
  NON_VEG = 2,
  Veg_NON_VEG = 3
}

export enum TOAST_TYPE {
  SUCCESS = 1,
  ERROR = 2,
  WARNING = 3,
  INFO = 4
}

export enum ITEM_LISTIN_TAB_TYPE {
  CATEGORIES = 1,
  ITEMS = 2
}

export enum FOOD_ITEM_TYPE {
  NOT_SELECTED = 0,
  VEG = 1,
  NON_VEG = 2,
}

export enum FOOD_ITEM_TASTE {
  NOT_SELECTED = 0,
  NORMAL = 1,
  SWEET = 2,
  SPICY = 3,
}

export enum FOOD_ITEM_QUANTITY_UNIT {
  NOT_SELECTED = 0,
  PIECES = 1,
  GRAM = 2,
  MILLI_LITER = 3
}

export enum UPDATE_ITEM_QUANTITY_TYPE {
  ADD = 1,
  INCREASE = 2,
  DECREASE = 3
}
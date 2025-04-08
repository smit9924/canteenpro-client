export const SERVER_BASE_URL = "http://localhost:8080/";

// Authentication urls
export const AUTH_BASE_URL = SERVER_BASE_URL + "api/auth/";
export const SIGNUP_API = AUTH_BASE_URL + "signup";
export const LOGIN_API = AUTH_BASE_URL + "login";
export const USER_ROLES_API = AUTH_BASE_URL + "roles";
export const API_CHANGE_DEFAULT_PASSWORD = AUTH_BASE_URL + "changedefaultpassword";
export const API_CUSTOMER_LOGIN_SEND_OTP = AUTH_BASE_URL + "customer/sendotp";
export const API_CUSTOMER_LOGIN = AUTH_BASE_URL + "customer/login";
// end

// USER CRUD APIs
export const API_USER_CRUD = SERVER_BASE_URL + "api/user";
export const API_USER_LISTING = API_USER_CRUD + "/list/";
export const API_USER_PROFILE = API_USER_CRUD + "/profile";


// FOOD MANAGEMENT CRUD APIs
export const API_FOOD_MANAGEMENT_CRUD = SERVER_BASE_URL + "api/food/";
export const API_CATEGORY_CRUD = API_FOOD_MANAGEMENT_CRUD + "category";
export const API_CATEGORY_LISTING = API_FOOD_MANAGEMENT_CRUD + "category/listing";
export const API_FOOD_ITEM_CRUD = API_FOOD_MANAGEMENT_CRUD + "item";
export const API_FOOD_ITEM_LISTING = API_FOOD_MANAGEMENT_CRUD + "item/listing";
export const API_MENU_ITEMS = API_FOOD_MANAGEMENT_CRUD + "menu/items";
export const API_MENU_CATEGORY = API_FOOD_MANAGEMENT_CRUD + "menu/category";
export const API_ADD_MENU_ITEM_IN_CART = API_FOOD_MANAGEMENT_CRUD + "menu/items/add";
export const API_INCREASE_MENU_ITEM_QUANTITY = API_FOOD_MANAGEMENT_CRUD + "menu/items/increase";
export const API_DECREASE_MENU_ITEM_QUANTITY = API_FOOD_MANAGEMENT_CRUD + "menu/items/decrease";

// Cart management APIs
export const API_CART_MANAGEMENT = SERVER_BASE_URL + "api/cart/";
export const API_CART_ITEM_CRUD = API_CART_MANAGEMENT + "item";
export const API_CART_ITEM_INCREASE_COUNT = API_CART_MANAGEMENT + "item/increase";
export const API_CART_ITEM_DECREASE_COUNT = API_CART_MANAGEMENT + "item/decrease";

// QR Coed CRUP APIS
export const API_QR_CODE_CRUD = SERVER_BASE_URL + "api/qr";
export const API_QR_CODE_LISTING = API_QR_CODE_CRUD +  "/list"
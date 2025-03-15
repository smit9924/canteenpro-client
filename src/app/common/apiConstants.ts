export const SERVER_BASE_URL = "http://localhost:8080/";

// Authentication urls
export const AUTH_BASE_URL = SERVER_BASE_URL + "api/auth/";
export const SIGNUP_API = AUTH_BASE_URL + "signup";
export const LOGIN_API = AUTH_BASE_URL + "login";
export const USER_ROLES_API = AUTH_BASE_URL + "roles";
export const API_CHANGE_DEFAULT_PASSWORD = AUTH_BASE_URL + "changedefaultpassword";
// end

// USER CRUD APIs
export const API_USER_CRUD = SERVER_BASE_URL + "api/user";
export const API_USER_LISTING = API_USER_CRUD + "/list/";
export const API_USER_PROFILE = API_USER_CRUD + "/profile";


// FOOD MANAGEMENT CRUD APIs
export const API_FOOD_MANAGEMENT_CRUD = SERVER_BASE_URL + "api/food/";
export const API_CATEGORY_CRUD = API_FOOD_MANAGEMENT_CRUD + "category";
export const API_CATEGORY_LISTING = API_FOOD_MANAGEMENT_CRUD + "category/listing";
export const API_FOOD_ITEM_CRUD = SERVER_BASE_URL + "api/food/item";
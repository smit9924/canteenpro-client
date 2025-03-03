export const SERVER_BASE_URL = "http://localhost:8080/";

// Authentication urls
export const AUTH_BASE_URL = SERVER_BASE_URL + "api/auth/";
export const SIGNUP_API = AUTH_BASE_URL + "signup";
export const LOGIN_API = AUTH_BASE_URL + "login";
export const USER_ROLES_API = AUTH_BASE_URL + "roles";
// end

// USER CRUD APIs
export const USER_CRUD_BASE_URL = SERVER_BASE_URL + "api/user/";
export const CREATE_MANAGER = USER_CRUD_BASE_URL + "create/manager"
export const MANAGER_LISTING = USER_CRUD_BASE_URL + "manager"

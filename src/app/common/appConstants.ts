// **Internal routes realated constatns**
export const LOGIN_PAGE = "/auth/login";
export const SIGNUP_PAGE = "/auth/signup";
export const UPDATE_DEFAULT_PASSWORD_PAGE = "/auth/change-default-password";
export const DASHBOARD_PAGE = "/dashboard";
export const USER_LISTING_BASE_ROUTE = "users/";
export const CREATE_USER_BASE_ROUTE = "user/create/";
export const CREATE_CATEGORY_PAGE = "/food-items/create/category";
export const CREATE_FOOD_ITEM_PAGE = "/food-items/create";
export const CATEGORY_AND_ITEM_LISTING_PAGE = "/food-items";
export const FODD_ITEM_CART_PAGE = "/food-items/cart";
export const CONTACT_US_PAGE = "contact";
export const ERROR_PAGE = "/error";

// Local storage key values
export const LOCAL_STORAGE_TOKEN = "jwtAuthToken";

// Input field type 
export const INPUT_FIELD_TYPE_TEXT = "text";
export const INPUT_FIELD_TYPE_PASSWORD = "password";

// Query parameters related constants
export const QUERY_PARAM_KEY_GUID = 'guid';
export const QUERY_PARAM_ROLE = 'role';
export const QUERY_PARAM_CATEGORY = 'category';

// File upload
export const UPLOAD_IMAGE_DEFAULT_URL = '/assets/images/upload-image-incognito.jpg';
export const BUCKET_BASE_URL = "https://storage.googleapis.com/";
export const BUCKET_NAME = "walkinportal-fe11c.appspot.com/";
export const FILE_UPLOAD_URL = BUCKET_BASE_URL + BUCKET_NAME;
export const IMAGE_FILE_DIRECTORTY = "image/";

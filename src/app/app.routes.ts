import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorpageComponent } from './common/components/errorpage/errorpage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authDeactivationGuard } from './guards/auth-deactivation.guard';
import { DashboardWrapperComponent } from './dashboards/dashboard-wrapper/dashboard-wrapper.component';
import { authActicvationGuard } from './guards/auth-activation.guard';
import { OwnerListingComponent } from './listing/owner-listing/owner-listing.component';
import { UserListingComponent } from './listing/manager-listing/user-listing.component';
import { KitchenStaffListingComponent } from './listing/kitchen-staff-listing/kitchen-staff-listing.component';
import { TableQrCodeListingComponent } from './listing/table-qr-code-listing/table-qr-code-listing.component';
import { CanteenListingComponent } from './listing/canteen-listing/canteen-listing.component';
import { AdminListingComponent } from './listing/admin-listing/admin-listing.component';
import { CreateUserComponent } from './listing/create-user/create-user.component';
import { USER_ROLES } from './common/appEnums';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangeDefaultPasswordComponent } from './auth/change-default-password/change-default-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { CustomerLoginComponent } from './auth/customer-login/customer-login.component';
import { FoodItemsListingComponent } from './listing/food-items/food-items-listing.component';
import { CreateCategoryComponent } from './listing/create-category/create-category.component';
import { AddItemComponent } from './listing/add-item/add-item.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { CreateTableQrComponent } from './listing/create-table-qr/create-table-qr.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const routes: Routes = [
    { 
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [authDeactivationGuard]
    },
    { 
        path: 'auth/login/customer',
        component: CustomerLoginComponent,
        canActivate: [authDeactivationGuard]
    },
    { 
        path: 'auth/signup', 
        component: SignupComponent,
        canActivate: [authDeactivationGuard]
    },
    { 
        path: 'users/:role', 
        component: UserListingComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.MANAGER, USER_ROLES.CASHIER, USER_ROLES.KITCHENER, USER_ROLES.WAITER]

            // TODO: Instead of allow all user make route accessed based on user
            // allowedRoles: (route: ActivatedRouteSnapshot) => {
            //     console.log(getUserListingRouteAccess(route.params['role'] as USER_ROLES));
            //     getUserListingRouteAccess(route.params['role'] as USER_ROLES);
            // }
        }
    },
    { 
        path: 'food-items', 
        component: FoodItemsListingComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.OWNER, USER_ROLES.MANAGER]
        }
    },
    { 
        path: 'food-items/create/category', 
        component: CreateCategoryComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.OWNER, USER_ROLES.MANAGER]
        }
    },
    { 
        path: 'food-items/create', 
        component: AddItemComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.OWNER, USER_ROLES.MANAGER]
        }
    },
    { 
        path: 'food-items/menu', 
        component: MenuComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.CUSTOMER]
        }
    },
    { 
        path: 'food-items/cart', 
        component: CartComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.CUSTOMER]
        }
    },
    { 
        path: 'qr', 
        component: TableQrCodeListingComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.OWNER, USER_ROLES.MANAGER]
        }
    },
    { 
        path: 'order-history', 
        component: OrderHistoryComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.CUSTOMER]
        }
    },
    { 
        path: 'order-details', 
        component: OrderDetailsComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.CUSTOMER]
        }
    },
    { 
        path: 'qr/create', 
        component: CreateTableQrComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.OWNER, USER_ROLES.MANAGER]
        }
    },
    { 
        path: 'canteen', 
        component: CanteenListingComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: []
        }
    },
    { 
        path: 'dashboard', 
        component: DashboardWrapperComponent,
        data: {
            allowedRoles: []
        }
    },
    { 
        path: 'contact', 
        component: ContactUsComponent,
        data: {
            allowedRoles: []
        }
    },
    { 
        path: 'user/create/:role', 
        component: CreateUserComponent,
        canActivate: [authActicvationGuard],
        data: {
            allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.MANAGER, USER_ROLES.CASHIER, USER_ROLES.KITCHENER, USER_ROLES.WAITER]
        }
    },
    { 
        path: 'auth/change-password', 
        component: ChangePasswordComponent,
    },
    { 
        path: 'auth/change-default-password', 
        component: ChangeDefaultPasswordComponent,
    },
    { 
        path: '', 
        component: LandingPageComponent
    },
    { 
        path: 'error', 
        component: ErrorpageComponent 
    },
    { 
        path: '**', 
        component: ErrorpageComponent 
    },
];

function getUserListingRouteAccess(role: USER_ROLES): USER_ROLES[] {
    switch(role) {
        case USER_ROLES.ADMIN:
            return [USER_ROLES.ADMIN];

        case USER_ROLES.OWNER:
            return [USER_ROLES.ADMIN, USER_ROLES.OWNER];

        case USER_ROLES.MANAGER:
            return [USER_ROLES.ADMIN, USER_ROLES.OWNER, USER_ROLES.MANAGER];

        case USER_ROLES.CASHIER:
        case USER_ROLES.KITCHENER:
        case USER_ROLES.WAITER:
            return [USER_ROLES.ADMIN, USER_ROLES.OWNER];
            
        default:
            return [];
    }
}

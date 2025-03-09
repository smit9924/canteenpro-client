import { Routes } from '@angular/router';
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

export const routes: Routes = [
    { 
        path: 'auth/login',
        component: LoginComponent,
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
        canActivate: [authActicvationGuard]
    },
    { 
        path: 'qr', 
        component: TableQrCodeListingComponent,
        canActivate: [authActicvationGuard]
    },
    { 
        path: 'canteen', 
        component: CanteenListingComponent,
        canActivate: [authActicvationGuard]
    },
    { 
        path: 'dashboard', 
        component: DashboardWrapperComponent
    },
    { 
        path: 'contactus', 
        component: ContactUsComponent
    },
    { 
        path: 'user/create/:role', 
        component: CreateUserComponent,
        canActivate: [authActicvationGuard],
        // data: {
        //     allowedRoles: [USER_ROLES.ADMIN]
        // }
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

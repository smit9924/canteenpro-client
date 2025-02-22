import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorpageComponent } from './common/components/errorpage/errorpage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authDeactivationGuard } from './guards/auth-deactivation.guard';
import { DashboardWrapperComponent } from './dashboards/dashboard-wrapper/dashboard-wrapper.component';
import { authActicvationGuard } from './guards/auth-activation.guard';

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
        path: 'dashboard', 
        component: DashboardWrapperComponent
    },
    { 
        path: '', 
        component: LandingPageComponent
    },
    { 
        path: '**', 
        component: ErrorpageComponent 
    },
];

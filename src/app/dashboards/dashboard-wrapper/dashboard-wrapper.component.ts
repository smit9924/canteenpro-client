import { Component } from '@angular/core';
import { BasePageComponent } from '../../common/components/base-page/base-page.component';
import { AuthService } from '../../services/auth.service';
import { USER_ROLES } from '../../common/appEnums';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { OwnerDashboardComponent } from '../owner-dashboard/owner-dashboard.component';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from '../customer-dashboard/customer-dashboard.component';

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    AdminDashboardComponent,
    OwnerDashboardComponent,
    CustomerDashboardComponent
  ],
  templateUrl: './dashboard-wrapper.component.html',
  styleUrl: './dashboard-wrapper.component.scss'
})
export class DashboardWrapperComponent extends BasePageComponent {
  public USER_ROLE = USER_ROLES;
  public role!: USER_ROLES | null;

  constructor(
    private authService: AuthService
  ) {
    super();
    this.role = this.authService.getRole();
  }

  public getUserRole(): USER_ROLES | null {
    return this.authService.getRole();
  }
}

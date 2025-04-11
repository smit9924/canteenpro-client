import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ORDER_HISTORY_PAGE } from '../../common/appConstants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent implements OnInit {
  public ORDER_HISTORY_PAGE = ORDER_HISTORY_PAGE;
  public username: string = "";

  constructor(
    private dataService: DataService
  ) {}

  public async ngOnInit(): Promise<void> {   
    const profileData = await this.dataService.getUserProfileData();
    console.log(profileData)
    this.username = profileData != null ? profileData.firstname : "hello";
  }
}

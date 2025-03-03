import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { CREATE_MANAGER_PAGE } from '../../common/appConstants';
import { DataService } from '../../services/data.service';
import { MANAGER_LISTING } from '../../common/apiConstants';
import { IAPIResponse, IUserListing } from '../../common/models/interfaces';

@Component({
  selector: 'app-manager-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimaryButtonComponent
  ],
  templateUrl: './manager-listing.component.html',
  styleUrl: './manager-listing.component.scss'
})
export class ManagerListingComponent implements OnInit{
  public userListingData: IUserListing[] = [];
  constructor(
    private router: Router,
    private dataService: DataService
  ){}

  public ngOnInit(): void {
    this.fetchListingData();
  }

  public fetchListingData(): void {
    this.dataService.get(MANAGER_LISTING)
      .then((response: IAPIResponse<IUserListing[]>) => {
        if(!response.success) {
          throw Error;
        }
        this.userListingData = response.data;
        console.log('response: ', response.data);
      })
      .catch((ex) => {
        console.error(ex.error.message)
      });
  }

  public onCreatenewManagerClick() {
    this.router.navigateByUrl(CREATE_MANAGER_PAGE);
  }

  public onDeleteClick() {
    console.log('delete button clicked');
  }
}

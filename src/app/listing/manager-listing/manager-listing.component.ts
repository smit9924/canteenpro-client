import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../../common/components/button/primary-button/primary-button.component';
import { CREATE_MANAGER_PAGE } from '../../common/appConstants';

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
export class ManagerListingComponent {
  constructor(
    private router: Router
  ){}

  public onCreatenewManagerClick() {
    this.router.navigateByUrl(CREATE_MANAGER_PAGE);
  }

  public onDeleteClick() {
    console.log('delete button clicked');
  }
}

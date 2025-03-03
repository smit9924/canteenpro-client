import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONTACT_US_PAGE, SIGNUP_PAGE } from '../common/appConstants';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  public SIGNUP_PAGE = SIGNUP_PAGE;
  public CONTACT_US_PAGE = CONTACT_US_PAGE;
}

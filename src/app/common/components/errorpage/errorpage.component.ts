import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  standalone: true,
  imports: [],
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.scss'
})
export class ErrorpageComponent {
  constructor(
    private router: Router
  ) {
  }

  public ngOnInit() {

  }

  public onGoHomeButtonClick() {
    this.router.navigateByUrl("/");
  }
}

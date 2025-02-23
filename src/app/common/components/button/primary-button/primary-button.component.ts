import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { isNullOrEmpty, isNullOrUndefined } from '../../../utils';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  @Input() text: string = "";
  @Input() routerLink: string | null = "";
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onBtnClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) {
  }

  public btnClick(): void {
    this.onBtnClick.emit(true);

    // Navigate to the URL if provided
    if(this.routerLink !== null && this.routerLink !== undefined && !isNullOrEmpty(this.routerLink)) {
      this.router.navigateByUrl(this.routerLink);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss'
})
export class SecondaryButtonComponent {
  @Input() text: string = "";
  @Input() routerLink: string | null = "";
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onbtnClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public btnClick(): void {
    this.onbtnClick.emit(true);
  }
}

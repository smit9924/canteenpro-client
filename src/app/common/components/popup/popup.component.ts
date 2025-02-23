import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PrimaryButtonComponent } from '../button/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../button/secondary-button/secondary-button.component';
import { CommonModule } from '@angular/common';
import { isNullOrUndefined } from '../../utils';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {
  @Input( {required: true} ) heading: string = "";
  @Input( {required: true} ) text: string = "";
  @Input() okBtnVisible: boolean = true;
  @Input() cancelBtnVisible:boolean = false;
  @Input() showPopup: EventEmitter<boolean> = new EventEmitter<boolean>;
  public isPopupVisible: boolean = false;

  public ngOnInit(): void {
    this.showPopup.subscribe((value) => {
      this.isPopupVisible = true;
    });
  }
  public closePopup(): void {
    this.isPopupVisible = false;
  }
}

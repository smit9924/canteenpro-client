import { Component, EventEmitter, Input } from '@angular/core';
import { TOAST_TYPE } from '../../appEnums';
import { BasePageComponent } from '../base-page/base-page.component';
import { isNullOrUndefined } from '../../utils';
import { IToastEventData } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent extends BasePageComponent {
  public TOAST_TYPE = TOAST_TYPE;
  public timer: any = null;
  public isVisible: boolean = false;
  public message: string = "";
  public type: TOAST_TYPE = TOAST_TYPE.SUCCESS

  constructor(
    public toastService: ToastService
  ) {
    super();
  }

  public ngOnInit(): void {
  }
}

import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { IToastEventData } from '../common/models/interfaces';
import { isNullOrUndefined } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class ToastService{
  public showToast: boolean = false;
  public currentData: IToastEventData | undefined = undefined;
  private messageQueue: IToastEventData[] = [];
  private timer: any = null;

  constructor() { }

  public enque(data: IToastEventData): void {
    this.messageQueue.push(data);

    if(isNullOrUndefined(this.timer)) {
      this.executeToastRequests();
    }
  }

  public dequeue(): void{
    this.currentData =  this.messageQueue.pop();
  }

  public executeToastRequests(): void {
    this.showToast = true;
    this.dequeue();
    
    this.timer = setTimeout(() => {
      if(this.messageQueue.length > 0) {
        this.executeToastRequests();
      } else {
        this.showToast = false;
        this.timer = null;
        this.currentData = undefined;
      }
    }, 3000);
  }
}

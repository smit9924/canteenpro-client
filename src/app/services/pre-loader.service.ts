import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreLoaderService {
  public showPreloader: boolean = false;

  constructor() { }

  public show(): void {
    this.showPreloader = true;
  }

  public hide(): void {
    this.showPreloader = false;
  }
}

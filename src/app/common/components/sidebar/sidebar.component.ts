import { Component, Input, SimpleChanges } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent extends BasePageComponent{
  @Input() showSidebar: boolean = false;

  public ngOnChange(changes: SimpleChanges) {
    if(changes['showSidebar'].currentValue === true) {
      this.showSidebar = changes['showSidebar'].currentValue;
    }
  }

  public stopPropogation(event: MouseEvent) {
    event.stopPropagation();
  }
  
  public toggle(event: MouseEvent): void {
    this.showSidebar = false;    
  }
}

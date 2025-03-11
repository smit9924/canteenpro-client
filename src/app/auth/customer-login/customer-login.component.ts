import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent {
}

import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { ToastComponent } from './common/components/toast/toast.component';
import { PreloaderComponent } from './auth/preloader/preloader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    PreloaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'canteenpro-client';
}

import { Component } from '@angular/core';
import { PreLoaderService } from '../../services/pre-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent {
  constructor(
    protected preloaderService: PreLoaderService
  ){}
}

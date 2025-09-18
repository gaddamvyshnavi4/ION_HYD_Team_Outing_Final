import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-caption',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="purple-caption">{{ caption }}</p>
  `,
  styles: [`
    .purple-caption {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,1);
      z-index: 3;
      position: relative;
      background: linear-gradient(90deg, #6A1B9A, #9C27B0);
      padding: 15px 25px;
      border-radius: 25px;
      border: 2px solid rgba(255,255,255,0.4);
      animation: colorShift 3s ease-in-out infinite;
    }

    @keyframes colorShift {
      0% { background: linear-gradient(90deg, #6A1B9A, #9C27B0); }
      50% { background: linear-gradient(90deg, #9C27B0, #AB47BC); }
      100% { background: linear-gradient(90deg, #6A1B9A, #9C27B0); }
    }

    @media (max-width: 768px) {
      .purple-caption {
        font-size: 16px;
      }
    }
  `]
})
export class CarouselCaptionComponent {
  @Input() caption = '';
}
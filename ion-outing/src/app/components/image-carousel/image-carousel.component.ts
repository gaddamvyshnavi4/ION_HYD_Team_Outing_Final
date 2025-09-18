import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselCaptionComponent } from '../carousel-caption/carousel-caption.component';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule, CarouselCaptionComponent],
  template: `
    <div class="carousel-container">
      <div class="carousel-item" *ngFor="let image of images; let i = index" [class.active]="i === currentIndex">
        <img [src]="image.url" [alt]="image.alt" [class.fade-in]="i === currentIndex" />
        <app-carousel-caption [caption]="image.caption" [class.fade-in]="i === currentIndex"></app-carousel-caption>
      </div>
    </div>
  `,
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private intervalId: any;

  images = [
    {
      url: 'assets/images/team2.jpg',
      alt: 'Previous Memories',
      caption: '📸 Let\'s view our previous memories together!',
    },
    {
      url: 'assets/images/team3.jpg',
      alt: 'Fun Activities',
      caption: 'Fun Activities for Everyone',
    },
    {
      url: 'assets/images/team7.jpg',
      alt: 'Outdoor Fun',
      caption: 'Outdoor Adventures',
    },
    {
      url: 'assets/images/team5.jpg',
      alt: 'Team Spirit',
      caption: 'Team Spirit & Unity',
    },
    {
      url: 'assets/images/team6.jpg',
      alt: 'Celebration',
      caption: 'Time to Celebrate!',
    },
    {
      url: 'assets/images/team4.jpg',
      alt: 'Team Games',
      caption: 'Exciting Team Games',
    },
    {
      url: 'assets/images/team8.jpg',
      alt: 'Group Photo',
      caption: 'Memories to Cherish',
    },
     {
      url: 'assets/images/team11.jpg',
      alt: 'Making a Splash Together!',
      caption: 'Making a Splash Together!',
    },
     {
      url: 'assets/images/team10.jpg',
      alt: 'Pool Party Fun & Memories',
      caption: 'Pool Party Fun & Memories',
    },
    {
      url: 'assets/images/team9.jpg',
      alt: 'Team Building',
      caption: 'Building Strong Teams Together',
    },
    {
      url: 'assets/images/team1.jpg',
      alt: 'New Adventure',
      caption: '🎆 New teams ready! Let\'s go!',
    },
  ];

  ngOnInit() {
    // Add a small delay to ensure component is fully initialized
    setTimeout(() => {
      this.startCarousel();
    }, 100);
  }

  ngOnDestroy() {
    console.log('Carousel component destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startCarousel() {
    if (this.intervalId) {
      console.log('Carousel already running, skipping');
      return;
    }
    
    console.log('Starting carousel with', this.images.length, 'images');
    let imageCount = 1;
    
    this.intervalId = setInterval(() => {
      console.log('Carousel tick:', imageCount, 'of', this.images.length);
      if (imageCount < this.images.length) {
        this.currentIndex = imageCount;
        console.log('Showing image', imageCount + 1, 'currentIndex:', this.currentIndex);
        imageCount++;
      } else {
        console.log('Carousel finished, clearing interval');
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 3000);
  }
}

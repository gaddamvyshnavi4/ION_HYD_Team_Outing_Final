import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memories-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="memories-container">
      <div class="memories-track" [style.transform]="'translateY(' + currentOffset + 'px)'">
        <div class="memory-item" *ngFor="let image of memoryImages">
          <img [src]="image.url" [alt]="image.alt" />
          <p>{{image.caption}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .memories-container{background:linear-gradient(45deg,#6A1B9A,#9C27B0,#AB47BC,#BA68C8);border-radius:15px;overflow:hidden;width:100%;border:3px solid transparent;background-clip:padding-box;height:350px;position:relative;box-shadow:0 8px 25px rgba(106,27,154,0.3)}
    .memories-track{display:flex;flex-direction:column;transition:transform 0.8s ease-in-out}
    .memory-item{height:350px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:20px;position:relative;color:white;text-align:center;overflow:hidden}
    .memory-item img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:1}
    .memory-item::before{content:'';position:absolute;left:0;right:0;bottom:0;height:80px;background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 100%);z-index:2}
    .memory-item p{font-size:15px;font-weight:700;margin:0;color:white;text-shadow:2px 2px 4px rgba(0,0,0,1);z-index:3;position:relative;background:linear-gradient(135deg,#6A1B9A,#9C27B0);padding:12px 20px;border-radius:25px;border:2px solid rgba(255,255,255,0.4)}
  `]
})
export class MemoriesPopupComponent implements OnInit, OnDestroy {
  currentOffset = 0;
  currentIndex = 0;
  private intervalId: any;

  memoryImages = [
    { url: 'assets/memories/111.jpg', alt: 'Memory 1', caption: '🎉 Great team moments!' },
    { url: 'assets/memories/1.jpg', alt: 'Memory 2', caption: '📸 Fun memories together!' },
    { url: 'assets/memories/3.jpg', alt: 'Memory 3', caption: '🤝 Team bonding time!' },
    { url: 'assets/memories/4.jpg', alt: 'Memory 4', caption: '🎊 Celebration moments!' },
    { url: 'assets/memories/5.jpg', alt: 'Memory 5', caption: '💫 Unforgettable experiences!' },
    { url: 'assets/memories/66.jpg', alt: 'Memory 6', caption: '🌟 Amazing memories!' },
    { url: 'assets/memories/22.jpg', alt: 'Memory 7', caption: '🎈 Team spirit!' },
    { url: 'assets/memories/33.jpg', alt: 'Memory 8', caption: '🎯 Success together!' },
    { url: 'assets/memories/55.jpg', alt: 'Memory 10', caption: '🏆 Champions together!' }
  ];

  get currentImage() {
    return this.memoryImages[this.currentIndex];
  }

  ngOnInit() {
    this.startMemoriesLoop();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startMemoriesLoop() {
    let imageCount = 1;
    
    this.intervalId = setInterval(() => {
      if (imageCount < this.memoryImages.length) {
        this.currentIndex = imageCount;
        this.currentOffset = -this.currentIndex * 350;
        imageCount++;
      } else {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 3000);
  }
}
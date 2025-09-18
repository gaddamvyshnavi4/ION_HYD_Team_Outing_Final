import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-overlay" (click)="closePopup()">
      <div class="popup-content" (click)="$event.stopPropagation()">
        <div class="popup-header">
          <h2>🎉 Welcome to ION Hyderabad!</h2>
          <button class="close-btn" (click)="closePopup()">×</button>
        </div>
        <div class="popup-body">
          <p>🎯 <strong>Team Outing 2025</strong></p>
          <p>Get ready for an amazing ION Hyderabad team outing experience!</p>
          <ul>
            <li>🏆 Join exciting team activities</li>
            <li>🎮 Participate in buzzer games</li>
            <li>🤝 Build stronger team bonds</li>
            <li>📸 Create unforgettable memories</li>
          </ul>
          <p><strong>Let's make this outing legendary!</strong></p>
        </div>
        <div class="popup-footer">
          <button class="btn-primary" (click)="closePopup()">Let's Get Started! 🚀</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999}
    .popup-content{background:white;border-radius:12px;max-width:400px;width:90%;box-shadow:0 8px 24px rgba(0,0,0,0.2);animation:popupIn 0.3s ease-out}
    @keyframes popupIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
    .popup-header{background:linear-gradient(90deg,#6A1B9A,#9C27B0);color:white;padding:20px;border-radius:12px 12px 0 0;display:flex;justify-content:space-between;align-items:center}
    .popup-header h2{margin:0;font-size:20px}
    .close-btn{background:none;border:none;color:white;font-size:24px;cursor:pointer;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center}
    .popup-body{padding:20px;color:#333}
    .popup-body ul{margin:15px 0;padding-left:20px}
    .popup-body li{margin:8px 0}
    .popup-footer{padding:0 20px 20px;text-align:center}
    .btn-primary{background:linear-gradient(90deg,#6A1B9A,#9C27B0);color:white;border:none;padding:12px 24px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(106,27,154,0.3)}
    .btn-primary:hover{background:linear-gradient(90deg,#7B1FA2,#AB47BC);transform:translateY(-2px);box-shadow:0 8px 25px rgba(106,27,154,0.4)}
  `]
})
export class WelcomePopupComponent {
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
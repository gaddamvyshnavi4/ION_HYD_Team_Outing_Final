import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Show User Team Assignment After Shuffle -->
    <div class="row">
      <section class="card">
        <div class="card-body">
          <div *ngIf="name && userTeam" class="welcome-content">
            <h1 class="user-name" [class.male]="gender === 'M'" [class.female]="gender === 'F'">{{name}}</h1>
            <h2 class="congratulations">🎉 Congratulations! You belong to <strong>{{userTeam}}</strong>!</h2>
            <p class="info-text">Your team members are listed below - scroll down to see them! 👇</p>
          </div>
          <div *ngIf="!name || !userTeam" class="welcome-content">
            <h2 class="congratulations">📋 Teams have been successfully created!</h2>
            <p class="info-text">Scroll down to see all teams and their members! 👇</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .card{background:white;border-radius:16px;box-shadow:0 8px 25px rgba(106,27,154,0.15);overflow:hidden;margin-bottom:20px;border:2px solid #EDE7F6}
    .card-body{padding:30px;text-align:center}
    .row{margin:20px 0}
    .welcome-content{display:flex;flex-direction:column;gap:15px}
    .user-name{font-size:48px;font-weight:bold;margin:0;text-shadow:2px 2px 4px rgba(106,27,154,0.3);color:#6A1B9A}
    .user-name.male{color:#007bff!important}
    .user-name.female{color:#e91e63!important}
    .congratulations{font-size:28px;font-weight:bold;color:#333;margin:0;line-height:1.2}
    .info-text{font-size:18px;color:#666;margin:0;line-height:1.4}
  `]
})
export class WelcomeComponent {
  @Input() name = '';
  @Input() userTeam = '';
  @Input() gender = '';
  @Input() userGender = '';
}
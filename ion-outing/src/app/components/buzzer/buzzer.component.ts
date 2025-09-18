import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-buzzer',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <!-- Admin Controls -->
    <div class="row" *ngIf="isAdmin">
      <section class="card">
        <div class="card-header">
          <span class="dot"></span>
          <span class="card-title">Admin Controls</span>
        </div>
        <div class="card-body">
          <button class="btn" (click)="resetBuzzer()">Reset Buzzer</button>
          <p *ngIf="buzzerStartTime" style="color:#28a745;font-weight:bold;color:#333">✅ Buzzer is ACTIVE - Started at: {{formatTime(buzzerStartTime)}}</p>
          <p *ngIf="!buzzerStartTime" style="color:#333;font-weight:bold">❌ Buzzer is INACTIVE - Click Reset to start</p>
        </div>
      </section>
    </div>
    
    <!-- User Buzzer Interface -->
    <div class="row" *ngIf="!isAdmin">
      <section class="card">
        <div class="card-header">
          <span class="dot"></span>
          <span class="card-title">Team Buzzer</span>
        </div>
        <div class="card-body">
          <div>
            <label for="teamName">Team Name</label>
            <select id="teamName" [(ngModel)]="buzzerTeamName">
              <option value="">Select your team</option>
              <option *ngFor="let team of teamOptions" [value]="team.value">{{team.label}}</option>
            </select>
          </div>
          <button class="buzzer-btn" [class.clicked]="isClicked" (click)="pressBuzzer()" [disabled]="!buzzerStartTime || !buzzerTeamName">🔔<br>BUZZ</button>
          <p *ngIf="!buzzerStartTime" style="text-align:center;color:#333;margin-top:10px">Waiting for admin to start...</p>
          <p *ngIf="buzzerStartTime && !buzzerTeamName" style="text-align:center;color:#333;margin-top:10px">Enter team name to enable buzzer</p>
        </div>
      </section>
    </div>
    
    <!-- Results Display -->
    <div class="row">
      <section class="card">
        <div class="card-header">
          <span class="dot"></span>
          <span class="card-title">Results</span>
        </div>
        <div class="card-body">
          <div *ngIf="buzzerResults.length === 0">No results yet...</div>
          <div *ngIf="buzzerResults.length > 0" class="first-team-message">
            <p><strong>{{buzzerResults[0].teamName}}</strong> team has to answer!</p>
          </div>
          <div class="result-item" *ngFor="let result of buzzerResults; let i = index">
            <span class="rank">{{i + 1}}</span>
            <span class="team-name">{{result.teamName}}</span>
            <span class="time">{{formatElapsedTime(result.time)}}</span>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .card{background:white;border-radius:16px;box-shadow:0 8px 25px rgba(106,27,154,0.15);overflow:hidden;margin-bottom:20px;border:2px solid #EDE7F6}
    .card-header{background:linear-gradient(90deg,#6A1B9A,#9C27B0);color:white;padding:15px 20px;display:flex;align-items:center;gap:10px}
    .card-title{font-weight:bold;font-size:18px;color:white}
    .card-body{padding:15px}
    .dot{width:12px;height:12px;background:white;border-radius:50%;animation:pulse 2s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
    .btn{padding:12px 24px;font-size:16px;margin:5px;min-height:44px;border:none;border-radius:50px;background:linear-gradient(90deg,#6A1B9A,#9C27B0);color:white;cursor:pointer;transition:all .3s;font-weight:bold;box-shadow:0 4px 15px rgba(106,27,154,0.3)}
    .btn:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 8px 25px rgba(106,27,154,0.4)}
    input,select{padding:12px;font-size:16px;min-height:44px;border:2px solid #ddd;border-radius:8px;width:100%;box-sizing:border-box;margin-bottom:10px;color:#333;background:white}
    input:focus,select:focus{outline:none;border-color:#4682B4;color:#333}
    label{display:block;margin-bottom:5px;font-weight:500;color:#333}
    .row{margin:20px 0}
    .buzzer-btn{font-size:20px;padding:0;background:linear-gradient(90deg,#6A1B9A,#9C27B0);color:white;border:none;border-radius:50%;width:140px;height:140px;cursor:pointer;transition:all .3s;margin:20px auto;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.2;box-shadow:0 8px 25px rgba(106,27,154,0.4);animation:glow 2s infinite alternate}
    .buzzer-btn:hover:not(:disabled){background:linear-gradient(90deg,#7B1FA2,#AB47BC);transform:scale(1.1);box-shadow:0 12px 35px rgba(106,27,154,0.6)}
    .buzzer-btn:disabled{background:#ccc;cursor:not-allowed;animation:none}
    @keyframes glow{0%{box-shadow:0 8px 25px rgba(106,27,154,0.4)}100%{box-shadow:0 8px 35px rgba(106,27,154,0.7)}}
    .buzzer-btn.clicked{background:linear-gradient(90deg,#ff4444,#ff6666)!important;transform:scale(0.95)!important;box-shadow:0 4px 15px rgba(255,68,68,0.6)!important}
    .result-item{display:flex;justify-content:space-between;align-items:center;padding:12px;margin:8px 0;background:#EDE7F6;border-radius:12px;border-left:4px solid #6A1B9A}
    .rank{font-weight:bold;color:#6A1B9A;font-size:18px;min-width:30px}
    .team-name{flex:1;margin:0 15px;font-weight:500;color:#333}
    .time{font-family:monospace;font-weight:bold;color:#333}
    .first-team-message{background:#EDE7F6;border:2px solid #6A1B9A;border-radius:12px;padding:15px;margin:10px 0;text-align:center}
    .first-team-message p{margin:0;color:#6A1B9A;font-size:18px;font-weight:bold}
  `]
})
export class BuzzerComponent implements OnInit, OnDestroy {
  @Input() isAdmin = false;
  buzzerTeamName = '';
  teamOptions = [
    { value: 'ఉత్తరం', label: 'ఉత్తరం (North)' },
    { value: 'దక్షిణం', label: 'దక్షిణం (South)' },
    { value: 'తూర్పు', label: 'తూర్పు (East)' },
    { value: 'పశ్చిమం', label: 'పశ్చిమం (West)' }
  ];
  buzzerStartTime: number | null = null;
  buzzerResults: any[] = [];
  private refreshSub!: Subscription;
  isClicked = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBuzzerResults();
    this.refreshSub = interval(2000).subscribe(() => this.getBuzzerResults());
  }

  ngOnDestroy(): void {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  resetBuzzer(): void {
    console.log('Reset button clicked');
    const host = location.origin === 'http://localhost:4200' ? 'http://localhost:3000' : location.origin
    console.log('Making request to:', host + '/api/buzzer/reset');
    this.http.post(host + '/api/buzzer/reset', {}).subscribe({
      next: (data: any) => {
        this.buzzerStartTime = data.startTime;
        this.buzzerResults = [];
        console.log('Buzzer reset successful:', { startTime: this.buzzerStartTime, data });
      },
      error: (error) => {
        console.error('Buzzer reset failed:', error);
      }
    })
  }

  pressBuzzer(): void {
    if (!this.buzzerTeamName) return;
    
    // Visual feedback
    this.isClicked = true;
    setTimeout(() => this.isClicked = false, 300);
    
    const host = location.origin === 'http://localhost:4200' ? 'http://localhost:3000' : location.origin
    this.http.post(host + '/api/buzzer/press', { teamName: this.buzzerTeamName }).subscribe((data: any) => {
      if (data.status === 'recorded') {
        this.getBuzzerResults();
      }
    })
  }

  getBuzzerResults(): void {
    const host = location.origin === 'http://localhost:4200' ? 'http://localhost:3000' : location.origin
    this.http.get(host + '/api/buzzer/results').subscribe({
      next: (data: any) => {
        this.buzzerResults = data.results;
        this.buzzerStartTime = data.startTime;
        console.log('Buzzer state:', { startTime: this.buzzerStartTime, isActive: data.isActive, results: this.buzzerResults });
      },
      error: (error) => {
        console.error('Failed to get buzzer results:', error);
      }
    })
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  formatElapsedTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    return `${seconds}.${ms.toString().padStart(3, '0')}s`;
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-styles',
  standalone: true,
  template: '',
  styles: [`
    :host {
      display: none;
    }
  `],
  styleUrls: ['./shared-styles.component.scss']
})
export class SharedStylesComponent {}
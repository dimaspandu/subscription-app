import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, StepperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showStepper = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.showStepper = this.isStepperRoute(event.urlAfterRedirects);
      });
  }

  private isStepperRoute(url: string): boolean {
    return ['/account', '/packages', '/payment', '/review'].some(route => url.startsWith(route));
  }
}

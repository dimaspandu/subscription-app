import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  steps = [
    { label: 'Account Information', path: '/account' },
    { label: 'Choose Package', path: '/packages' },
    { label: 'Payment Method', path: '/payment' },
    { label: 'Review & Submit', path: '/review' },
  ];

  constructor(public router: Router) {}

  get currentStepIndex(): number {
    return this.steps.findIndex(step => this.router.url.startsWith(step.path));
  }

  getStepStatus(index: number): 'completed' | 'current' | 'pending' {
    if (index < this.currentStepIndex) return 'completed';
    if (index === this.currentStepIndex) return 'current';
    return 'pending';
  }
}

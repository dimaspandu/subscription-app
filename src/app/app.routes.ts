import { Routes } from '@angular/router';
import { stepGuard } from './guards/step.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'inbox',
    loadComponent: () =>
      import('./pages/inbox/inbox.component').then(m => m.InboxComponent)
  },
  {
    path: 'summary/:token',
    loadComponent: () =>
      import('./pages/summary/summary.component').then(m => m.SummaryComponent),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./steps/account/account.component').then(m => m.AccountComponent),
  },
  {
    path: 'packages',
    loadComponent: () =>
      import('./steps/packages/packages.component').then(m => m.PackagesComponent),
    canActivate: [stepGuard],
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./steps/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [stepGuard],
  },
  {
    path: 'review',
    loadComponent: () =>
      import('./steps/review/review.component').then(m => m.ReviewComponent),
    canActivate: [stepGuard],
  },
  {
    path: '**',
    redirectTo: 'account',
  },
];

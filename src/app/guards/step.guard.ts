import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormDataService } from '../services/form-data.service';

export const stepGuard: CanActivateFn = (route, _) => {
  const formService = inject(FormDataService);
  const router = inject(Router);

  const step = route.routeConfig?.path as 'packages' | 'payment' | 'review';

  const requirements: Record<string, Array<'account' | 'packages' | 'payment'>> = {
    packages: ['account'],
    payment: ['account', 'packages'],
    review: ['account', 'packages', 'payment'],
  };

  const nav = window.history.state;
  if (nav?.fromGuard === false) return true;

  const requiredSteps = requirements[step] ?? [];
  const firstInvalid = requiredSteps.find(s => !formService.isStepComplete(s));

  if (firstInvalid) {
    const redirectMap: Record<string, string> = {
      account: '/account',
      package: '/packages',
      payment: '/payment',
    };

    router.navigate([redirectMap[firstInvalid]]);
    return false;
  }

  return true;
};

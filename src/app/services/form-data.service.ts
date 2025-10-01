import { Injectable } from '@angular/core';

const STORAGE_KEY = 'subscriptionFormData';

@Injectable({ providedIn: 'root' })
export class FormDataService {
  private data: any = {
    account: {},
    package: '',
    payment: '',
  };

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  private loadFromStorage() {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
      try {
        this.data = JSON.parse(json);
      } catch {
        this.data = { account: {}, package: '', payment: '' };
      }
    }
  }

  setAccount(data: any) {
    this.data.account = data;
    this.saveToStorage();
  }

  setPackage(planId: string) {
    this.data.package = planId;
    this.saveToStorage();
  }

  setPayment(methodId: string) {
    this.data.payment = methodId;
    this.saveToStorage();
  }

  getFormData() {
    return this.data;
  }

  reset() {
    this.data = { account: {}, package: '', payment: '' };
    localStorage.removeItem(STORAGE_KEY);
  }

  isStepComplete(step: 'account' | 'packages' | 'payment'): boolean {
    const data = this.data;
    switch (step) {
      case 'account':
        return !!data.account?.fullName && !!data.account?.email;
      case 'packages':
        return !!data.package;
      case 'payment':
        return !!data.payment;
      default:
        return false;
    }
  }

  getPreviousStep(current: 'review' | 'payment' | 'packages'): string | null {
    const steps = ['account', 'packages', 'payment', 'review'];
    const index = steps.indexOf(current);
    if (index > 0) {
      const prev = steps[index - 1] as 'account' | 'packages' | 'payment';
      return this.isStepComplete(prev) ? `/${prev}` : null;
    }
    return null;
  }
}

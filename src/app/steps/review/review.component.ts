import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  form = this.formService.getFormData();
  submitted = false;
  loading = false;
  error: string | null = null;

  constructor(
    private formService: FormDataService,
    private firestore: Firestore,
    private router: Router
  ) {}

  getPackageLabel(id: string): string {
    const map: Record<string, string> = {
      basic: 'Basic Plan',
      pro: 'Pro Plan',
      enterprise: 'Enterprise Plan',
    };
    return map[id] ?? id;
  }

  getPaymentLabel(id: string): string {
    const map: Record<string, string> = {
      credit: 'Credit Card',
      paypal: 'PayPal',
      bank: 'Bank Transfer',
    };
    return map[id] ?? id;
  }

  goBack(): void {
    const previous = this.formService.getPreviousStep('review');
    if (previous) {
      this.router.navigate([previous]);
    } else {
      alert('Previous step is incomplete.');
    }
  }

  async submit() {
    this.loading = true;
    this.error = null;

    try {
      const colRef = collection(this.firestore, 'subscriptions');
      await addDoc(colRef, {
        ...this.form,
        status: 'unpaid',
      });
      this.submitted = true;
      this.formService.reset();
    } catch (err: any) {
      this.error = 'Submission failed. Please try again.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}

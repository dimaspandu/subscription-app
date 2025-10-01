import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  form = this.formService.getFormData();
  method = '';
  methods = [
    { id: 'credit', name: 'Credit Card' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'bank', name: 'Bank Transfer' },
  ];

  constructor(private formService: FormDataService, private router: Router) {}

  goBack(): void {
    const previous = this.formService.getPreviousStep('payment');
    if (previous) {
      this.router.navigate([previous]);
    } else {
      alert('Previous step is incomplete.');
    }
  }
    
  submitForm() {
    this.formService.setPayment(this.method);

    this.router.navigate(['/review'], { state: { fromGuard: false } });
  }
}

import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent {
  form = this.formService.getFormData();
  selectedPackage = '';

  packages = [
    { id: 'basic', name: 'Basic Plan', desc: 'For individuals', price: '$9/mo' },
    { id: 'pro', name: 'Pro Plan', desc: 'For small teams', price: '$29/mo' },
    { id: 'enterprise', name: 'Enterprise', desc: 'For large businesses', price: '$99/mo' },
  ];

  constructor(private formService: FormDataService, private router: Router) {}

  goBack(): void {
    const previous = this.formService.getPreviousStep('packages');
    if (previous) {
      this.router.navigate([previous]);
    } else {
      alert('Previous step is incomplete.');
    }
  }
  
  submitForm() {
    this.formService.setPackage(this.selectedPackage);

    this.router.navigate(['/payment'], { state: { fromGuard: false } });
  }
}

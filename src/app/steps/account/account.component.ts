import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  fullName = '';
  phone = '';
  email = '';
  password = '';

  constructor(private formService: FormDataService, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  submitForm() {
    this.formService.setAccount({
      fullName: this.fullName,
      phone: this.phone,
      email: this.email,
      password: this.password,
    });

    this.router.navigate(['/packages'], { state: { fromGuard: false } });
  }
}

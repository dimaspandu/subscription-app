import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { JwtService } from '../../services/jwt.service';

interface RawData {
  account?: {
    email?: string;
    emailMasked?: string;
    phone?: string;
    phoneMasked?: string;
    password?: string;
  };
}

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  input = '';
  errorMessage = '';
  loading = false;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private jwt: JwtService
  ) {}

  async check() {
    this.errorMessage = '';
    const keyword = this.input.trim().toLowerCase();
    if (!keyword) {
      this.errorMessage = 'Please enter your email or phone number.';
      return;
    }

    this.loading = true;

    try {
      const colRef = collection(this.firestore, 'subscriptions');
      const q = query(colRef, where('account.email', '==', keyword));
      const snapshot = await getDocs(q);
      this.loading = false;

      if (snapshot.empty) {
        this.errorMessage = 'We could not find any registration with that info.';
      } else {
        const docData = snapshot.docs[0];
        const raw = docData.data() as RawData;

        if (raw.account) {
          delete raw.account.password;
          raw.account.emailMasked = this.maskEmail(raw.account.email || '');
          raw.account.phoneMasked = this.maskPhone(raw.account.phone || '');
        }

        const token = this.jwt.sign({ id: docData.id, time: Date.now() });

        localStorage.setItem(
          'dummyInbox',
          JSON.stringify({
            token,
            preview: {
              email: raw.account?.emailMasked,
              phone: raw.account?.phoneMasked,
            },
          })
        );

        this.router.navigate(['/inbox']);
      }
    } catch (err) {
      console.error('Error checking registration:', err);
      this.errorMessage = 'Something went wrong. Please try again later.';
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/account']);
  }

  private maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    if (!name || !domain) return '***';
    if (name.length < 3) return '***@' + domain;
    return name[0] + '***' + name.slice(-1) + '@' + domain;
  }

  private maskPhone(phone: string): string {
    if (phone.length < 4) return '***';
    return phone.slice(0, 2) + '***' + phone.slice(-2);
  }
}

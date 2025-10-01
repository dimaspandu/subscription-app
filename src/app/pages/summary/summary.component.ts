import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { doc, getDoc, updateDoc, Firestore } from '@angular/fire/firestore';
import { JwtService } from '../../services/jwt.service';
import { ConfirmExitDialogComponent } from '../../components/confirm-exit-dialog/confirm-exit-dialog.component';

@Component({
  standalone: true,
  selector: 'app-summary',
  imports: [CommonModule, ConfirmExitDialogComponent],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  data: any;
  loading = false;
  message = '';
  invalid = false;
  showConfirmDialog = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: Firestore,
    private jwt: JwtService
  ) {
    this.loadData();
  }

  async loadData() {
    const token = this.route.snapshot.paramMap.get('token');
    const verified = token ? this.jwt.verify(token) : null;

    if (verified && verified.id) {
      try {
        const docRef = doc(this.firestore, 'subscriptions', verified.id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          this.data = { id: snapshot.id, ...snapshot.data() };
          localStorage.setItem('existingSubmission', JSON.stringify(this.data));
        } else {
          this.invalid = true;
          this.message = 'Submission not found.';
        }
      } catch (err) {
        console.error('Error fetching submission:', err);
        this.invalid = true;
        this.message = 'Error fetching submission.';
      }
    } else {
      this.invalid = true;
      this.message = 'Invalid or expired access token.';
    }
  }

  async simulatePayment() {
    if (!this.data || !this.data.id) return;

    this.loading = true;
    this.message = '';

    try {
      const docRef = doc(this.firestore, 'subscriptions', this.data.id);
      await updateDoc(docRef, { status: 'paid' });

      this.data.status = 'paid';
      localStorage.setItem('existingSubmission', JSON.stringify(this.data));

      this.message = 'Payment successful (simulated).';
    } catch (err) {
      console.error('Payment simulation failed:', err);
      this.message = 'Failed to update status.';
    } finally {
      this.loading = false;
    }
  }

  openConfirmDialog() {
    this.showConfirmDialog = true;
  }

  onDialogClose(result: boolean) {
    this.showConfirmDialog = false;
    if (result) {
      localStorage.removeItem('existingSubmission');
      localStorage.removeItem('dummyInbox');
      this.router.navigate(['/']);
    }
  }
}

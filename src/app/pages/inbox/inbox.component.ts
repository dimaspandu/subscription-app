import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-inbox',
  imports: [CommonModule],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent {
  preview: { email?: string; phone?: string } | null = null;
  token: string | null = null;

  constructor(private router: Router) {
    const raw = localStorage.getItem('dummyInbox');
    if (raw) {
      const parsed = JSON.parse(raw);
      this.token = parsed.token;
      this.preview = parsed.preview;
    }
  }

  goToSummary() {
    if (this.token) {
      this.router.navigate(['/summary', this.token]);
    }
  }
}

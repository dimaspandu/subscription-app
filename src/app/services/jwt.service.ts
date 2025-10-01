import { Injectable } from '@angular/core';

// It's just a simulation; it's supposed to be run on a server
@Injectable({ providedIn: 'root' })
export class JwtService {
  sign(payload: object): string {
    const encoded = btoa(JSON.stringify(payload));
    return encoded;
  }

  verify(token: string): any {
    try {
      const decoded = atob(token);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}

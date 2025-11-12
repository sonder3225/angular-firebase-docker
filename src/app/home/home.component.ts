import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',

  standalone: true,
  imports: [CommonModule],

  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>Página en Blanco (Sesión Iniciada)</h1>

      <p *ngIf="userEmail">
        Tu correo: <strong>{{ userEmail }}</strong>
      </p>

      <button (click)="logout()">Salir</button>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

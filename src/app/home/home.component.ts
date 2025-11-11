// src/app/home/home.component.ts
import { CommonModule } from '@angular/common'; // 👈 ¡IMPORTACIÓN NECESARIA!
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  // 🎯 IMPORTANTE: Agregar CommonModule al array de 'imports' para usar *ngIf, *ngFor, etc.
  standalone: true, // Asumimos que es standalone, como los demás componentes
  imports: [CommonModule], // 👈 AÑADIDO PARA HABILITAR *ngIf

  // Usamos template: para incrustar HTML
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
    // Escucha el correo del usuario
    this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });
  }

  // Cierra la sesión
  logout(): void {
    this.authService.logout();
  }
}

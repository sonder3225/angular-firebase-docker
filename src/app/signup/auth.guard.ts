// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Si no está autenticado, redirige a /login (Similar a <Redirect href={'/'} /> en _layout.jsx)
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        return isAuthenticated ? true : this.router.createUrlTree(['/login']);
      })
    );
  }
}

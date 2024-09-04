import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

//Implementada proteção de rotas

export class RouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.email) {
      return true;
    } else {
      // Usuário não está logado, redirecionar para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}

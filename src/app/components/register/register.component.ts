import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Navbar1Component } from "../navbar1/navbar1.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, Navbar1Component, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  register() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const userExists = users.some((user: any) => user.email === this.email);

    if (userExists) {
      alert('Este email já está registrado.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('As senhas não são iguais');
      return;
    }

    users.push({ username: this.username, email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso!');
    this.router.navigate(['/login']);
  }

}

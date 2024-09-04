import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Navbar1Component } from "../navbar1/navbar1.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, Navbar1Component, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find((user: any) => user.email === this.email && user.password === this.password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      alert('Email ou senha incorretos.');
    }
  }

}

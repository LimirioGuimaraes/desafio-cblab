import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { Navbar1Component } from "./components/navbar1/navbar1.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, Navbar1Component, LoginComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafio-cblab';
  user_is_logged: boolean = true;

  constructor(private router: Router) { }

  checkLogin() {
    if (this.user_is_logged) {
      this.router.navigate(['/home'])
    } else {
      console.log("User is not logged in.");
      this.router.navigate(['/login']);
    }
  }


}

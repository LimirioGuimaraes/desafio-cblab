import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar1Component } from "../navbar1/navbar1.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, Navbar1Component],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

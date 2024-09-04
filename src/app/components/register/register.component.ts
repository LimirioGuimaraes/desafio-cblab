import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar1Component } from "../navbar1/navbar1.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, Navbar1Component],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})



export class RegisterComponent {

}

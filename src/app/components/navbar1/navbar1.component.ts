import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar1',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './navbar1.component.html',
  styleUrl: './navbar1.component.css'
})
export class Navbar1Component {

}

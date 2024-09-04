import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatToolbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  username: string = '';

  // Recupera o nome do usuário logado do localStorage
  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.username = loggedInUser.username;
    
  }
  // Desloga usuário
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  
  search(event:any):void{
  }


}



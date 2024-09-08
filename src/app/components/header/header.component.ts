import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchBooks} from '../../books/state/book.action';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { selectBooks } from '../../books/state/book.selectors';
import {SearchService} from '../../services/search-service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatToolbar, CommonModule, MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  constructor(private router: Router) {}
  private searchService: SearchService = inject(SearchService);
  private store: Store = inject(Store)
  username: string = '';
  onScreen: boolean = false;
  books$: Observable<any[]> = this.store.select(selectBooks);
  searchTerm: string = '';
  
  onSearch(event: any): void {
    const query = event.target.value.trim();
    
    this.store.dispatch(searchBooks({ query }));
    this.searchService.updateSearchTerm(query);
    this.searchTerm = query;
    this.onScreen = !!query;
  }

  trackByBookId(index: number, book: any): string {
    return book.id;
  }
    
  isFavorites(): any {
    const currentRoute = this.router.url;
    if (currentRoute === '/favorites' || currentRoute.startsWith('/book/')) {
      return true; 
    }
      return false; 
    }
    
  // Recupera o nome do usuário logado do localStorage
  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.username = loggedInUser.username;
    this.books$.subscribe(books => {});
    
  }
  // Desloga usuário
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    this.searchService.updateSearchTerm('');
  }

  logoClick() {
  this.searchService.updateSearchTerm('');
  }

  loadMoreBooks() {
    if (this.searchTerm) {
      this.searchService.updateSearchTerm(this.searchTerm); }
    this.router.navigate(['/home']);
  }

  onBookClick(book: any): void {
    this.searchService.updateSearchTerm('');
    this.router.navigate(['/book', book.id]);
    
    const currentRoute = this.router.url;
    if (currentRoute.startsWith('/book/')){
      this.router.navigate(['/book', book.id], { queryParamsHandling: 'merge' }).then(() => {
        window.location.reload();
      });
    }
  }
}

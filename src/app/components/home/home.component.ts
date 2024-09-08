import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchBooks } from '../../books/state/book.action';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { selectBooks, selectBooksById } from '../../books/state/book.selectors';
import { SearchService } from '../../services/search-service';
import { FooterComponent } from "../footer/footer.component";
import { BookModel } from '../../books/book.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink, MatToolbar, CommonModule, MatListModule, FooterComponent, MatIconModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  onScreen: boolean = false;
  searchTerm$: Observable<string>;
  books$: Observable<any[]>;
  userEmail: string = '';
  private bookModel: BookModel;

  constructor(private store: Store, private searchService: SearchService, private router: Router) {
    this.searchTerm$ = this.searchService.searchTerm$;
    this.books$ = this.store.select(selectBooks);
    this.bookModel = new BookModel(''); 
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userEmail = loggedInUser.email;
    const currentRoute = this.router.url; 
  
    (currentRoute === '/search-results-page')

    this.searchTerm$.subscribe(term => {
      if (term) {
        this.store.dispatch(searchBooks({ query: term }));
        this.onScreen = true;
      } else {
        this.onScreen = false;
      }
    });
  }

  trackByBookId(index: number, book: any): string {
    return book.id;
  }

  //funcoes get e set para verificar se o livro é um favorito
  toggleFavorite(book: any): void {    
    const favorites = this.bookModel.getFavorites(this.userEmail);
    if (favorites.includes(book.id)) {
      const updatedFavorites = favorites.filter(id => id !== book.id);
      this.bookModel.saveFavorites(this.userEmail, updatedFavorites);
    } else {
      favorites.push(book.id);
      this.bookModel.saveFavorites(this.userEmail, favorites);
    }
    console.log('Favorite Book IDs:', favorites);
  }

  isFavorite( book: any) {
    const favorites = this.bookModel.getFavorites(this.userEmail);
    const isFavorite = favorites.includes(book.id);
    if (isFavorite) {
      return true;
    } 
      return false;
    }

  //funcoes de get e set para o book rate 
    getBookRate(book: any) {
      const rates = this.bookModel.getRates(this.userEmail);
      return rates[book.id] || 0;
    }
    
    rateBook(bookId: string, rating: number): void {
      const rates = this.bookModel.getRates(this.userEmail);
      rates[bookId] = rating;
      this.bookModel.setRates(this.userEmail, rates);
      console.log('Updated rates saved:', this.bookModel.getRates(this.userEmail));
    }
 
    onBookClick(book: any): void {
      this.searchService.updateSearchTerm('');
      this.router.navigate(['/book', book.id]);
    }
}

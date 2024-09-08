import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBooksById } from '../../books/state/book.selectors';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { BookModel } from '../../books/book.model';
import { searchBooksById } from '../../books/state/book.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../../services/search-service';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [HeaderComponent, RouterLink, MatToolbar, 
            CommonModule, MatListModule, FooterComponent, 
            MatIconModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  userEmail: string = '';
  favoriteBooks$: Observable<BookModel[]>;
  filteredBooks$!: Observable<BookModel[]>;
  filterTag: string = '';
  private bookModel: BookModel;

constructor(private store: Store, private searchService: SearchService, private router: Router) {
    this.bookModel = new BookModel('');
    this.favoriteBooks$ = this.store.select(selectBooksById);
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userEmail = loggedInUser.email;
    const favorites = this.bookModel.getFavorites(this.userEmail);
    console.log('Favorite Book IDs:', favorites);
    this.store.dispatch(searchBooksById({ favoriteBooks: favorites }));
    this.filteredBooks$ = this.favoriteBooks$;
  }

  trackByBookId(index: number, book: BookModel): string {
    return book.id;
  }

  toggleFavorite(book: BookModel): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.includes(book.id)
      ? favorites.filter(id => id !== book.id)
      : [...favorites, book.id];
    this.saveFavorites(updatedFavorites);
    this.filteredBooks$ = this.favoriteBooks$.pipe(
      map(books => books.filter(b => this.applyTagFilter(b)))
    );
  }

  getBookRate(book: any) {
    const rates = this.bookModel.getRates(this.userEmail);
    return rates[book.id] || 0;
  }
  
  rateBook(bookId: string, rating: number): void {
    const rates = this.bookModel.getRates(this.userEmail);
    rates[bookId] = rating;
    this.bookModel.setRates(this.userEmail, rates);
  }

  isFavorite(book: BookModel): boolean {
    return this.getFavorites().includes(book.id);
  }

  applyTagFilter(book: BookModel): boolean {
    if (!this.filterTag) {
      return true; 
    }
    const userEmail = this.userEmail;
    const userTags = JSON.parse(localStorage.getItem(`tags_${userEmail}`) || '{}');
    const tags: string[] = userTags[book.id] || [];
    return tags.some(tag => tag.toLowerCase().includes(this.filterTag.toLowerCase()));
  }

  onFilterChange(): void {
    this.filteredBooks$ = this.favoriteBooks$.pipe(
      map(books => books.filter(b => this.applyTagFilter(b)))
    );
  } 

  private getFavorites(): string[] {
    const userFavorites = localStorage.getItem(`favorites_${this.userEmail}`);
    return userFavorites ? JSON.parse(userFavorites) : [];
  }

  private saveFavorites(favorites: string[]): void {
    localStorage.setItem(`favorites_${this.userEmail}`, JSON.stringify(favorites));
  }
  
  onBookClick(book: any): void {
    this.searchService.updateSearchTerm('');
    this.router.navigate(['/book', book.id]);
  }
}

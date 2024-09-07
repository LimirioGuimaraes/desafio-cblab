import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { searchBook } from '../../books/state/book.action';
import { selectBook } from '../../books/state/book.selectors';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms'; 
import { BookModel } from '../../books/book.model';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book$!: Observable<any>;
  private subscription!: Subscription;
  private bookModel: BookModel;
  userComment: string = '';
  savedComment: string = '';
  bookId: string = '';
  isEditing: boolean = false;
  userEmail: string = '';
  newTag: string = '';
  tags: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.book$ = this.store.select(selectBook);
    this.bookModel = new BookModel(''); 
  }

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userEmail = loggedInUser.email;
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.tags = this.loadTags(this.bookId);
    if (this.bookId) {
      this.store.dispatch(searchBook({ bookId: this.bookId }));
    }
    this.subscription = this.book$.subscribe(book => {
      if (book) {
        console.log('Book:', book);
        this.loadSavedComment();
      }
    });
  }



  // funcoes de comentarios
  saveComment(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const username = loggedInUser.username || 'guest';

    if (this.bookId && username) {
      const comments = JSON.parse(localStorage.getItem('bookComments') || '{}');
      comments[this.bookId] = { username, comment: this.userComment };
      localStorage.setItem('bookComments', JSON.stringify(comments));
      this.savedComment = this.userComment;
      this.isEditing = false; 
    }
  }

  loadSavedComment(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const username = loggedInUser.username || 'guest';

    if (this.bookId && username) {
      const comments = JSON.parse(localStorage.getItem('bookComments') || '{}');
      const bookComment = comments[this.bookId];
      if (bookComment && bookComment.username === username) {
        this.savedComment = bookComment.comment;
        this.userComment = this.savedComment; 
      }
    }
  }

  editComment(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.userComment = this.savedComment || ''; 
  }

  //funcoes get e set para verificar se o livro é um favorio
  toggleFavorite(book: any): void {    
    const favorites = this.bookModel.getFavorites(this.userEmail);
    if (favorites.includes(book.id)) {
      const updatedFavorites = favorites.filter(id => id !== book.id);
      this.bookModel.saveFavorites(this.userEmail, updatedFavorites);
    } else {
      favorites.push(book.id);
      this.bookModel.saveFavorites(this.userEmail, favorites);
    }
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
    }

  // tags
  addTag(): void {
    if (this.newTag.trim()) {
      const trimmedTag = this.newTag.trim();
      if (!this.tags.includes(trimmedTag)) {
        this.tags.push(trimmedTag);
        this.saveTags(this.bookId, this.tags);
        this.newTag = ''; 
      }
    }
  }

  saveTags(bookId: string, tags: string[]): void {
    localStorage.setItem(`tags_${bookId}`, JSON.stringify(tags));
  }
  
  loadTags(bookId: string): string[] {
    const tags = localStorage.getItem(`tags_${bookId}`);
    return tags ? JSON.parse(tags) : [];
  }
}

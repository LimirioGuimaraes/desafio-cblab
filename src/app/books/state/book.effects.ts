import { inject} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';
import { BooksService } from '../book.service';  
import { searchBooks, searchBooksSuccess, searchBooksFailure, searchBooksById, searchBooksByIdSuccess, 
         searchBooksByIdFailure, searchBookSuccess, searchBookFailure, searchBook} from './book.action';

export class BookEffects {
  private actions$ = inject(Actions);
  private booksService = inject(BooksService);

  constructor() {}

  //effect busca de livro por input 
  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchBooks),     
      mergeMap(action =>
        this.booksService.searchBooks(action.query).pipe(
          map(books => searchBooksSuccess({ books })),
          catchError(error => of(searchBooksFailure({ error })))
        )
      )
    )
  );
  //effect busca de livro por unico ID
  searchBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchBook),     
      mergeMap(action =>
        this.booksService.searchBook(action.bookId).pipe(
          map(book => searchBookSuccess({ book })),
          catchError(error => of(searchBookFailure({ error })))
        )
      )
    )
  );

 //effect busca de livro por array de ID's
  searchBooksById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchBooksById),
      debounceTime(3000),
      distinctUntilChanged((prev, curr) => prev.favoriteBooks === curr.favoriteBooks),
      tap(action => console.log('AAA quero meus livros:', action.favoriteBooks)), // apagar dps
      
      mergeMap(action =>
        this.booksService.searchBooksById(action.favoriteBooks).pipe(
          map(favoriteBooks => searchBooksByIdSuccess({ favoriteBooks })),
          catchError(error => of(searchBooksByIdFailure({ error })))
        )
      )
    )
  );

}


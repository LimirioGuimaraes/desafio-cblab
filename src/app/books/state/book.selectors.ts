import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState} from './book.reducers';

export const selectBookState = createFeatureSelector<BookState>('books');

export const selectBooks = createSelector(
  selectBookState,
  (state: BookState) => state.books
);

export const selectBooksById = createSelector(
  selectBookState,
  (state: BookState) => state.favoriteBooks
);

export const selectBook = createSelector(
  selectBookState,
  (state: BookState) => state.book
);


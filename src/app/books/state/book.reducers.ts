import { createReducer, on } from '@ngrx/store';
import { searchBookFailure, searchBooksByIdFailure, searchBooksByIdSuccess, searchBooksFailure, searchBooksSuccess, searchBookSuccess } from './book.action';

export interface BookState {
  books: any[];
  favoriteBooks: any[];
  book: any;
  error: string | null;
}

export const initialState: BookState = {
  favoriteBooks:[],
  books: [],
  book:[],
  error: null
};

export const bookReducer = createReducer(
  initialState,
  on(searchBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    error: null
  })),
  on(searchBooksFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(searchBooksByIdSuccess, (state, { favoriteBooks }) => ({
    ...state,
    favoriteBooks: favoriteBooks,
  })),
  on(searchBooksByIdFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(searchBookSuccess, (state, { book }) => ({
    ...state,
    book,
    error: null
  })),
  on(searchBookFailure, (state, { error }) => ({
    ...state,
    error
  })),
);


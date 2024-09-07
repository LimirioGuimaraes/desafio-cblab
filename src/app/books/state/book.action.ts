import {createAction, props} from '@ngrx/store';

// actions relacionadas a busca por um array de ID (favoritos)
export const searchBooksById = createAction(
'[Books] Search Books Id',
props<{ favoriteBooks: string [] }>()
);

export const searchBooksByIdSuccess = createAction(
'[Book] Search Books By Id Success', 
props<{ favoriteBooks: any[] }>());

export const searchBooksByIdFailure = createAction(
'[Books] Search Books Failure',
props<{ error: any }>()
);

// actions para a busca por input de texto
export const searchBooks = createAction(
'[Books] Search Books',
props<{ query: string }>()
);

export const searchBooksSuccess = createAction(
'[Books] Search Books Success',
props<{ books: any[] }>()
);

export const searchBooksFailure = createAction(
'[Books] Search Books Failure',
props<{ error: any }>()
);

// actions para requisição de um único livro, por ID 
export const searchBook = createAction(
'[Books] Search Book',
props<{ bookId: string }>()
);

export const searchBookSuccess = createAction(
'[Books] Search Book Success',
props<{ book: any }>()
);

export const searchBookFailure = createAction(
'[Books] Search Book Failure',
props<{ error: any }>()
);








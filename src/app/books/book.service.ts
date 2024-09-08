import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, debounceTime, finalize, map, mergeMap, tap } from 'rxjs/operators';

interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: {
  thumbnail?: string;
  };
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface BooksApiResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

@Injectable({
  providedIn: 'root',
})

export class BooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

    // busca por input
    searchBooks(query: string): Observable<Book[]> {
      const url = `${this.apiUrl}?q=${query}&maxResults=20`;
      return this.http.get<BooksApiResponse>(url).pipe(
        debounceTime(2000), map(response => response.items || []));
    }

    // busca por id unico
    searchBook(bookId: string): Observable<Book> {
      const url = `${this.apiUrl}/${bookId}`;
      return this.http.get<Book>(url).pipe(map(response => response) );
    }

    // busca por array de id's
    searchBooksById(ids: string[]): Observable<Book[]> {
      const requests = ids.map((id) => {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Book>(url).pipe(
          catchError((error: any) => {
            return of(null);
          })
        );
      });
    
      return forkJoin(requests).pipe(
        map((books) => books.filter((book) => book !== null) as Book[]),
      );
    }

}

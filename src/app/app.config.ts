import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, Store } from '@ngrx/store';
import { bookReducer } from './books/state/book.reducers';
import { provideEffects } from '@ngrx/effects';
import { BookEffects } from './books/state/book.effects';
import { BooksService } from './books/book.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore({ books: bookReducer }),   
    Store,
    provideHttpClient(withFetch()),
    BooksService,
    provideEffects([BookEffects])  
]
};

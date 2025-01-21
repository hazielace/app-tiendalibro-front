import { Injectable, Signal, inject } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map, of } from 'rxjs';
import { BookItemCart } from '../interfaces/Book.interface';
import { StorageService } from './storage.service';

interface State {
    books: BookItemCart[];
    loaded: boolean;
}

@Injectable({
    providedIn: 'root',
})

export class CartStateService {
    private _storageService = inject(StorageService); 

    private initialState: State = {
        books: [],
        loaded: false,
    };

    loadBooks$ = this._storageService.loadBooks().pipe(map((books) => ({ books, loaded: true })));

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadBooks$],
        selectors: (state) => ({
          count: () =>
            state().books.reduce((acc, book) => acc + book.quantity, 0),
            price: () => {
                return state().books.reduce(
                  (acc, book) => acc + book.book.current_price * book.quantity,0,
                );
            },
        }),
        actionSources: {
          add: (state, action$: Observable<BookItemCart>) =>
            action$.pipe(map((book) => this.add(state, book))),
          remove: (state, action$: Observable<number>) =>
            action$.pipe(map((id) => this.remove(state, id))),
          udpate: (state, action$: Observable<BookItemCart>) =>
            action$.pipe(map((book) => this.update(state, book))),
          clear: () => {
            this._storageService.clearBooks();
            return of({ books: [], loaded: false }); 
          },
        },
        effects: (state) => ({
          load: () => {
            if (state().loaded) {
              this._storageService.saveBooks(state().books);
            }
          },
        }),
    });

    private add(state: Signal<State>, book: BookItemCart) {
        const isInCart = state().books.find(
            (bookInCart) => bookInCart.book.book_id === book.book.book_id,
        );

        if (!isInCart) {
            return {
                books: [...state().books, { ...book, quantity: 1 }],
            };
        }

        isInCart.quantity += 1;
        return {
            books: [...state().books],
        };
    }
    
      private remove(state: Signal<State>, id: number) {
        return {
            books: state().books.filter((book) => book.book.book_id !== id),
        };
      }
    
      private update(state: Signal<State>, book: BookItemCart) {
        const books = state().books.map((bookInCart) => {
          if (bookInCart.book.book_id === book.book.book_id) {
            return { ...bookInCart, quantity: book.quantity };
          }
    
          return bookInCart;
        });
    
        return { books };
      }
}
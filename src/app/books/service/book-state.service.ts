import { inject, Injectable, signal } from "@angular/core";
import { Book } from "../../shared/interfaces/Book.interface";
import { BooksService } from "./books.service";
import { catchError, map, of } from "rxjs";

interface State {
  books: Book[];
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class BooksStateService {
  private booksService = inject(BooksService);
  state = signal<State>({
    books: [],
    status: 'loading',
  });

  load(param: string = '') {
    this.state.set({ ...this.state(), status: 'loading', books: [] });

    this.booksService.getBooks(param).pipe(
      map((books) => ({
        books,
        status: 'success' as const,
      })),
      catchError((error) => {
        console.error('Error al obtener libros:', error);
        return of({ books: [], status: 'error' as const });
      })
    ).subscribe((newState) => {
      this.state.set(newState);
    });
  }
}

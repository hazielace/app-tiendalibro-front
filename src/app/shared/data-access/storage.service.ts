import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookItemCart } from '../interfaces/Book.interface';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  loadBooks(): Observable<BookItemCart[]> {
    const rawBooks = localStorage.getItem('books');

    return of(rawBooks ? JSON.parse(rawBooks) : []);
  }

  saveBooks(books: BookItemCart[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }

  clearBooks(): void {
    localStorage.removeItem('books');
  }
}
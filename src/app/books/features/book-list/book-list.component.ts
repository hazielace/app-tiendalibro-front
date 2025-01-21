import { Component, inject } from '@angular/core';
import { BooksService } from '../../service/books.service';
import { Book } from '../../../shared/interfaces/Book.interface';
import { BooksStateService } from '../../service/book-state.service';
import { BookCardComponent } from '../../ui/book-card/book-card.component';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent, FormsModule],
  templateUrl: './book-list.component.html',
  styles: ``,
  providers: [BooksStateService]
})
export default class BookListComponent {
  bookState = inject(BooksStateService);
  cartState = inject(CartStateService).state;
  searchParam: string = '';

  constructor() {
    this.bookState.load();
  }

  addToCart(book: Book) {
    this.cartState.add({
      book,
      quantity: 1,
    });
  }

  searchBooks() {
    this.bookState.load(this.searchParam);
  }
}

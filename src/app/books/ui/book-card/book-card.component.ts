import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../shared/interfaces/Book.interface';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styles: ``
})
export class BookCardComponent {
  book = input.required<Book>();

  addToCart = output<Book>();

  add(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.book());
  }
}

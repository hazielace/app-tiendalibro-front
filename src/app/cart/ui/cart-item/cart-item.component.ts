import { Component, input, output } from '@angular/core';
import { BookItemCart } from '../../../shared/interfaces/Book.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styles: ``
})
export class CartItemComponent {
  bookCartItem = input.required<BookItemCart>();

  onRemove = output<number>();

  onIncrease = output<BookItemCart>();

  onDecrease = output<BookItemCart>();
}

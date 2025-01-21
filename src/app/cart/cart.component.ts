import { Component, inject } from '@angular/core';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { BookItemCart } from '../shared/interfaces/Book.interface';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``
})
export default class CartComponent {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrease(book: BookItemCart){
    this.state.udpate({
      book: book.book,
      quantity: book.quantity+1,
    });
  }

  onDecrease(book: BookItemCart){
    this.state.udpate({
      ...book, 
      quantity: book.quantity -1,
    })
  }

}

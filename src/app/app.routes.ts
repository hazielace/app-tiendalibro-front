import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: ()=> import('./books/features/book-shell/book.routes')
    },
    { path: 'cart', loadChildren: () => import('./cart/cart.routes') },
    {
        path: '**',
        redirectTo: '',
      },
];

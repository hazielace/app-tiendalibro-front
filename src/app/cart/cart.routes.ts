import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./cart.component'),
    },
    {
        path: 'client',
        loadComponent: () => import('./ui/client-form/client-form.component').then(m => m.ClientFormComponent),
    },

] as Routes;
import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('../book-list/book-list.component'),
    },
] as Routes;
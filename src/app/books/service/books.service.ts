
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Book } from "../../shared/interfaces/Book.interface";
import { map, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class BooksService extends BaseHttpService{
  apiURL= environment.API_URL;

  getBooks(param: string = ''): Observable<Book[]> {
    return this.http.post<any>(`${this.apiURL}/libros`, { param }).pipe(
      map(response => response.data)
    );
  }
  
}
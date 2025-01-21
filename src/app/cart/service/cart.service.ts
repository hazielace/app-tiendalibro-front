
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Order } from "../../shared/interfaces/Book.interface";
import { map, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class CartService extends BaseHttpService{
  apiURL= environment.API_URL;

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${this.apiURL}/cliente-orden`, order);
  }
  
}
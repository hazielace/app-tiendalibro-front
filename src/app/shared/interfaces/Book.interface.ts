export interface Book {
    book_id: number;
    isbn: string;
    name: string;
    stock: number;
    current_price: number;
    image: string;
}

export interface BookItemCart {
    book: Book;
    quantity: number;
}

export interface Client {
    tipo_documento: number;
    nro_documento: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
}

export interface OrderDetail {
    libro_id: number;
    cantidad: number;
    precio: number;
  }
  
  export interface Order {
    cliente: Client;
    tipo_documento_ord: number;
    total: number;
    detalles: OrderDetail[];
  }


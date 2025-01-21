import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  styles: []
})
export class ClientFormComponent implements OnInit {
  private cartService = inject(CartService);
  private cartState = inject(CartStateService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form!: FormGroup; 
  cartBooks = this.cartState.state().books;
  totalPrice = this.cartState.state.price(); 
  isDocNumberDisabled = false; 

  ngOnInit(): void {
    this.form = this.fb.group({
      doc_type: ['', [Validators.required]],
      doc_number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      order_doc_type: ['', [Validators.required]],
    });
    this.onDocTypeChange()
  }

  onDocTypeChange() {
    const docTypeCtrl = this.form.get('doc_type');
    const docNumberCtrl = this.form.get('doc_number');
  
    if (!docTypeCtrl || !docNumberCtrl) return;
  
    const docType = docTypeCtrl.value;
    console.log(`Tipo de documento seleccionado: ${docType}`);
    docNumberCtrl.clearValidators();

    if (docType) {
      docNumberCtrl.enable();
      this.isDocNumberDisabled = false;
    } else {
      docNumberCtrl.disable();
      this.isDocNumberDisabled = true;
    }
  
    switch (Number(docType)) {
      case 1:
        console.log('DNI seleccionado');
        docNumberCtrl.setValidators([
          Validators.required,
          Validators.pattern(/^\d{8}$/),
        ]);
        break;
      case 2:
        console.log('RUC seleccionado');
        docNumberCtrl.setValidators([
          Validators.required,
          Validators.pattern(/^\d{11}$/),
        ]);
        break;
      case 3:
        console.log('Carné de extranjería seleccionado');
        docNumberCtrl.setValidators([
          Validators.required,
          Validators.pattern(/^.{0,20}$/),
        ]);
        break;
      default:
        console.log('Tipo de documento no válido');
        docNumberCtrl.clearValidators();
    }
  
    docNumberCtrl.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.invalid || this.cartBooks.length === 0) {
      alert('Por favor, completa todos los campos y agrega productos al carrito.');
      return;
    }
    const order = {
      cliente: {
        tipo_documento: this.form.value.doc_type,
        nro_documento: this.form.value.doc_number,
        nombre: this.form.value.first_name,
        apellido: this.form.value.last_name,
        telefono: this.form.value.phone,
        email: this.form.value.email,
      },
      tipo_documento_ord: this.form.value.order_doc_type,
      total: this.totalPrice,
      detalles: this.cartBooks.map((item) => ({
        libro_id: item.book.book_id,
        cantidad: item.quantity,
        precio: item.book.current_price * item.quantity,
      })),
    };

    this.cartService.createOrder(order).subscribe({
      next: () => {
        localStorage.removeItem('books');
        this.cartState.state.clear;
        Swal.fire({
          icon: 'success',
          title: '¡Pedido registrado!',
          text: 'El pedido se ha registrado correctamente.',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al guardar la orden:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear la orden. Inténtalo nuevamente.',
        });
      },
    });
  }
}

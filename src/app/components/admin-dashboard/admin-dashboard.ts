import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  adminForm!: FormGroup;

  productosForm!: FormGroup;

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.adminForm = this.formBuilder.group({
      adminNombre: ['', Validators.required],
      adminApellido: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')]],
      adminConfirmPassword: ['', Validators.required],
    })

    this.productosForm = this.formBuilder.group({
      id_producto: ['', Validators.required],
      nombre_producto: ['', Validators.required],
      categoria_producto: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      precio_producto: ['', [Validators.required]],
      stock_producto: ['', [Validators.required]],
      imagen_producto: ['', Validators.required],
    })
  }

  ngOnInit() {

    console.log(this.productos);

    let table = new DataTable('#adminTable', {
      searching: true,
      paging: true,
      ordering: true,
      responsive: true,
      columns: [
        {title: 'ID'},
        {title: 'Nombre'},
        {title: 'Categoria'},
        {title: 'Descripcion'},
        {title: 'Precio'},
        {title: 'Stock'},
        {title: 'Acciones'},
      ],
      data:
        this.productos.map((item: any) => {
          return[
            item.id_producto,
            item.nombre_producto,
            item.categoria_producto == 'juegos-mesa' ? 'Juegos de Mesa' : item.categoria_producto == 'juegos-cartas' ? 'Juegos de Cartas' : 'Juegos de Rol',
            item.descripcion_producto,
            this.formatoCLP.format(item.precio_producto),
            `<span class="badge border border-light ${item.stock_producto >= 10 ? 'bg-success' : item.stock_producto >= 5 ? 'bg-warning' : 'bg-danger'}">${item.stock_producto}</span>`,
            `<button type="button" class="btn btn-danger" (click)="borrarProducto(${item.id_producto})"><i class="bi bi-trash"></i></button>`
          ]
        })
    });
  }

  onSubmit() {

    if (this.adminForm.valid){
      let user_role = 'administrador';

      let admin = {
        nombre: this.adminForm.value.adminNombre,
        apellido: this.adminForm.value.adminApellido,
        username: this.adminForm.value.adminEmail.split('@')[0],
        email: this.adminForm.value.adminEmail,
        password: this.adminForm.value.adminPassword,
        role: user_role
      }

      this.usuarios.push(admin)
      localStorage.setItem('productos', JSON.stringify(admin))

      Swal.fire({
        icon: 'success',
        title: 'Administrador agregado',
        text: 'El administrador ha sido agregado exitosamente',
        theme: 'dark'
      }).then(() => {
        this.adminForm.reset();
      });
    }

  }

  onSubmitProduct(){

    if (this.productosForm.valid){
      let producto = {
        id_producto: this.productosForm.value.id_producto,
        nombre_producto: this.productosForm.value.nombre_producto,
        categoria_producto: this.productosForm.value.categoria_producto,
        descripcion_producto: this.productosForm.value.descripcion_producto,
        precio_producto: this.productosForm.value.precio_producto,
        stock_producto: this.productosForm.value.stock_producto,
        imagen_producto: this.productosForm.value.imagen_producto,
      }

      this.productos.push(producto);
      localStorage.setItem('productos', JSON.stringify(this.productos));

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto ha sido agregado exitosamente',
        theme: 'dark'
      }).then(() => {
        location.reload();
      });

    }
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  showConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  borrarProducto(id: number) {

    let producto = this.productos.find((producto: any) => producto.id_producto == id);

    this.productos.splice(this.productos.indexOf(producto), 1);
    localStorage.setItem('productos', JSON.stringify(this.productos));

    Swal.fire({
      icon: 'success',
      title: 'Producto eliminado',
      text: 'El producto ha sido eliminado exitosamente',
      theme: 'dark'
    }).then(() => {
      location.reload();
    });

  }

}

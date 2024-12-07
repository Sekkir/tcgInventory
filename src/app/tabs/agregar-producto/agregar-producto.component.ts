import { Component, ViewChild,EventEmitter, Output } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, IonicModule } from '@ionic/angular';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { ProductosPage } from 'src/app/pages/productos/productos.page';
import { TabsService } from 'src/app/servicios/tabs/tabs.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})



export class AgregarProductoComponent {

  @ViewChild('tabs', { static: false }) tabs!: IonTabs; // Referencia a los tabs
  @Output() productoAgregado = new EventEmitter<void>();
  
  precio_lote: number = 0;
  costos_extra: number = 0;

  correlativo: string = '';

  nombre_producto: string = '';

  tipos_producto: any[] = [];
  tipo_productoElegido!: number;
  stock: number = 0;

  precio_compra: number = 0;
  costo_unidad: number = 0;

  ganancia: number = 0;

  precioFinal: number = 0;

  precio_venta: number = 0;
  id_creado_por: number = 0;


  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private toastController: ToastController,
    private productosPage: ProductosPage,  // Inyectar el controlador del toast
    private tabEventService: TabsService
  ) {}

  ngOnInit() {
    this.obtenerUsuarioId();
  }


  obtenerUsuarioId() {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.id_creado_por = decodedToken.id_usuario; // ID del usuario
      console.log("Id de Usuario Logueado: ", this.id_creado_por);
    } else {
      console.error("No se pudo obtener el id_usuario del token.");
    }
  }



  calcularPrecioCompra() {
    this.costo_unidad = (this.precio_compra * this.costos_extra) / this.precio_lote;
  }

  calcularPrecioVenta() {
    this.precioFinal = (this.precio_compra + this.costo_unidad) * (1 + this.ganancia / 100);
  }



  recargarTiposProducto() {
    this.productosService.obtenerTiposProducto().subscribe(
      (tipos: any[]) => {
        this.tipos_producto = tipos; // Actualizamos la lista en el componente
        console.log('Lista de tipos de producto recargada desde la base de datos:', this.tipos_producto);
      },
      (error) => {
        console.error('Error al recargar los tipos de producto:', error);
      }
    );
  }
  









  // Método para guardar el producto
  guardarProducto() {

    const producto = {
      costo_lote: this.precio_lote,
      costos_extras: this.costos_extra,

      correlativo: this.correlativo,
      nombre_producto: this.nombre_producto,
      stock: this.stock,

      precio_unidad: this.precio_compra,
      costo_unidad: this.costo_unidad,


      ganancia: this.ganancia,
      precio_venta: this.precioFinal,
      id_creado_por: this.id_creado_por,
      id_tipoProducto: this.tipo_productoElegido,


    };

    console.log(producto);

    // Llamada al servicio para crear el producto
    this.productosService.crearProducto(producto).subscribe(
      async (response) => {

        this.tabEventService.emitirEventoRefrescar();
        console.log('Producto creado con éxito:', response);

        
        // Mostrar Toast indicando que el producto fue creado
        const toast = await this.toastController.create({
          message: 'Producto creado con éxito',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();

        
        this.limpiarCampos();




        // Cambiar al tab "lista-productos"
        this.productosPage.cambiarTab('listaProductos');
        
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }






    // Limpiar los campos
    limpiarCampos() {
      this.correlativo = '';
      this.nombre_producto = '';
      this.precio_compra = 0;
      this.ganancia = 0;
      this.precio_venta = 0;
      this.stock = 0;
      this.precioFinal = 0;
      this.precio_lote = 0;
    }
}

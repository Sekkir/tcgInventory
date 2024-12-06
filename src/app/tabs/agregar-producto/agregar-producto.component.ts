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
  
  correlativo: string = '';
  nombre_producto: string = '';
  precio_compra: number = 0;
  ganancia: number = 0;
  precio_venta: number = 0;
  id_creado_por: number = 1;
  stock: number = 0;
  tipos_producto: any[] = [];
  tipo_productoElegido!: number;

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private toastController: ToastController,
    private productosPage: ProductosPage,  // Inyectar el controlador del toast
    private tabEventService: TabsService
  ) {}

  ngOnInit() {
    // Obtener el id_usuario del token decodificado
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.id_creado_por = decodedToken.id_usuario; // Asignar id_usuario al id_creado_por
    }
    this.obtenerTiposProducto();
  }




  calcularPrecioVenta() {
    this.precio_venta = this.precio_compra * (1 + this.ganancia / 100);
  }

  obtenerTiposProducto() {
    this.productosService.obtenerTiposProducto().subscribe((tipos) => {
      this.tipos_producto = tipos;
      console.log("Categorias: " + this.tipos_producto);
    });
  }





  // Método para guardar el producto
  guardarProducto() {

    const producto = {
      correlativo: this.correlativo,
      nombre_producto: this.nombre_producto,
      stock: this.stock,
      precio_compra: this.precio_compra,
      ganancia: this.ganancia,
      precio_venta: this.precio_venta,
      id_creado_por: this.id_creado_por,
      tipoProducto: this.tipo_productoElegido
    };

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
    }
}

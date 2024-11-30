import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProductosService } from 'src/app/servicios/productos/productos.service';


@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,]
})
export class ActualizarProductoComponent  implements OnInit {

  productosFiltrados: any[] = [];

  constructor(private productosService: ProductosService) {}

  buscarProducto(event: any) {

  }

  ngOnInit() {}

}

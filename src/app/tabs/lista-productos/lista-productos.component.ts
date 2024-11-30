import { Component, OnInit } from '@angular/core';
import { IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRefresher, IonRefresherContent} from "@ionic/angular/standalone";
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
  standalone: true,
  imports: [ CommonModule, IonRefresher, IonRefresherContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList]
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = []; // Variable para almacenar los productos

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  ionViewWillEnter() {
    console.log("Recargando productos...");
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productosService.getProductos().subscribe(
      (data: any[]) => {
        console.log('Productos obtenidos:', data);
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  refreshProductos(event: any) {
    console.log("Refrescando productos...");
    if (event) {
      this.obtenerProductos();
      event.target.complete();
    }
  }
}

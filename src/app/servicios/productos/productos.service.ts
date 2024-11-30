import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/api/productos'; // URL de tu API, ajusta según corresponda
  private productosSubject = new BehaviorSubject<any[]>([]); // Lista reactiva de productos


  constructor(private http: HttpClient) { }

  // Método para obtener los productos
  getProductos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

    // Método para crear un nuevo producto
    crearProducto(producto: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, producto);
    }

      // Actualizar la lista de productos de manera reactiva
  actualizarProductos(productos: any[]) {
    this.productosSubject.next(productos); // Emite la nueva lista
  }

    // Obtener el flujo reactivo de productos
    obtenerProductos(): Observable<any[]> {
      return this.productosSubject.asObservable();
    }
}

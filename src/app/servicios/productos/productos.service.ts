import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'https://betcgestadio-production.up.railway.app/api/productos'; // URL de tu API, ajusta según corresponda



  constructor(private http: HttpClient) { }

  // Método para obtener los productos
  getProductos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

    // Método para crear un nuevo producto
    crearProducto(producto: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, producto);
    }


  obtenerTiposProducto(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/categorias");
  }
}

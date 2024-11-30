import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TabsService {
  constructor() {}


    // Creamos un Subject para emitir cambios en el ícono
    private refreshIconSubject = new Subject<boolean>();

    // Observable para que otros componentes se suscriban
    refreshIcon$ = this.refreshIconSubject.asObservable();
  
    // Emitir evento cuando se agrega un producto
    emitirEventoRefrescar() {
      this.refreshIconSubject.next(true);  // Evento activado
    }
  
    // Emitir evento para restablecer el ícono
    restablecerIcono() {
      this.refreshIconSubject.next(false);  // Evento desactivado
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTab } from '@ionic/angular/standalone';
import { AgregarProductoComponent } from 'src/app/tabs/agregar-producto/agregar-producto.component';
import { ActualizarProductoComponent } from 'src/app/tabs/actualizar-producto/actualizar-producto.component';
import { ListaProductosComponent } from 'src/app/tabs/lista-productos/lista-productos.component';
import { FormsModule } from '@angular/forms';
import { addCircleOutline, createOutline, listOutline, refresh } from 'ionicons/icons';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { ChangeDetectorRef } from '@angular/core';
import { TabsService } from 'src/app/servicios/tabs/tabs.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonIcon,IonTab, IonLabel, IonIcon, 
            IonTabButton, IonTabBar, IonTabs, IonContent,
            FormsModule, IonHeader, IonTitle, IonToolbar, 
            CommonModule,AgregarProductoComponent, 
            ListaProductosComponent, ActualizarProductoComponent]
})
export class ProductosPage implements OnInit {


  productos: any[] = [];
  @ViewChild('tabs', { static: false }) tabs!: IonTabs;
  @ViewChild(IonContent) content!: IonContent;
  selectedTab: string = '';
  iconoLista: string = listOutline; // Icono inicial
  iconoColor: string = ''; // Color inicial (sin color verde)
  showRefreshIcon: boolean = false; // Bandera para mostrar el ícono de recarga
  id_usuario: any;





  icons = {
    add: addCircleOutline,
    update: createOutline,
    list: listOutline,
    download: refresh,
  };



  constructor(
    private authService: AuthService,
    private productosService: ProductosService,
    private changeDetectorRef: ChangeDetectorRef,
    private tabEventService: TabsService
  ) {

}

  ngOnInit() {
    //this.obtenerUsuarioId();

    this.obtenerProductos();
    // Nos suscribimos al evento del servicio
    this.tabEventService.refreshIcon$.subscribe((data) => {
      if (data) {
        this.iconoLista = this.icons.download; // Cambiar al ícono de "descargar"
        this.iconoColor = 'green'; // Cambiar color a verde
        this.showRefreshIcon = true; // Activar la bandera para mostrar el ícono de recarga
      }
    });
  }
  


    // Obtener el id_usuario desde el token
    obtenerUsuarioId() {
      const decodedToken = this.authService.getDecodedToken();
      if (decodedToken && decodedToken.id_usuario) {
        this.id_usuario = decodedToken.id_usuario;
        console.log('ID Usuario:', this.id_usuario);
      }
    }


    obtenerProductos() {
      this.productosService.getProductos().subscribe(
        (data: any[]) => {
          this.productos = data;
          this.changeDetectorRef.detectChanges();
        },
        (error) => {
          console.error('Error al obtener productos:', error);
        }
      );
    }
  

    cambiarTab(tabName: string) {
      this.selectedTab = tabName;
      this.tabs.select(tabName);
      if (tabName === 'listaProductos') {
        this.obtenerProductos();
      }
    }

  restablecerIcono() {
    // Aquí restablecemos el ícono a su estado original cuando se haya refrescado la lista
    this.iconoLista = this.icons.list;
    this.iconoColor = ''; // Restablecer color
    this.showRefreshIcon = false; // Desactivar la bandera
  }


    // Evento cuando se hace pull-to-refresh
    doRefresh(event: any) {
      setTimeout(() => {
        this.obtenerProductos(); // Volver a obtener los productos
        this.restablecerIcono();  // Restablecer el ícono a su estado original
        event.target.complete();  // Marcar que el refresco ha terminado
      }, 1000);  // Tiempo de espera simulado antes de que se complete el refresco
    }

}


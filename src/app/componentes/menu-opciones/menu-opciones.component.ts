import { Component, OnInit } from '@angular/core';
import { IonList, IonItem } from '@ionic/angular/standalone';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductosService } from 'src/app/servicios/productos/productos.service';





@Component({
  selector: 'app-menu-opciones',
  templateUrl: './menu-opciones.component.html',
  styleUrls: ['./menu-opciones.component.scss'],
  standalone:true,
  imports:[
    IonList,IonItem
  ]
})
export class MenuOpcionesComponent  implements OnInit {

  constructor(
    private alertController: AlertController,
    private productosService: ProductosService,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  async addCategoria() {
    const alert = await this.alertController.create({
      header: 'Agregar Categoría',
      inputs: [
        {
          name: 'tipo_producto',
          type: 'text',
          placeholder: 'Nombre de la categoría',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            if (data.tipo_producto.trim()) {
              this.productosService.addTipoProducto(data.tipo_producto.trim()).subscribe(
                async (response) => {
                  if (response.success) {
                    const toast = await this.toastController.create({
                      message: 'Categoría agregada exitosamente',
                      duration: 2000,
                      color: 'success',
                    });
                    toast.present();

                    
                  } else {
                    const toast = await this.toastController.create({
                      message: 'Error al agregar categoría',
                      duration: 2000,
                      color: 'danger',
                    });
                    toast.present();
                  }
                },
                async (error) => {
                  const toast = await this.toastController.create({
                    message: 'Error en el servidor',
                    duration: 2000,
                    color: 'danger',
                  });
                  toast.present();
                  console.error('Error al agregar categoría:', error);
                }
              );
            } else {
              this.showEmptyFieldToast();
            }
          },
        },
      ],
    });
  
    await alert.present();
  }

  addExpansion() {
    console.log('Agregar Expansion');
    // Lógica para agregar expansion
  }

  private async showEmptyFieldToast() {
    const toast = await this.toastController.create({
      message: 'El campo no puede estar vacío',
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }


    obtenerTiposProducto() {
    this.productosService.obtenerTiposProducto();
  }
}

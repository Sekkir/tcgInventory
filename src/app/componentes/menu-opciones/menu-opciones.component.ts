import { Component, OnInit } from '@angular/core';
import { IonList, IonItem } from '@ionic/angular/standalone';

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

  constructor() { }

  ngOnInit() {}


  addCategoria() {
    console.log('Agregar Categoria');
    // Lógica para agregar categoria
  }

  addExpansion() {
    console.log('Agregar Expansion');
    // Lógica para agregar expansion
  }
}

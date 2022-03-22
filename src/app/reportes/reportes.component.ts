import { Component, OnInit, NgModule, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { AnyMxRecord, AnyRecord } from 'dns';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs/operators';
import { Precio } from '../models/precio';
import * as internal from 'stream';
import { Reporte } from '../models/reporte';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reportes: any[] = new Array<any>();
  inscripciones: any[] = new Array<any>();
  precios: Precio[] = new Array<Precio>();
  total_sus:number = 0;

  
  constructor(private db: AngularFirestore) {
    
    interface Reporte{
      nombre: string;
      cantidad: number;
    }

    this.db.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.docs.forEach((inscripcion)=>{
        let inscripcionaux:any;
        let dato = '';
        inscripcionaux = inscripcion.data();
        dato = inscripcionaux.precios.id;
        this.inscripciones.push(dato);
      })
    })     

    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio:Precio;
        precio = item.data() as Precio;
        precio.id = item.id;
        this.precios.push(precio);
      })

      this.precios.forEach(precio_n => {
        let cantidad_act = 0;
        this.inscripciones.forEach(inscripcion =>{
          if (precio_n.id == inscripcion) {
            cantidad_act+=1;
          }
        })
        const reporte:Reporte={
          nombre: precio_n.nombre,
          cantidad: cantidad_act
        };
        this.reportes.push(reporte);
      })
      this.total_sus = this.cantidadTotal();
    });

     //console.log(this.inscripciones);
      //console.log(this.reportes);
      

  }

  cantidadTotal(){
    
    let total_suscripciones = 0;
    this.reportes.forEach((element) => {
      total_suscripciones = total_suscripciones + element.cantidad
    })

    return total_suscripciones;
  }

  ngOnInit(): void {
      console.log(this.inscripciones);
      console.log(this.precios);

    
  }



}

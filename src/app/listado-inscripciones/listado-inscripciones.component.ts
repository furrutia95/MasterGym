import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {

  inscripciones: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.inscripciones.length = 0;

    this.db.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{
        let inscripcionObtenida : any
        inscripcionObtenida = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;

        this.db.doc(inscripcionObtenida.cliente.path).get().subscribe((cliente)=>{
          inscripcionObtenida.clienteObtenido = cliente.data();
          inscripcionObtenida.fecha = new Date(inscripcionObtenida.fecha.seconds * 1000)
          inscripcionObtenida.fechaFinal = new Date(inscripcionObtenida.fechaFinal.seconds * 1000)
          this.inscripciones.push(inscripcionObtenida);
        })
      })
    })
  }

}

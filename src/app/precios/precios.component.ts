import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  esEditar: boolean = false;
  id:string = '';
  formularioPrecio!: FormGroup;
  precios: Precio[] = new Array<Precio>();
  constructor(private fb: FormBuilder,
    private afs: AngularFirestore,
    private msj: MensajesService) { }

  ngOnInit(): void {

    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required], 
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    });

    this.mostrarPrecios();

  }

  agregar(){
    this.afs.collection<Precio>('precios').add(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Agregado', 'Se agrego correctamente');
      this.formularioPrecio.reset();
      this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Ocurrio un error');
    })
  }


  editarPrecio(precio: Precio)
  {
    this.esEditar = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo:precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id;
  }

  mostrarPrecios(){
    this.afs.collection('precios').get().subscribe((result)=>{
      this.precios.length = 0;
      result.docs.forEach((dato)=>{
        let precio:Precio;
        precio = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref as DocumentReference;
        this.precios.push(precio);

      })
    })
  }

  editar(){
    this.afs.doc('precios/' + this.id).update(this.formularioPrecio.value).then(()=>{
      this.msj.mensajeCorrecto('Editado', 'Se edito correctamente');
      this.formularioPrecio.reset();
      this.esEditar = false;
      this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Ocurrio un error')
    })
  }

}

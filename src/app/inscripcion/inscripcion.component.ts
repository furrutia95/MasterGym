import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { throws } from 'assert';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion(null, null, null, null, 0,0,0);
  clienteSeleccionado: Cliente = new Cliente('', '', '','', null, '',0,'',null,false);
  precioSeleccionado: Precio = new Precio('','',0,0,0,null);
  precios: Precio[] = new Array<Precio>();
  idPrecio: string = 'null';
  constructor(private db: AngularFirestore,
    private msj: MensajesService) { }

  ngOnInit(): void {
    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio:Precio;
        precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref as DocumentReference;
        this.precios.push(precio);
      })
    })

    console.log(this.precios);
  }
  asignarCliente(cliente:Cliente)
  {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;   
  }

  eliminarCliente()
  {
    this.clienteSeleccionado = new Cliente('', '', '','', null, '',0,'',null,false);
    this.inscripcion.cliente = null;
  }

  guardar(){
    if(this.inscripcion.validar().esValido)
    {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }

        this.db.collection('inscripciones').add(inscripcionAgregar).then(()=>{
          this.inscripcion = new Inscripcion(null, null, null, null, 0,0,0);
          this.clienteSeleccionado = new Cliente('', '', '','', null, '',0,'',null,false);
          this.precioSeleccionado = new Precio('','',0,0,0,null);
          this.idPrecio = 'null';
          this.msj.mensajeCorrecto('Guardado', 'Se guardo correctamente');
          console.log('Guardando');
        })
     
    }else{
      this.msj.mensajeAdvertencia('Advertencia', this.inscripcion.validar().mensaje);
    }
    console.log(this.inscripcion);
  }

  seleccionarPrecio(id:string)
  {

    if(id != null){
    this.precioSeleccionado = this.precios.find(x=> x.id == id) as Precio;
    this.inscripcion.precios = this.precioSeleccionado.ref;

    this.inscripcion.subTotal = this.precioSeleccionado.costo;
    this.inscripcion.iva = this.inscripcion.subTotal * 0.15;
    this.inscripcion.total = this.inscripcion.subTotal * this.inscripcion.iva;

    this.inscripcion.fecha = new Date();

    if (this.precioSeleccionado.tipoDuracion == 1) 
    { 
      let dias: number = this.precioSeleccionado.duracion;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate()+dias);
      this.inscripcion.fechaFinal = fechaFinal;
      //Fecha Final = precioSeleccionado.duracion * 1;
    }
    if (this.precioSeleccionado.tipoDuracion == 2) 
    {
      let dias: number = this.precioSeleccionado.duracion * 7;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate()+dias);
      this.inscripcion.fechaFinal = fechaFinal;
      //Fecha Final = precioSeleccionado.duracion * 7;
    }
    if (this.precioSeleccionado.tipoDuracion == 3) 
    {
      let dias: number = this.precioSeleccionado.duracion * 15;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate()+dias);
      this.inscripcion.fechaFinal = fechaFinal;
      //Fecha Final = precioSeleccionado.duracion * 15;
    }
    if (this.precioSeleccionado.tipoDuracion == 4) 
    {
      let meses = this.inscripcion.fecha.getMonth() + this.precioSeleccionado.duracion;
      let anio:number = this.inscripcion.fecha.getFullYear()
      let dia:number = this.inscripcion.fecha.getDate()
      let fechaFinal = new Date(anio, meses, dia);
      this.inscripcion.fechaFinal = fechaFinal;
      //Fecha Final = this.inscripcion.fecha agregar un mes this.precioSeleccionado.duracion
    }
    if (this.precioSeleccionado.tipoDuracion == 5) 
    {
      let meses = this.inscripcion.fecha.getMonth();
      let anio:number = this.inscripcion.fecha.getFullYear()  + this.precioSeleccionado.duracion;
      let dia:number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(anio, meses, dia);
      this.inscripcion.fechaFinal = fechaFinal;
      //Fecha Final = this.inscripcion.fecha agregar los años this.precioSeleccionado.duracion
    }
    }
    else{
      this.precioSeleccionado = new Precio('','',0,0,0,null);
      this.inscripcion.precios = null;
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.subTotal = 0
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }
  }

}

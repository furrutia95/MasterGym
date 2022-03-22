import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss'],
  
})
export class AgregarClienteComponent implements OnInit {

  porcentajeSubida: any;
  formularioCliente!: FormGroup;
  urlImagen : string = '';
  esEditable: boolean = false;
  id: string = '';
  constructor(private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private msj: MensajesService)
    { 

    }
    

  ngOnInit(): void {
    
    

    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo:['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })

    this.id = this.activeRoute.snapshot.params['clienteID'];
    if(this.id != undefined){
      this.esEditable = true;

      this.afs.doc<any>('clientes/' + this.id ).valueChanges().subscribe((cliente)=>{
        console.log(cliente)
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          cedula: cliente.cedula,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds*1000).toISOString().substr(0,10),
          telefono: cliente.telefono,
          imgUrl: ''
        })
  
        this.urlImagen = cliente.imgUrl;
  
      })
    }
    
  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    console.log(this.formularioCliente.value)
    this.afs.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      this.msj.mensajeCorrecto('Agregar', 'Se agrego correctamente');
    })
  }

  subirImagen(evento:any){

      if(evento.target.files.length > 0){
      let nombre = new Date().getTime().toString();
      const file = evento.target.files[0];
      let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      const filePath = 'clientes/' + nombre + extension;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.then((objeto)=>{
        console.log('imagen subida');
        ref.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
        })
      })
      task.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = parseInt(porcentaje.toString());
      })
      }
      
  }

  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    this.afs.doc('clientes/' + this.id).update(this.formularioCliente.value).then((resultado)=>{
      this.msj.mensajeCorrecto('Edito', 'Se edito correctamente');
    }).catch(()=>{
      this.msj.mensajeError('Error', 'Ocurrió algún error');
    })
  }




}

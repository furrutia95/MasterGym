import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  clientes: any[] = new Array<any>();

  constructor(private afs: AngularFirestore) {

    /*this.afs.collection('clientes').valueChanges().subscribe((resultado) =>{
      this.clientes = resultado;
      console.log(resultado);
    })
    */

    this.clientes.length = 0;
    this.afs.collection('clientes').get().subscribe((resultado)=>{
      console.log(resultado);

      resultado.docs.forEach((item)=>{
        let cliente:any;
        cliente= item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        console.log (cliente);
        this.clientes.push(cliente);
      })
    })

    }  
  
  ngOnInit(): void {
    for (const i in this.clientes) {
      console.log(this.clientes[i]);
    }
  }

}

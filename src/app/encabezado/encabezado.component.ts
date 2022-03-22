import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  usuario: any;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.auth.signOut();
  }

}

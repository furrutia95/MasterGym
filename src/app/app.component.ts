import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from '@firebase/util';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  usuario: any;
  cargando: boolean = true;

  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((user) => {
      this.cargando = false;
      this.usuario = user;
    })
  }
  
}

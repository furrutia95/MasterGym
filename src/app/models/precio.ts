import { DocumentReference } from "@angular/fire/compat/firestore";

export class Precio{

    constructor(
        public id:string,
        public nombre:string,
        public costo:number,
        public duracion:number,
        public tipoDuracion:number,
        public ref:DocumentReference | null
    ){}
}   
import { DocumentReference } from "@angular/fire/compat/firestore";

export class Cliente{

    constructor(
        public id:string,
        public nombre:string,
        public apellido:string,
        public correo:string,
        public fechaNacimiento:Date | null,
        public imgUrl:string,
        public telefono: number,
        public cedula:string,
        public ref:DocumentReference | null,
        public visible: boolean
    ){}
}   
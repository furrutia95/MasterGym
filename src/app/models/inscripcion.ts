import { DocumentReference } from "@angular/fire/compat/firestore";

export class Inscripcion{
    constructor(
        public fecha: Date | null,
        public fechaFinal: Date | null,
        public cliente: DocumentReference | null,
        public precios: DocumentReference | null,
        public subTotal: number,
        public iva: number,
        public total: number
    ){

    }

    validar(): any{
        let respuesta = {
            esValido: false,
            mensaje: ''
        }

        if(this.cliente == null || this.cliente == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No ha agregado un cliente'
            return respuesta;
        }
        
        if(this.precios == null || this.precios == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No ha seleccionado un precio'
            return respuesta;
        }

        if(this.fecha == null || this.fecha == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No tiene fecha de inicio'
            return respuesta;
        }

        if(this.fechaFinal == null || this.fechaFinal == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No tiene fecha final'
            return respuesta;
        }
        
        if(this.subTotal <= 0 || this.subTotal == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No se ha podido calcular el sub Total'
            return respuesta;
        }
        if(this.iva <= 0 || this.iva == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No se ha podido calcular el iva'
            return respuesta;
        }

        if(this.total <= 0 || this.total == undefined)
        {
            respuesta.esValido = false;
            respuesta.mensaje = ' No se ha podido calcular el Total'
            return respuesta;
        }
        respuesta.esValido = true;
        return respuesta;

    }
}
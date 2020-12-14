import { autoserialize } from 'cerialize';

export class Cliente {

    @autoserialize
    clienId!: number;

    @autoserialize
    clienNombre!: string;

    @autoserialize
    clienDireccion!: string;

    @autoserialize
    clienBorrado!: boolean;

    @autoserialize
    clienFechaAlta!: Date;

    public static OnSerialized(e: Cliente, json: any): void {

    }

    public static OnDeserialized(e: Cliente, json: any): void {
    }
}

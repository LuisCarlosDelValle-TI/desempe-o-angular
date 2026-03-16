import { Injectable } from '@angular/core';
import { SalaReunion } from '../app/models/SalaReunion';
import { Reserva } from '../app/models/Reserva';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private salas: SalaReunion[] = [
    new SalaReunion(1, 'Sala Norte', 12, 'Piso 1', true, false),
    new SalaReunion(2, 'Sala Sur', 8, 'Piso 2', true, false),
    new SalaReunion(3, 'Sala Ejecutiva', 6, 'Piso 3', false, true),
  ];

  private reservas: Reserva[] = [];
  private nextReservaId = 1;
  private nextSalaId = 4;

  getSalas(): SalaReunion[] {
    return this.salas;
  }

  getReservas(): Reserva[] {
    return this.reservas;
  }

  crearSala(nombreSala: string, capacidad: number, ubicacion: string): void {
    const sala = new SalaReunion(this.nextSalaId++, nombreSala, capacidad, ubicacion, true, false);
    this.salas.push(sala);
  }

  cambiarMantenimiento(idSala: number, enMantenimiento: boolean): void {
    const sala = this.buscarSala(idSala);
    sala.setMantenimiento(enMantenimiento);
  }

  registrarReserva(
    nombreUsuario: string,
    idSala: number,
    fecha: string,
    horaInicio: string,
    horaFin: string,
  ): void {
    const sala = this.buscarSala(idSala);
    const nueva = new Reserva(this.nextReservaId, nombreUsuario, sala, fecha, horaInicio, horaFin);

    const traslape = this.reservas.some((r) => {
      if (r.sala.idSala !== idSala || r.fecha !== fecha) return false;
      return horaInicio < r.horaFin && horaFin > r.horaInicio;
    });

    if (traslape) {
      throw new Error('Ya existe una reserva para esa sala en ese horario.');
    }

    this.reservas.push(nueva);
    sala.setDisponibilidad(false);
    this.nextReservaId++;
  }

  private buscarSala(idSala: number): SalaReunion {
    const sala = this.salas.find((s) => s.idSala === idSala);
    if (!sala) throw new Error('La sala seleccionada no existe.');
    return sala;
  }
}
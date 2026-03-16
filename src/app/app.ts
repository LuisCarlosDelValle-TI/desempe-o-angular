import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../services/orden.service';
import { SalaReunion } from './models/SalaReunion';
import { Reserva } from './models/Reserva';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  salas: SalaReunion[] = [];
  reservas: Reserva[] = [];

  mensajeExito = '';
  mensajeError = '';

  formSala = {
    nombreSala: '',
    capacidad: 1,
    ubicacion: '',
  };

  formReserva = {
    nombreUsuario: '',
    idSala: 0,
    fecha: '',
    horaInicio: '',
    horaFin: '',
  };

  constructor(private servicio: OrdenService) {
    this.refrescarDatos();
  }

  private refrescarDatos(): void {
    this.salas = this.servicio.getSalas();
    this.reservas = this.servicio.getReservas();
    if (this.salas.length > 0 && this.formReserva.idSala === 0) {
      this.formReserva.idSala = this.salas[0].idSala;
    }
  }

  private limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  crearSala(): void {
    this.limpiarMensajes();
    try {
      this.servicio.crearSala(
        this.formSala.nombreSala,
        this.formSala.capacidad,
        this.formSala.ubicacion,
      );
      this.mensajeExito = 'Sala creada correctamente.';
      this.formSala = { nombreSala: '', capacidad: 1, ubicacion: '' };
      this.refrescarDatos();
    } catch (error: any) {
      this.mensajeError = error.message;
    }
  }

  crearReserva(): void {
    this.limpiarMensajes();
    try {
      this.servicio.registrarReserva(
        this.formReserva.nombreUsuario,
        this.formReserva.idSala,
        this.formReserva.fecha,
        this.formReserva.horaInicio,
        this.formReserva.horaFin,
      );
      this.mensajeExito = 'Reserva registrada correctamente.';
      this.formReserva = {
        nombreUsuario: '',
        idSala: this.salas[0]?.idSala ?? 0,
        fecha: '',
        horaInicio: '',
        horaFin: '',
      };
      this.refrescarDatos();
    } catch (error: any) {
      this.mensajeError = error.message;
    }
  }

  toggleMantenimiento(sala: SalaReunion, valor: boolean): void {
    this.limpiarMensajes();
    try {
      this.servicio.cambiarMantenimiento(sala.idSala, valor);
      this.mensajeExito = valor
        ? `Sala "${sala.nombreSala}" en mantenimiento.`
        : `Sala "${sala.nombreSala}" fuera de mantenimiento.`;
      this.refrescarDatos();
    } catch (error: any) {
      this.mensajeError = error.message;
    }
  }
}
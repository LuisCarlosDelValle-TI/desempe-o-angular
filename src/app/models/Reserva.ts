import { SalaReunion } from './SalaReunion';

export class Reserva {
  constructor(
    public idReserva: number,
    public nombreUsuario: string,
    public sala: SalaReunion,
    public fecha: string, 
    public horaInicio: string, 
    public horaFin: string, 
  ) {
    this.validar();
  }

  private validar(): void {
    if (!this.nombreUsuario.trim()) {
      throw new Error('El nombre del usuario es obligatorio.');
    }

    if (!this.sala) {
      throw new Error('Debes seleccionar una sala.');
    }

    const inicio = this.horaAMinutos(this.horaInicio);
    const fin = this.horaAMinutos(this.horaFin);
    const apertura = this.horaAMinutos('08:00');
    const cierre = this.horaAMinutos('18:00');

    
    if (inicio >= fin) {
      throw new Error('La hora de inicio debe ser anterior a la hora de fin.');
    }

   
    if (inicio < apertura || fin > cierre) {
      throw new Error('La reserva debe estar entre 08:00 y 18:00.');
    }

   
    if (!this.sala.disponible) {
      throw new Error('No se puede reservar una sala no disponible.');
    }
  }

  private horaAMinutos(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  
  }
}

export class SalaReunion {
  constructor(
    public idSala: number,
    public nombreSala: string,
    public capacidad: number,
    public ubicacion: string,
    public disponible: boolean = true,
    public enMantenimiento: boolean = false, 
  ) {
    this.validarCapacidad();
    this.sincronizarDisponibilidad();
  }

  private validarCapacidad(): void {
    if (this.capacidad <= 0) {
      throw new Error('La capacidad de la sala debe ser mayor a 0.');
    }
  }

  private sincronizarDisponibilidad(): void {
    this.disponible = !this.enMantenimiento;
  }

  setMantenimiento(valor: boolean): void {
    this.enMantenimiento = valor;
    this.sincronizarDisponibilidad();
  }

  setDisponibilidad(valor: boolean): void {
    if (this.enMantenimiento && valor) {
      throw new Error('No se puede habilitar una sala en mantenimiento.');
    }
    this.disponible = valor;
  }
}
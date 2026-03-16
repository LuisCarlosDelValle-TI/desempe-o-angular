// Eestados permitidos
export type EstadoOrden = 'pendiente' | 'en_proceso' | 'finalizada';

export class OrdenProduccion {
  mensaje: string = '';
  constructor(
    public id: number,
    public producto: string,
    public cantidad: number,
    public capacidadMaquina: number,
    public enMantenimiento: boolean = false, // se agrega nueva propiedad para la nueva regla
    public estado: EstadoOrden = 'pendiente',
  ) {}

  // Reglas
  /* 
    1. No puede iniciar si excede la capacidad.
    2. No puede finalizar si no está en proceso.
 */

  // Nueva regla
  // (Atividad 1) No se puede iniciar la orden si la máquina está en mantenimiento.
  // (Actividad 2) Regla de eficiencia: Si cantidad > 400 → eficiencia baja.

  // verificamos si la orden puede iniciar
  puedeIniciar(): boolean {
    // Revisa si la cantidad es menor o igual a la capacidad y si no esta en mantenimiento
    return this.cantidad <= this.capacidadMaquina && !this.enMantenimiento;
  }

  // metodo que aplica la primera regla deel negocio
  iniciar(): void {
    //Nueva regla
    if (this.enMantenimiento) {
      throw new Error('No se puede iniciar: Máquina en mantenimiento.');
    }

    // Regla 1
    if (this.cantidad > this.capacidadMaquina) {
      throw new Error('No se puede iniciar: La cantidad excede la capacidad de la máquina.');
    }

    this.estado = 'en_proceso';
  }

  finalizar(): void {
    if (this.estado !== 'en_proceso') {
      throw new Error('La orden debe estar en proceso para finalizar.');
    }
    this.estado = 'finalizada';
  }

  obtenerEficiencia(): string {
    if (this.cantidad > 400) {
      return 'Baja';
    }

    return 'Alta';
  }

  obtenerPorcentajeUso(): number {
    return (this.cantidad / this.capacidadMaquina) * 100;
  }
}

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServiceService } from 'src/Servicios/Service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected servi: ServiceService) 
  {

  }
  
  pantalla = new FormControl('0');
  operaciones: '+' | '-' | '*' | '/';
  private valor1 = 0;
  private valor2 = 0;

  valorpantalla(valor: string): void {
    const valactual: string = this.pantalla.value;
    const valornumerico: boolean = (/^\d+$/.test(valactual));
    const valingresadonum: boolean = (/^\d+$/.test(valor));

    if (valornumerico && valactual !== '0') 
    {
      this.pantalla.setValue(`${this.pantalla.value}${valor}`);
    } else if (valornumerico && !valingresadonum && valactual === '0') 
    {
      this.pantalla.setValue(`${this.pantalla.value}${valor}`);
    } else if (valingresadonum && valactual.includes('.') && valactual !== '0') 
    {
      this.pantalla.setValue(`${this.pantalla.value}${valor}`);
    } else if (!valingresadonum && valactual.includes('.')) {
      return;
    } else if (!valornumerico && !valingresadonum) 
    {
      return;
    } else if (valactual === '0' || !valornumerico) 
    {
      this.pantalla.setValue(valor);
    }
  }

 
  async operacionesmath(operacion: '+' | '-' | '*' | '/'): Promise<void> {
    if (!this.valor1) {
      this.valor1 = Number(this.pantalla.value);
    } else {
      this.valor1 = await this.resultado();
    }

    this.operaciones = operacion;
    this.pantalla.setValue(operacion);
  }

  async raiz(): Promise<void> {
    if (this.pantalla.value === '0' || this.siEsOperacion()) { return; }

    const valorActual = Number(this.pantalla.value);
    const resultado = await this.servi.raizCuadrada(valorActual).toPromise();
    this.pantalla.setValue(`${resultado}`);
  }

  async exponencial(): Promise<void> {
    if (this.pantalla.value === '0' || this.siEsOperacion()) { return; }

    const valorActual = Number(this.pantalla.value);
    const resultado = await this.servi.exponencial(valorActual).toPromise();
    this.pantalla.setValue(`${resultado}`);
  }

  async resultado(): Promise<number> {
    if (!this.valor1) {
      return;
    } else {
      this.valor2 = Number(this.pantalla.value);
    }

    const n1 = Number(this.valor1);
    const n2 = Number(this.valor2);
    let resultado = 0;

    switch (this.operaciones) {
      case '+': {
        resultado = await this.servi.sumar(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
      case '-': {
        resultado = await this.servi.restar(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
      case '*': {
        resultado = await this.servi.multiplicar(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
      case '/': {
        resultado = await this.servi.dividir(n1, n2).toPromise();
        this.pantalla.setValue(`${resultado}`);
        break;
      }
    }

    this.valor1 = 0;
    this.valor2 = 0;
    return resultado;
  }

  clean(): void {
    this.valor1 = 0;
    this.valor2 = 0;
    this.pantalla.reset('0');
  }

  private siEsOperacion(): boolean {
    if (this.pantalla.value === '+' ||
      this.pantalla.value === '-' ||
      this.pantalla.value === '*' ||
      this.pantalla.value === '/') {
        return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = 'http://localhost:5000/api/Calculadora';

constructor(protected servi: HttpClient)
 {

 }



sumar(n1: number, n2: number): Observable<number> {
  return this.servi.get<number>(`${this.url}/sumar?n1=${n1}&n2=${n2}`);
}

restar(n1: number, n2: number): Observable<number> {
  return this.servi.get<number>(`${this.url}/restar?n1=${n1}&n2=${n2}`);
}

multiplicar(n1: number, n2: number): Observable<number> {
  return this.servi.get<number>(`${this.url}/multiplicar?n1=${n1}&n2=${n2}`);
}

dividir(n1: number, n2: number): Observable<number> {
  return this.servi.get<number>(`${this.url}/dividir?n1=${n1}&n2=${n2}`);
}

raizCuadrada(n1: number): Observable<number> {
  return this.servi.get<number>(`${this.url}/raizCuadrada?n1=${n1}`);
}

exponencial(n1: number): Observable<number> {
  return this.servi.get<number>(`${this.url}/exponencial?n1=${n1}`);
}

}

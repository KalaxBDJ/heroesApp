import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl : string = environment.baseUrl;

  private url : string = this.baseUrl;

  constructor( private http : HttpClient ) { }

  getHeroes() : Observable<Heroe[]>
  {
    let uri = this.url + 'heroes';
    return this.http.get<Heroe[]>(uri);
   
  }

  getHeroePorId(id : string) : Observable<Heroe> {
  
    let uri = `${this.url}heroes/${id}`;

    return this.http.get<Heroe>(uri);
  }

  getSugerencias( termino : string) : Observable<Heroe[]>
  {
    let uri = `${this.url}heroes?q=${termino}&_limit=6`;

    return this.http.get<Heroe[]>(uri)
  }

  agregarHeroe( heroe : Heroe) : Observable<Heroe>
  {
    let uri = `${this.url}heroes`
    return this.http.post<Heroe>(uri,heroe);

  }
  
  
  actualizarHeroe( heroe : Heroe) : Observable<Heroe>
  {
    let uri = `${this.url}heroes/${heroe.id}`
    return this.http.put<Heroe>(uri,heroe);

  }

}

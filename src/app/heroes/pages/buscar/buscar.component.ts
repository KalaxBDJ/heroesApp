import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino : string = '';
  heroes : Heroe[] = [];
  heroeSelected : Heroe | undefined;

  constructor( private heroesService : HeroesService) { }

  ngOnInit(): void {
  }

  buscando()
  {
    this.heroesService.getSugerencias(this.termino).subscribe( (res : Heroe[])=> {
      this.heroes =res;
    } )
  }

  opcionSeleccionada( event : MatAutocompleteSelectedEvent) 
  {
    if(!event.option.value)
    {
      this.heroeSelected = undefined;
      console.log("No se selecciono nada")
      return;
    }

    const heroe : Heroe = event.option.value
    this.heroeSelected = heroe;
    
    this.termino = heroe.superhero;
  }

}

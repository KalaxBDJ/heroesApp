import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      max-height : 350px;
      width : auto;
      align-content : center;
      border-radius : 5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {


  publisher = [
    {
      id : 'DC Comics',
      desc : 'DC - comics'
    },
    {
      id : 'Marvel Comics',
      desc : 'Marvel - Comics'
    }
  ]

  heroe : Heroe = {
    superhero : '',
    characters : '',
    alter_ego : '',
    first_appearance : '',
    publisher : 'Marvel Comics',
    alt_img : ''
  }

  constructor(private heroesService : HeroesService,
              private active : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void 
  {
    if(!this.router.url.includes('editar'))
    {
      return;
    }

    this.active.params
    .pipe(switchMap( ({id}) => this.heroesService.getHeroePorId(id) ))
    .subscribe( heroe => {
      this.heroe = heroe;
    } )

  }

  guardar()
  {
    if(this.heroe.superhero.trim().length == 0)
    {
      return;
    }
    
    if(this.heroe.id)
    {
      //Update
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {
        console.log('Actualizando Heroe...')
        this.heroe = heroe;
      })
    }
    else
    {
      //Crear nuevo
      this.heroesService.agregarHeroe(this.heroe).subscribe( resp => {
        this.router.navigate(['/heroes/editar',resp.id])
      } )

      
      
    }


  }
}

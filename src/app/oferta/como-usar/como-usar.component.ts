import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Oferta} from "../../shared/oferta.model";
import {OfertasService} from "../../ofertas.service";

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {
  public comoUsar: string;
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.route.parent.params.subscribe((oferta: Params) => {
      this.ofertasService.getComoUsarPorId(oferta.id).then((comoUsar: string) =>{
        console.log(comoUsar);
        this.comoUsar = comoUsar;
      })
    })
  }

}

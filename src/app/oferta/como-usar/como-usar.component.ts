import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
  this.ofertasService.getComoUsarPorId(this.route.parent.snapshot.params["id"]).then(
   (comoUsar: string) => {
     this.comoUsar = comoUsar;
   } 
  );

  }

}

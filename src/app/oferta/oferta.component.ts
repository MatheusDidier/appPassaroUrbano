import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Oferta } from "../shared/oferta.model";
import { OfertasService } from "../ofertas.service";


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {


  public oferta: Oferta;


  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }
  ngOnDestroy(): void {

  }

  ngOnInit() {


    this.route.params.subscribe((parametro: Params) => {
      this.ofertasService.getOfertasPorId(parametro.id).then((oferta: Oferta) => {
        this.oferta = oferta;
        console.log(oferta);
      });

    });




    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro);
    // }, (erro: any) =>{
    //   console.log(erro);
    // }, () => {
    //   console.log("PROCESSAMENTO CONCLUIDO!");
    // })

    // let tempo = Observable.interval(2000);

    // tempo.subscribe((intervalo: number) =>  {
    //   console.log(intervalo);
    // })





  }
}

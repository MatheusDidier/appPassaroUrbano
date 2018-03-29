import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Oferta } from "../shared/oferta.model";
import { OfertasService } from "../ofertas.service";
import {CarrinhoService} from "../carrinho.service";
import ItemCarrinho from "../shared/item-carrinho.model";


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {


  public oferta: Oferta;


  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, private carrinhoService: CarrinhoService) { }
  ngOnDestroy(): void {

  }

  public adicionarItemCarrinho(): void{

    this.carrinhoService.incluirItem(this.oferta);

  }

  ngOnInit() {

    console.log("OFERTA: ", this.carrinhoService.exibirItens())


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

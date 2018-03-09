import { Component, OnInit } from '@angular/core';
import { OfertasService } from "../ofertas.service";
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';
import "../util/rxjs-extensions";


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Array<Oferta>>;
  public ofertas2: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  public pesquisa(digitado: string): void {
    console.log("INPUT", digitado);
    this.subjectPesquisa.next(digitado);



    //   this.ofertas = this.ofertasService.pesquisaOfertas(digitado);
    //   this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas),
    // (erro: any) => console.log("ERRO STATUS", erro.status),
    // () => console.log("FLUXO DE EVENTOS COMPLETO"));


  }
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {

    this.ofertas = this.subjectPesquisa.debounceTime(1000).distinctUntilChanged().switchMap((termo: string) => {
      console.log("REQUISIÇÂO SWITCH")
      //RETORNANDO OBSERVABLE VAZIO CASO SEJA VAZIO A LINHA DIGITADA
      if (termo.trim() === "") {
        return Observable.of<Oferta[]>([]);
      }
      return this.ofertasService.pesquisaOfertas(termo);
    })
    .catch((erro: any) => {
      console.log(erro);
      return Observable.of<Oferta[]>([]); 
    });
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      this.ofertas2 = ofertas;
    });
    console.log("OIA AQ", this.ofertas);
  }

}

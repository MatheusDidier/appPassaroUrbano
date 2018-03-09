import { Http, Response} from "@angular/http";
import { Oferta } from "./shared/oferta.model";
import { Injectable } from "@angular/core";
import {URL_API} from "./app.api";
import {URL_COMO_USAR} from "./app.api";
import {URL_ONDE_FICA} from "./app.api";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/retry";

@Injectable()
export class OfertasService {



  constructor(private http: Http) { }
  public getOfertasPorCategoria(categoria: string) : Promise<Array<Oferta>>{
    return this.http.get(URL_API + '?categoria=' + categoria).toPromise().then((response:Response) => {
      return response.json().filter((item) => item.destaque == true);
    })

  }
  public getOfertasPorId(id: number): Promise<Oferta>{
    return this.http.get(URL_API + '?id=' + id).toPromise().then((response:Response) => {
      return response.json().shift();
    })
  }

  public getComoUsarPorId(id: number): Promise<Object>{
    return this.http.get(URL_COMO_USAR + "?id=" + id).toPromise().then((response: Response) => {
      return response.json().shift().descricao;
    })
  }
  public getOndeFicaPorId(id: number): Promise<Object>{
    return this.http.get(URL_ONDE_FICA).toPromise().then((response: Response) => {
      return response.json().shift().descricao;
    })
  }

  public getOfertas(): Promise<Array<Oferta>> {
    //Efetuar uma requisição HTTP

    return this.http.get(URL_API).toPromise().then((response: Response) => {
      return response.json().filter((item) =>  item.destaque == true);
    })
    //RETORNAR UMA PROMESSA
  }


  public pesquisaOfertas(termo: string) : Observable<Array<Oferta>>{
    return this.http.get(URL_API + "?descricao_oferta_like=" + termo).retry(10).map((resposta: Response) => {
      return resposta.json();
    });
    
    
  }




































  // public getOfertas2(): Promise<Array<Oferta>> {
  //   return new Promise((resolve, reject) => {
  //     //ALgum tipo de processamento que ao finalizar chama a função resolved ou a rejected, dependendo da situação
  //     let deu_certo = true;
  //     if (deu_certo) {
  //       setTimeout(() => resolve(this.ofertas), 3000);
  //     }
  //     else {

  //       reject({ codigo_erro: "404", mensagem_erro: "Not found" });
  //     }
  //   })
  //     .then((ofertas: Oferta[]) => {
  //       //fazer alguma tratamento
  //       console.log("PRIMEIRO THEN");
  //       return ofertas;
  //     })
  //     .then((ofertas: Oferta[]) => {
  //       console.log("OUTRA TATATIVA");
  //       return new Promise((resolve2, reject2) => {
  //         setTimeout(() => {
  //           resolve2(ofertas)
  //         }, 3000)
  //       })
  //     })
  //     .then((ofertas: Oferta[]) => {
  //       console.log("TERCEIRO THEN ESPERANDO O OUTRO");
  //       return ofertas;
  //     })
  // }
}

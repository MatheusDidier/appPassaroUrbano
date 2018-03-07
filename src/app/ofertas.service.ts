import { Oferta } from "./shared/oferta.model";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class OfertasService {
  constructor(private http: Http) { }
  public getOfertasPorCategoria(categoria: string) : Promise<Array<Oferta>>{
    return this.http.get('http://localhost:3000/ofertas?categoria=' + categoria).toPromise().then((response:any) => {
      return response.json().filter((item) => item.destaque == true);
    })

  }
  public getOfertasPorId(id: any): Promise<Oferta>{
    return this.http.get('http://localhost:3000/ofertas?id=' + id).toPromise().then((response:any) => {
      return response.json();
    })

  }
  public getOfertas(): Promise<Array<Oferta>> {
    //Efetuar uma requisição HTTP
    let url = "http://localhost:3000/ofertas";
    return this.http.get(url).toPromise().then((response: any) => {
      return response.json().filter((item) =>  item.destaque == true);
    })
    //RETORNAR UMA PROMESSA
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

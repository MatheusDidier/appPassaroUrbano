import {Pedido} from "./shared/pedido.model";
import{Http, Response, RequestOptions, Headers} from "@angular/http";
import{Injectable} from "@angular/core";
import { Observable } from "rxjs/Observable";
import {URL_API_PEDIDO} from "./app.api";

@Injectable()
export class OrdemCompraService {

    constructor(private http:Http){}

    public efetivarCompra(pedido: Pedido) : Observable<any>{
        let headers: Headers = new Headers();

        headers.append("Content-type", "application/json");

        return this.http.post(URL_API_PEDIDO,JSON.stringify(pedido), new RequestOptions({headers: headers}))
        .map((response:Response) => {
          console.log("OLHA O ID RETORNANDO JSON DO POST: ", response.json().id);
            return response.json().id;
        });


    }


}

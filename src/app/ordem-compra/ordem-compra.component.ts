import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from "../ordem-compra.service"
import {Pedido} from "../shared/pedido.model"
@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
  //
  public endereco: string = "";
  public numero: string = '10';
  public complemento: string = "";
  public formaPagamento: string = "";
  //
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;
  //Estado primitivos do campo
  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;

  public formEstado: string = "disabled";

  constructor(private ordemCompraService: OrdemCompraService) { }

  public atualizaEndereco(endereco: string): void {
    this.endereco = endereco;
    this.enderecoEstadoPrimitivo = false;
    console.log(this.endereco);
    if (this.endereco.length > 3) {
      this.enderecoValido = true;
    }
    else {
      this.enderecoValido = false;
    }
    this.habilitaForm();
  }

  public atualizaNumero(numero: string): void {
    this.numero = numero;
    this.numeroEstadoPrimitivo = false;
    console.log(this.numero);
    if (this.numero.length > 1) {
      this.numeroValido = true;
    }
    else {
      this.numeroValido = false;
    }
    this.habilitaForm();
  }
  public atualizaComplemento(complemento: string): void {
    this.complemento = complemento;
    this.complementoEstadoPrimitivo = false;
    console.log(this.complemento);
    if (this.complemento.length > 0) {
      this.complementoValido = true;
    }
    else {
      this.complementoValido = false;
    }
  }

  public atualizaFormaPagamento(forma: string): void {
    this.formaPagamento = forma;
    this.formaPagamentoEstadoPrimitivo = false;
    console.log(this.formaPagamento);
    if (this.formaPagamento.length > 0) {
      this.formaPagamentoValido = true;
    }
    else {
      this.formaPagamentoValido = false;
    }
    this.habilitaForm();
  }

  public confirmarCompra(): void{
    let p:Pedido = new Pedido(this.endereco, this.numero, this.complemento, this.formaPagamento); 
    this.ordemCompraService.efetivarCompra(p).subscribe((resposta: any) => {
      this.idPedidoCompra = resposta;
    });
  }

  public habilitaForm(): void {
    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido) {
      this.formEstado = "";
    }
    else {
      this.formEstado = "disabled";
    }
  }

  ngOnInit() {
    //this.ordemCompraService.efetivarCompra();  
  }

}

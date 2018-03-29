import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from "../carrinho.service";
import ItemCarrinho from "../shared/item-carrinho.model";


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {


  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService: CarrinhoService) { }

  public idPedidoCompra: number;
  public listaCompra: Array<ItemCarrinho>;
  public valorTotal: number;

  public formulario: FormGroup = new FormGroup({
    "endereco": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    "numero": new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    "complemento": new FormControl(null),
    "formaPagamento": new FormControl(null, [Validators.required])
  });
  ngOnInit() {
    console.log(this.carrinhoService.exibirItens());
    this.listaCompra = this.carrinhoService.itens;
    this.valorTotal = this.getValorTotal();
  }

  public confirmarCompra(): void {
    if (this.formulario.status === "INVALID") {
      this.formulario.get("endereco").markAsTouched();
      this.formulario.get("numero").markAsTouched();
      this.formulario.get("formaPagamento").markAsTouched();
    }
    else {
      if (this.listaCompra.length > 0) {
        let pedido: Pedido = new Pedido(
          this.formulario.get("endereco").value,
          this.formulario.get("numero").value,
          this.formulario.get("complemento").value,
          this.formulario.get("formaPagamento").value,
          this.listaCompra);
        this.ordemCompraService.efetivarCompra(pedido).subscribe((id: number) => {
          this.idPedidoCompra = id;
          this.carrinhoService.limparCarrinho();
        })

      }
      else{
        alert("Você não adicionou nenhum item no carrinho!")
      }

    }
  }

  public aumentarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
    this.valorTotal += item.valor;
  }

  public diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 0) {
      this.carrinhoService.decrementarQuantidade(item);
      this.valorTotal -= item.valor; ''
    }
  }

  private getValorTotal(): number {
    return this.listaCompra.reduce((acumulado, atual) => {
      return (acumulado + atual.quantidade * atual.valor);
    }, 0)
  }
}

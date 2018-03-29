import ItemCarrinho from "./shared/item-carrinho.model"
import { Oferta } from "./shared/oferta.model"
export class CarrinhoService {
  public itens: Array<ItemCarrinho> = [];

  public exibirItens(): ItemCarrinho[] {
    return this.itens;
  }

  public incluirItem(oferta: Oferta) {
    console.log("Oferta recebida no servico", oferta)
    if (!(this.jaTemItem(oferta))) {
      var carrinho: ItemCarrinho = new ItemCarrinho(oferta.id, oferta.imagens[0], oferta.titulo, oferta.descricao_oferta, oferta.valor, 1);
      this.itens.push(carrinho);
    }
  }

  public adicionarQuantidade(item: ItemCarrinho){
    item.quantidade += 1;


  }

  public decrementarQuantidade(item: ItemCarrinho){
    item.quantidade -= 1;
    if(item.quantidade == 0){
      this.itens.splice(this.itens.indexOf(item), 1);
    }
  }


  private jaTemItem(oferta: Oferta): boolean {
   return this.itens.some(function (item) {
      if (item.id == oferta.id) {
        item.quantidade += 1;
      }
      return item.id == oferta.id;
    })
  }

  public limparCarrinho(): void{
    this.itens = [];
  }


}

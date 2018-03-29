export default class ItemCarrinho {

  constructor(
    public id: number,
    public img: object,
    public title: string,
    public descricao: string,
    public valor: number,
    public quantidade: number
  ) { }
}

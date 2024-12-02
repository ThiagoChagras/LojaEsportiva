import { Item } from "./item";
import { Cliente } from "./cliente";

export class Detalhe {
    public codigo: number = 0;
    public cliente: Cliente = new Cliente();
    public total: number = 0;
    public itens: Item[] = [];
}



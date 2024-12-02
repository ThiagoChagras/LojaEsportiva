import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cesta } from '../model/cesta';
import { Item } from '../model/item';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {

  public itens: Produto[] = [];
  public mensagem: string = "Bem vindo sofredores";

  constructor(private service : ProdutoService) {
    this.vitrine();
  }

  vitrine (){
  this.service.carregarVitrine().subscribe({
    next:(data) =>{this.itens = data},
    error:(msg) =>{this.mensagem="ocorreu um erro, volte mais tarde"}
  });
}

  public abrirDetalhe(item: Produto) {
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href="./detalhe";
  }

  public adicionarItem(obj:Produto){
    let json = localStorage.getItem("cesta");
    let jsonCliente = localStorage.getItem("cliente");
    let cesta: Cesta = new Cesta();
    let item: Item = new Item();
    if(json==null){      //CESTA NAO EXISTE
        item.codigo=obj.codigo;
        item.produto=obj;
        item.quantidade=1;
        item.valor= Number(obj.valor);
        cesta.codigo = 1;
        cesta.total = obj.valor;
        cesta.itens.push(item);
        if(jsonCliente!=null) cesta.cliente = JSON.parse(jsonCliente);
    } else {  //CESTA EXISTE
      let achou = false;
      cesta = JSON.parse(json);
      for(let i=0; i<cesta.itens.length; i++){
        if(cesta.itens[i].codigo==obj.codigo){  //ITEM JA EXISTE
          cesta.itens[i].quantidade = cesta.itens[i].quantidade + 1;
          cesta.itens[i].valor =  cesta.itens[i].quantidade * cesta.itens[i].produto.valor;
          achou = true;
          break;
        }
      }
      if(!achou){  //ITEM NAO EXISTE
        item.codigo=obj.codigo;
        item.produto=obj;
        item.quantidade=1;
        item.valor= Number(obj.valor);
        cesta.itens.push(item);
      }
    }

    cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
    for(let i=0; i<cesta.itens.length; i++){
      cesta.total= Number(cesta.itens[i].valor) + cesta.total;
    }

    localStorage.setItem("cesta", JSON.stringify(cesta));
    window.location.href = "./cesta";
}

}

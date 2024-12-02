import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})
export class BuscaComponent {
  public mensagem: string = "";
  public termo: string = "";
  public lista: Produto[] = [];

  constructor(private service:ProdutoService){
    let termoBusca = localStorage.getItem("termoBusca");
    if(termoBusca!=null){
      this.termo = termoBusca;
      this.fazerBusca();
    }
  }

  fazerBusca(){
    this.service.pesquisar(this.termo).subscribe({
      next:(data)=>{
        this.lista = data;
        localStorage.setItem("termoBusca", this.termo);
        if(this.lista.length<=0)
          this.mensagem = "Não existem produtos no sistema com a palavra: "+ this.termo;
        else 
          this.mensagem = this.lista.length + " Registro(s) encontrados com a palavra:"+ this.termo;
      },
      error:(msg)=>{this.mensagem = "ocorreu erro tente mais tarde!!!!"}
    });
  }

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cesta } from '../model/cesta';
import { Cliente } from '../model/cliente';
import { Item } from '../model/item';
import { CestaService } from '../service/cesta.service';
@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  mensagem: string = "";
  cesta: Cesta = new Cesta();
  total: number = 0;
  public nomeUsuario: Cliente = new Cliente()

  ngOnInit(): void {
    // Recupera o nome do cliente armazenado no localStorage
    const cliente = localStorage.getItem('cliente');
    if (cliente) {
      this.nomeUsuario = JSON.parse(cliente).nome;
    }
  }

  constructor(private service: CestaService){
      let json = localStorage.getItem("cesta");
      if(json!=null){
        this.cesta = JSON.parse(json);
        this.mensagem = "";
        this.calcularTotal();
      } else {
        this.mensagem = "A cesta esta vazia!"
      }
   }

   calcularTotal(){
     let total = 0;
      for(let item of this.cesta.itens){
        this.total = this.total + item.valor;
      }
      this.cesta.total = this.total;
   }

   limpar(){
      this.cesta = new Cesta();
      localStorage.removeItem("cesta");
   }

   continuar(){
      window.location.href="./vitrine";
   }

   gravarPedido(){
      let jsonCliente = localStorage.getItem("cliente");
      if(jsonCliente != null) {
        this.cesta.cliente = JSON.parse(jsonCliente);
        this.cesta.total = this.total;
        this.service.gravarPedido(this.cesta).subscribe({
          next:(data)=>{
            let novoPedido = data;
            this.gravarItens(novoPedido);
          },
          error:(err)=>{this.mensagem = "Ocorreu um erro tente mais tarde!";}
        });
      } else {
        this.mensagem = "Faça o login para gravar o pedido !!!";
      }
   }

   public removerItem(obj:Item){
    this.cesta.itens = this.cesta.itens.filter(item => item != obj);
    this.cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
    for(let i=0; i<this.cesta.itens.length; i++){
      this.cesta.total= this.cesta.itens[i].valor+this.cesta.total;
    }
  console.log(this.cesta);
    localStorage.setItem("cesta", JSON.stringify(this.cesta));
  }

   gravarItens(novoPedido: Cesta){
      for(let obj of this.cesta.itens){
          obj.codigoCesta = novoPedido.codigo
      }
      this.service.gravarItens(this.cesta.itens).subscribe({
        next:(data)=>{
          this.mensagem="Pedido gravado com sucesso!!!";
          this.limpar();
        },
        error:(err)=>{this.mensagem = "Ocorreu um erro tente mais tarde!";}
    });
   }

}

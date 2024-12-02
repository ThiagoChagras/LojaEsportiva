import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService){  }

  public gravar(){
    try{
      this.service.inserir(this.obj);
      this.mensagem = "Cliente cadastrado com sucesso!";
    }
    catch(err){
      this.mensagem = "Ocorreu um erro!";
    }
  }
  public carregar(){
    let json = localStorage.getItem("cliente");
    if(json==null){
      window.location.href="./login";
    } else {
      this.obj = JSON.parse(json);
    }
  }



}

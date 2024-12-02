import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public mensagem: String = "";
  public obj : Cliente = new Cliente();
  public nomeUsuario: string | null = null;

  constructor(private service: ClienteService){}

  ngOnInit(): void {
    // Recupera o nome do cliente armazenado no localStorage
    const cliente = localStorage.getItem('cliente');
    if (cliente) {
      this.nomeUsuario = JSON.parse(cliente).nome;
    }
  }


  public fazerLogin(){
    this.service.fazerLogin(this.obj).subscribe({
        next:(data)=>{
          this.obj = data;
          if(this.obj.codigo!=0){
            localStorage.setItem("cliente", JSON.stringify(this.obj));
            window.location.href="./cesta";
          }
          else {
            this.mensagem = "login ou senha invalidos!!!"
          }
        },
        error:(msg)=>{
          this.mensagem = "ocorreu um erro tente novamente!"
        }
    });
  }


  public novoCadastro(){
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    window.location.href="./cliente";
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './esqueci.component.html',
  styleUrl: './esqueci.component.css'
})
export class EsqueciComponent {
  public mensagem: String = "";
  public obj : Cliente = new Cliente();


  constructor (private service: ClienteService){}

  public reenviar(){
    this.service.recuperarSenha(this.obj).subscribe({
      next:(data)=>{
        this.obj = data;
        if(this.obj.codigo!=0){
          this.mensagem = "Verifique o email para instruções de recuperação"
        }
        else {
          this.mensagem = "Este email não existe no nosso sistema, por favor faça o cadastro."
        }
      },
      error:(msg)=>{
        this.mensagem = "Este email não existe no nosso sistema, por favor faça o cadastro."
      }
  });
  }
}

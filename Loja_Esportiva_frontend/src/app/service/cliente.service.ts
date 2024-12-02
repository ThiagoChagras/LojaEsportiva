import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  inserir(obj: Cliente) : string {
    let mensagem = "";
    this.http.post("http://localhost:8080/api/cliente", obj)
    .subscribe(
    {
        next:(data) =>{
          mensagem = "Cliente cadastrado com sucesso!";
        },
        error:(err)=>{
          mensagem = "Ocorreu um erro tente mais tarde!";
      }
    }
    );

    return mensagem;
  }

  fazerLogin(obj: Cliente) : Observable<any> {
    return this.http.post("http://localhost:8080/api/cliente/login", obj);
  }

  recuperarSenha(obj: Cliente) : Observable<any> {
    return this.http.post("http://localhost:8080/api/cliente/recupera", obj);
  }
}

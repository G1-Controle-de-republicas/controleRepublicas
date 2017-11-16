import { Component, OnInit } from '@angular/core';
import { Usuario } from '../definitions/usuario';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Usuario = new Usuario();
  erro: boolean = false;

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

  conectar(value) {
    this.service.doLogin(this.user).subscribe(res => {
      if (res != false) {
        this.router.navigate(['/painel']);
      }else{
        this.erro = true;
      }
    }, err => {
      console.log("Erro ao logar: " + err);
    });
  }

  cadastrar(){
    this.router.navigate(['/cadastro']);
  }


}
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../definitions/usuario';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Grupo } from '../definitions/Grupo';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: Usuario = new Usuario();
  group: Grupo = new Grupo();
  erro: boolean = false;

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/login']);
  }

  cadastrar(value){
    this.group.qtd = 1;
    this.service.createGroup(this.group).subscribe(res =>{
      this.user.idGrupo = res;
      this.service.createUser(this.user).subscribe(res =>{
        if(res != false){
          this.login();
        }else{
          this.erro = true;
        }
      }, err =>{
        console.log("Erro ao criar o usuário: " + err);
      });
    }, err => {
      console.log("Erro ao criar o grupo: " + err);
    });
  }
}

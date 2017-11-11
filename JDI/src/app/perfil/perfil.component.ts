import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from '../definitions/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: Usuario = new Usuario();
  constructor(public service: AppService, public router: Router) { }

  getUserInfo(){
    this.service.getLogado().subscribe(res => {
      this.user = res;
      }, err => {
        console.log("Erro ao buscar user info: " + err);
      });
    }

  ngOnInit() {
    this.getUserInfo();
  }

  returnToPainel(){
    this.router.navigate(['/painel']);
  }

} 
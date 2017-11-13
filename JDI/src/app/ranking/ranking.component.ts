import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from '../definitions/usuario';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  user: Usuario = new Usuario();
  userLst: Array<Usuario> = new Array<Usuario>();

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

  returnToPainel(){
    this.router.navigate(['/painel']);
  }

  buscaRankeados(){
    this.service.buscaIntegrantes().subscribe(res =>{
      this.userLst = res;
    }, err => {
      console.log("Deu ruim na busca " + err);
    })
  }

}

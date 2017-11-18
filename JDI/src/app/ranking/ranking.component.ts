import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from '../definitions/usuario';
import { forEach } from '@angular/router/src/utils/collection';
import { Tarefa } from '../definitions/tarefa';
import { Ranking } from '../definitions/Ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  userLst: Array<Usuario> = new Array<Usuario>();
  rankLst: Array<Ranking> = new Array<Ranking>();
  
  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
    this.buscaRankeados();
  }

  returnToPainel(){
    this.router.navigate(['/painel']);
  }

  buscaRankeados(){
    this.service.buscaIntegrantes().subscribe(res =>{
      this.userLst = res;
      this.preencheRnk();
    }, err => {
      console.log("Deu ruim na busca " + err);
    })
  }

  preencheRnk(){
    this.userLst.forEach((u:Usuario) =>{
      this.service.buscaTarefa(u.id, u.idGrupo).subscribe(res =>{
        let rk : Ranking;
        rk.usuario = u.nome;
        rk.tarefas = res;
        this.rankLst.push(rk);
      })
    })
  }
  
  rp(tarefas){
    let rp;
    tarefas.forEach((t:Tarefa) =>{
      if(t.isDone == true)
        rp++;
    })
    return rp * 10;
  }
}

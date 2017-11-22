import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  rank: Array<Ranking> = new Array<Ranking>();
  newBet: boolean = false;

  constructor(public service: AppService, public router: Router) {
  }

  ngOnInit() {
    this.buscaRankeados();
  }

  returnToPainel() {
    this.router.navigate(['/painel']);
  }

  buscaRankeados() {
    this.service.buscaIntegrantes().subscribe(res => {
      this.userLst = res;
      this.preencheRnk();
    }, err => {
      console.log("Deu ruim na busca " + err);
    })
  }

  userimg(user) {
    var imgPadrao = "../../assets/img/ufo.png";
    var imgPerfil = this.service.URL_ASSETS + user.id + ".png";
    var img: string;
    if (!user.imagem)
      img = imgPadrao;
    else
      img = imgPerfil;

    return img;
  }

  preencheRnk() {
    this.userLst.forEach((u: Usuario) => {
      this.service.buscaTarefa(u.id, u.idGrupo).subscribe(res => {
        let rk: Ranking = new Ranking();
        rk.usuario = u;
        rk.tarefas = res;
        rk.rp = this.rp(rk.tarefas);
        this.rankLst.push(rk);
      })
    });

  }

  rp(tarefas: Array<Tarefa>) {
    let rp: number;
    rp = 0;
    tarefas.forEach((t: Tarefa) => {
      if (t.isDone == true) {
        rp++;
      }
    })
    return rp * 10;
  }

  novaAposta(){
    this.newBet = true;
  }

  resetVar(){
    this.newBet = false;
  }
}

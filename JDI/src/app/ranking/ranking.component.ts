import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from '../definitions/usuario';
import { forEach } from '@angular/router/src/utils/collection';
import { Tarefa } from '../definitions/tarefa';
import { Ranking } from '../definitions/Ranking';
import { Grupo } from '../definitions/Grupo';
import { Aposta } from '../definitions/Aposta';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})


export class RankingComponent implements OnInit {
  editBet: boolean;

  aposta: Aposta = new Aposta();
  bet: Aposta = new Aposta();
  userLst: Array<Usuario> = new Array<Usuario>();
  rankLst: Array<Ranking> = new Array<Ranking>();
  rank: Array<Ranking> = new Array<Ranking>();
  newBet: boolean = false;

  constructor(public service: AppService, public router: Router) {
  }

  ngOnInit() {
    this.buscaRankeados();
    this.loadAposta();
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

  novaAposta() {
    this.newBet = true;
  }

  resetVar() {
    this.newBet = false;
    this.editBet = false;
    this.bet = new Aposta();
  }

  saveBet() {
    this.bet.idGrupo = this.service.logado.idGrupo;
    this.service.createBet(this.bet).subscribe(res => {
      console.log(res);
      this.resetVar();
    }, erro => {
      console.log("Erro ao criar aposta: " + erro);
    })
  }

  loadAposta() {
    this.service.buscaAposta().subscribe(res => {
      this.aposta = res[0];
    }, erro => {
      console.log("Erro ao carregar aposta: " + erro);
    });
  }

  editarAposta() {
    this.bet = this.aposta;
    this.editBet = true;
  }

  saveEdit() {
    this.service.editaAposta(this.bet).subscribe(res => {
      console.log(res);
      this.loadAposta();
      this.resetVar();
    }, erro => {
      console.log("Erro ao editar aposta: " + erro);
    });
  }

}

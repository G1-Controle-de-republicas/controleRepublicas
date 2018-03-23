import { Component, OnInit } from '@angular/core';
import { AppService } from "../app-service.service";
import { Router } from "@angular/router";
import { Pendencia } from '../definitions/Pendencia';

@Component({
  selector: 'app-pendencias',
  templateUrl: './pendencias.component.html',
  styleUrls: ['./pendencias.component.css']
})
export class PendenciasComponent implements OnInit {
  retorno: boolean;
  txFeedback: String;

  pendencias: Array<Pendencia> = new Array<Pendencia>();
  integrantes = [];

  cat = [
    "../../assets/img/cat-adm.png",
    "../../assets/img/cat-limpeza.png",
    "../../assets/img/cat-comida.png",
    "../../assets/img/cat-outros.png"
  ];

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
    this.loadPendencias();
    this.buscaIntegrantes();
  }

  returnToPainel() {
    this.router.navigate(["/painel"]);
  }

  loadPendencias() {
    this.service.buscaPendencias().subscribe(res => {
      this.pendencias = res;
      this.updatePendencias();
      console.log(this.pendencias);
    }, erro => {
      console.log("Erro ao buscar pendencias: " + erro);
    });
  }

  buscaDono(id) {
    for (let i = 0; i < this.integrantes.length; i++) {
      if (this.integrantes[i].id == id) {
        return this.integrantes[i].nome;
      }
    }
  }

  buscaIntegrantes() {
    this.service.buscaIntegrantes().subscribe(res => {
      this.integrantes = res;
    });
  }

  votar(pendencia) {
    if (pendencia.tarefa.idUsuario == this.service.logado.id) {
      this.feedback("Voce não pode votar nesta pendência");
    } else {

      if (this.verificaVoto(pendencia.votos, this.service.logado.id)) {
        var votos = pendencia.votos;
        var user = this.service.logado.id;

        votos.push(user);
        pendencia.votos = votos;

        this.service.votar(pendencia).subscribe(res => {
          this.feedback("Voto realizado!");
          this.loadPendencias();
        }, erro => {
          console.log("Erro ao tentar votar: " + erro);
        });
      } else {
        this.feedback("Você ja votou nesta pendencia");
      }

    }
  }

  verificaVoto(votos, id) {

    for (let i = 0; i < votos.length; i++) {
      if (votos[i] == id) return false;
    }

    return true;
  }

  updatePendencias() {
    if (!this.service.group.qtd) {
      this.service.getGrupo().subscribe(res => {
        this.service.group = res;
        this.updatePendencias();
      });
    } else {
      for (let i = 0; i < this.pendencias.length; i++) {
        if (this.pendencias[i].votos.length == this.service.group.qtd) {
          this.deletePendencia(this.pendencias[i]);
        }
      }
    }

  }

  deletePendencia(pendencia) {
    var tarefa = pendencia.tarefa;
    tarefa.isDone = true;

    this.service.updateTarefa(tarefa).subscribe(res => {
      console.log(res);
      this.service.deletePendencia(pendencia).subscribe(res => {
        console.log(res);
        this.loadPendencias();
      }, erro => {
        console.log("Erro ao excluir pendencia: " + erro);
      });
    });
  }

  feedback(text: String) {
    this.txFeedback = text;
    this.retorno = true;
        
    setTimeout(() =>{
      this.retorno = false;
    }, 4000);
  }

}

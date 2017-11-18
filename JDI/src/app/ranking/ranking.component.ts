import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from '../definitions/usuario';
import { forEach } from '@angular/router/src/utils/collection';
import { Tarefa } from '../definitions/tarefa';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  user: Usuario = new Usuario();
  userLst: Array<Usuario> = new Array<Usuario>();
  lstTask: Array<Tarefa> = new Array<Tarefa>();

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
    this.buscaRankeados();
    console.log(this.userLst);
  }

  returnToPainel() {
    this.router.navigate(['/painel']);
  }

  buscaRankeados() {
    this.service.buscaIntegrantes().subscribe(res => {
      this.userLst = res;
    }, err => {
      console.log("Deu ruim na busca " + err);
    })
  }

  rp(id, idgrupo) {
    this.service.buscaTarefa(id, idgrupo).subscribe(res => {
      this.lstTask = res;
      let ctrl = 0;
      this.lstTask.forEach((t: Tarefa) => {
        console.log(t);
        if (t.isDone == true) {
          ctrl += 1;
        }
      });
      return 1;
    })
  }
}

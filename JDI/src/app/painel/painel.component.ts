import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../definitions/tarefa';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {
  sidebarOpen: boolean = false;
  newTask: boolean;
  usuario: any;  

  tarefa: Tarefa = new Tarefa();
  tarefaLst: Array<Tarefa> = new Array<Tarefa>();

  constructor(public service: AppService, public router: Router) { }

  sidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit() {
    this.loadTarefas();
  }

  novatarefa() {
    this.newTask = true;
    console.log(this.tarefaLst);
  }

  closeAdd() {
    this.resetVar();
  }

  addTask() {
    this.tarefa.idUsuario = this.service.logado.id;
    this.tarefa.isDone = false;
    console.log(this.tarefa);
    this.service.criarTarefa(this.tarefa).subscribe(res => {
      this.loadTarefas();
      this.resetVar();
    }, erro => {
      console.log("erro ao criar tarefa: " + erro);
    });
  }

  resetVar() {
    this.tarefa = new Tarefa();
    this.newTask = false;
  }

  loadTarefas() {
    this.service.getLogado().subscribe(res => {
      this.usuario = res;
      this.service.buscaTarefa(this.usuario.id, this.usuario.idGrupo).subscribe(res => {
        this.tarefaLst = res;
      }, err => {
        console.log("Erro ao buscar tarefas: " + err);
      });
    });
  }

  goToPerfil(){
    this.router.navigate(['/perfil'])
  }

  goToContas(){
    this.router.navigate(["/contas"]);
  }
  goToListacompras(){
    this.router.navigate(['/listacompras']);
  }

  goToRanking(){
    this.router.navigate(['/ranking']);
  }

  goToRep(){
    this.router.navigate(['/republica']);
  }
}

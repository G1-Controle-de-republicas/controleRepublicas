import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../definitions/tarefa';
import { Usuario } from '../definitions/Usuario';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {
  sidebarOpen: boolean = false;
  newTask: boolean = false;
  editTask: boolean = false;
  usuarioLogado: Usuario = new Usuario();  

  tarefa: Tarefa = new Tarefa();
  editTarefa: Tarefa = new Tarefa();
  tarefaLst: Array<Tarefa> = new Array<Tarefa>();

  mask = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/];
  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  cat = [
    "../../assets/img/cat-adm.png",
    "../../assets/img/cat-limpeza.png",
    "../../assets/img/cat-comida.png",
    "../../assets/img/cat-outros.png"
  ];

  imgUser = "../../assets/img/ufo.png";

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
      this.usuarioLogado = res;
      this.service.buscaTarefa(this.usuarioLogado.id, this.usuarioLogado.idGrupo).subscribe(res => {
        this.tarefaLst = res;
      }, err => {
        console.log("Erro ao buscar tarefas: " + err);
      });
    });
  }

  logOut(){
    this.service.logOut().subscribe(res =>{
      this.router.navigate(['/login']);
    }, erro =>{
      console.log("Erro ao fazer Logout: " + erro);
    })
  }

  // da pra fazer tudom com uma funçao ;)

  navigate(rota){
    if(rota == "perfil") this.router.navigate(['/perfil']);

    if(rota == "contas") this.router.navigate(["/contas"]);

    if(rota == "lista") this.router.navigate(['/listacompras']);

    if(rota == "ranking") this.router.navigate(['/ranking']);

    if(rota == "republica") this.router.navigate(['/republica']);
  }

  editarTarefa(task){
    this.editTarefa = task;
    this.editTask = true;
  }

  cancelEdit(){
    this.editTarefa = new Tarefa();
    this.editTask = false;
  }

  saveEdit(){
    this.service.updateTarefa(this.editTarefa).subscribe(res =>{
      console.log(res);
      this.cancelEdit();
      this.loadTarefas();
    }, erro =>{
      console.log("Erro ao salvar edição: " + erro);
    });
  }

  removeTask(){
    this.service.deleteTarefa(this.editTarefa).subscribe(res => {
      console.log(res);
      this.cancelEdit();
      this.loadTarefas();
    }, erro => {
      console.log("Erro ao deletar tarefa: " + erro);
    });
  }
}

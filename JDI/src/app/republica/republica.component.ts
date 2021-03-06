import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from "../definitions/Usuario";
import { Tarefa } from "../definitions/Tarefa";

@Component({
  selector: 'app-republica',
  templateUrl: './republica.component.html',
  styleUrls: ['./republica.component.css']
})
export class RepublicaComponent implements OnInit {

  newUser: boolean = false;
  user: Usuario = new Usuario();
  userLst: Array<Usuario> = new Array<Usuario>();
  userTarefasLst: Array<Tarefa> = new Array<Tarefa>();

  statusTask: boolean = false;

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.buscaIntegrantes().subscribe(res => {
      this.userLst = res;
      console.log(this.userLst);
    });
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

  cancelNovoUser() {
    this.newUser = false;
    this.resetVar();
  }

  novoUser() {
    this.newUser = true;
  }

  goToPainel() {
    this.router.navigate(["/painel"]);
  }

  resetVar() {
    this.user = new Usuario();
    this.user = new Usuario();
  }

  createUser() {
    this.user.idGrupo = this.service.logado.idGrupo;
    this.service.createUser(this.user).subscribe(res => {
      console.log(res);
      var grp = this.service.group;
      grp.qtd += 1;
      this.updateGrupo(grp);
      this.loadUsers();
      this.cancelNovoUser();
    }, erro => {
      console.log("Erro ao criar usuario: " + erro);
    });
  }

  updateGrupo(grp) {
    this.service.editaGrupo(grp).subscribe(res => {
      console.log(res);
    }, erro => {
      console.log("Erro ao atualizar grupo: " + erro);
    });
  }

  loadTarefas(usuario) {
    console.log(usuario);
    this.service.buscaTarefa(usuario.id, usuario.idGrupo).subscribe(res => {
      this.userTarefasLst = res;
    }, erro => {
      console.log("Erro ao carregar tarefas do usuario: " + erro);
    });
  }

  status(user) {
    this.statusTask = true;
    this.loadTarefas(user);
  }

  backList() {
    this.statusTask = false;
  }

}

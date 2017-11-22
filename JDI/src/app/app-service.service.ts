import { Injectable, Component, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from "rxjs"
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Router } from "@angular/router";
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { Grupo } from './definitions/Grupo';

declare var jQuery: any;

@Injectable()
export class AppService {
  user: any;
  logado: any;
  group: Grupo = new Grupo();

  URL = "http://localhost:3000/";
  URL_ASSETS = "http://localhost:3000/assets/";

  User: any;
  clientes: any;

  constructor(private http: Http, private router: Router) {
    moment.locale('pt-BR');
  }

  private doRequest(method: string, url, data: any = null, redirectOnError = true, hideLoad = false): Observable<Response> {
    return new Observable(obs => {
      let headers = new Headers({ allowedHeaders: 'Content-Type,Authorization' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      if (!data)
        data = {};
      data["dt"] = new Date();
      var callback = res => {
        if (res.status === 444) {
          return;
        }

        if (res.status < 200 || res.status >= 300) {
          obs.error(res);
        }
        else {
          obs.next(res);
        }
        obs.complete();
      };

      if (method.toLowerCase() == "get" || method.toLowerCase() == "delete") {
        this.http[method](this.URL + url, options).subscribe(callback, callback);
      }
      else
        this.http[method](this.URL + url, data, options).subscribe(callback, callback);
    });
  }

  getLogado() {
    return this.doRequest('get', 'login').map(res => {
      this.logado = JSON.parse(res["_body"]);
      return this.logado;
    }, err => {
      console.log('Erro login: ' + err);
    });
  }

  doLogin(usuario) {
    return this.doRequest('post', 'login', usuario, false).map(res => {
      this.logado = JSON.parse(res["_body"]);
      return this.logado;
    }, err => {
      console.log("erro ao logar: " + err);
    });
  }

  logOut() {
    return this.doRequest('get', 'login/sair/' + this.logado.id).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro service -> logout: " + erro);
    });
  }

  buscaTarefa(usuario, grupo) {
    return this.doRequest('get', 'tarefa/user/' + usuario + "/" + grupo).map(res => {
      return JSON.parse(res["_body"]);
    }, err => {
      console.log("Erro ao buscar tarefas: " + err);
    });
  }

  criarTarefa(tarefa) {
    return this.doRequest('post', 'tarefa', tarefa).map(res => {
      return res["_body"];
    }, err => {
      console.log("Erro ao criar tarefa: " + err);
    });
  }

  buscaIntegrantes() {
    return this.doRequest('get', 'usuario').map(res => {
      return JSON.parse(res["_body"]);
    }, err => {
      console.log("Erro ao buscar integrantes: " + err);
    });
  }

  updateTarefa(tarefa) {
    return this.doRequest('put', 'tarefa', tarefa).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao atualizar tarefa: " + erro);
    });
  }

  deleteTarefa(tarefa) {
    return this.doRequest('delete', 'tarefa/delete/' + tarefa.id).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao deletar tarefa: " + erro);
    });
  }

  createBill(conta) {
    return this.doRequest('post', 'conta', conta).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao criar conta: " + erro);
    });
  }

  loadBills() {
    return this.doRequest('get', 'conta').map(res => {
      return JSON.parse(res["_body"]);
    }, erro => {
      console.log("Erro ao buscar contas: " + erro);
    });
  }

  getGrupo() {
    return this.doRequest('get', 'grupo').map(res => {
      this.group = JSON.parse(res["_body"]);
      return this.group;
    }, erro => {
      console.log("Erro ao buscar grupo info: " + erro);
    });
  }

  editaGrupo(grupo){
    return this.doRequest('put','grupo', grupo).map(res =>{
      return res["body"];
    }, erro => {
      console.log("Erro ao atualizar grupo: " + erro);
    });
  }

  deleteBill(conta){
    return this.doRequest('delete','conta/delete/' + conta.id).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao excluir conta: " + erro);
    })
  }

  createUser(user){
    return this.doRequest('post','usuario', user).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao criar usuario: " + erro);
    });
  }

  editaUsuario(user){
    return this.doRequest('put', 'usuario', user).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao editar usuario: " + erro);
    });
  }

  createItem(item) {
    return this.doRequest('post', 'item', item).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao criar conta: " + erro);
    });
  }

  loadItems() {
    return this.doRequest('get', 'item').map(res => {
      return JSON.parse(res["_body"]);
    }, erro => {
      console.log("Erro ao buscar contas: " + erro);
    });
  }

  deleteItem(item){
    return this.doRequest('delete','item/' + item.id).map(res => {
      return res["_body"];
    }, erro => {
      console.log("Erro ao excluir conta: " + erro);
    })
  }

}
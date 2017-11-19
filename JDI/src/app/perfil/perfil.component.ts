import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Usuario } from '../definitions/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: Usuario = new Usuario();
  imgPadrao: String;
  imgPerfil: String;
  img: String;
  upload: String = null;


  constructor(public service: AppService, public router: Router) { }

  getUserInfo() {
    this.service.getLogado().subscribe(res => {
      this.user = res;
      this.imgPadrao = "../../assets/img/ufo.png";
      this.imgPerfil = this.service.URL_ASSETS + this.user.id + ".png";
      if (!this.user.imagem)
        this.img = this.imgPadrao;
      else
        this.img = this.imgPerfil;
    }, err => {
      console.log("Erro ao buscar user info: " + err);
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  returnToPainel() {
    this.router.navigate(['/painel']);
  }

  updateImg() {
    document.getElementById("img").click();
  }

  changeListener(e) {
    this.readThis(e.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.img = myReader.result;
      this.upload = this.img;
    }
    myReader.readAsDataURL(file);
  }

  updateUser(){
    if(this.upload){
      this.user.file = this.upload;
      this.user.imagem = true;
    } 
    this.service.editaUsuario(this.user).subscribe(res => {
      console.log(res);
    }, erro => {
      console.log("Erro ao atualizar usuário: " + erro);
    });
  }

} 
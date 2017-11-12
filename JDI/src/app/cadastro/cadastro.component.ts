import { Component, OnInit } from '@angular/core';
import { Usuario } from '../definitions/usuario';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/login']);
  }
}

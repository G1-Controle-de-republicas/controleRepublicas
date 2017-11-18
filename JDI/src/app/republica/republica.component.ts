import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";

@Component({
  selector: 'app-republica',
  templateUrl: './republica.component.html',
  styleUrls: ['./republica.component.css']
})
export class RepublicaComponent implements OnInit {

  newUser: boolean = false;

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

  cancelNovoUser(){
    this.newUser = false;
  }

  novoUser(){
    this.newUser = true;
  }

  goToPainel(){
    this.router.navigate(["/painel"]);
  }

}

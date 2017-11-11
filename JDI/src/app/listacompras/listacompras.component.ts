import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "../app-service.service";

@Component({
  selector: 'app-listacompras',
  templateUrl: './listacompras.component.html',
  styleUrls: ['./listacompras.component.css']
})
export class ListaComprasComponent implements OnInit {

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

}

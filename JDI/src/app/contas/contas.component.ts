import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
  }

  goToPainel(){
    this.router.navigate(['/painel']);
  }

  novaconta(){}

}

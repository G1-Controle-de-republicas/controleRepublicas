import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "../app-service.service";
import { Conta } from '../definitions/Conta';


@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  resultadoTotal: number = 0;
  billLst: Array<Conta> = new Array<Conta>();
  novaConta: Conta = new Conta();
  newBill = false;

  constructor(public service: AppService, public router: Router) { }

  ngOnInit() {
    this.loadContas();
  }

  goToPainel() {
    this.router.navigate(['/painel']);
  }

  addBill() {
    this.service.createBill(this.novaConta).subscribe(res =>{
      this.cancelNovaConta();
      this.loadContas();
    }, erro =>{
      console.log("Erro ao criar conta: "+ erro);
    });
  }

  novaconta() {
    this.newBill = true;
  }

  cancelNovaConta() {
    this.newBill = false;
    this.resetVar();
  }

  resetVar(){
    this.novaConta = new Conta();
  }

  loadContas(){
    this.resultadoTotal = 0;
    this.service.loadBills().subscribe(res =>{
      this.billLst = res;
      this.calculaTotal(this.billLst);
      console.log(this.billLst);
    }, erro => {
      console.log("Erro ao buscar contas: " + erro);
    });
  }

  calculaConta(valor){
    var resultado = parseInt(valor)/this.service.group.qtd;
    return resultado;
  }

  calculaTotal(contas){
    for(let i=0; i< contas.length; i++){
      this.resultadoTotal += parseInt(contas[i].valor)/this.service.group.qtd;
    }
  }

  deleteConta(conta){
    this.service.deleteBill(conta).subscribe(res => {
      this.loadContas();
    }, erro => {
      console.log("Erro ao deletar conta: " + erro);
    });
  }

}

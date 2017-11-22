import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "../app-service.service";
import { Item } from "../definitions/Item";

@Component({
  selector: 'app-listacompras',
  templateUrl: './listacompras.component.html',
  styleUrls: ['./listacompras.component.css']
})
export class ListaComprasComponent implements OnInit {

  constructor(public service: AppService, public router: Router) { }
    itemlist: Array<Item> = new Array<Item>();
    item: Item = new Item();
    newItem = false; 
    

  ngOnInit() {
    this.loadItem();
  }

  returnToPainel(){
    this.router.navigate(['/painel']);
  }

  novoItem(){
    this.newItem = true;
  }

  cancelNovoItem(){
    this.newItem = false;
  }

  addItem(){
    this.service.createItem(this.item).subscribe(res =>{
      this.cancelNovoItem();
      this.loadItem();
    }, erro => {
      console.log("Erro ao criar item: " + erro);
    });
  }

  loadItem(){
    this.service.loadItems().subscribe(res => {
      this.itemlist = res;
      console.log(this.itemlist);
    }, erro => {
      console.log("Erro ao buscar items: " + erro);
    });
  }

  deleteItem(item) {
    this.service.deleteItem(item).subscribe(res => {
      this.loadItem();
    }, erro => {
      console.log("Erro ao deletar item: " + erro);
    });
  }

  
}

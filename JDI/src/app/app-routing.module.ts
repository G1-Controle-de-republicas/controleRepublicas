import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from "@angular/common";
import { AppService } from './app-service.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PainelComponent } from './painel/painel.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RankingComponent } from "./ranking/ranking.component";
import { ListaComprasComponent } from "./listacompras/listacompras.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ContasComponent } from "./contas/contas.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path:'contas',
    component: ContasComponent
  },
  {
    path: 'ranking',
    component: RankingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'painel',
    component: PainelComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'listacompras',
    component: ListaComprasComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [
    [AppService]
  ]
})
export class AppRoutingModule {

  constructor(private router: Router, private service: AppService) {
  }

  ngOnInit() {
  }
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppService } from './app-service.service';
import { PainelComponent } from './painel/painel.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RankingComponent } from './ranking/ranking.component';
import { ListaComprasComponent } from './listacompras/listacompras.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    PerfilComponent,
    RankingComponent,
    ListaComprasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

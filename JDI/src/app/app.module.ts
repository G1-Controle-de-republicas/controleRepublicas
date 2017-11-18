import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
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
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContasComponent } from './contas/contas.component';
import { RepublicaComponent } from './republica/republica.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PainelComponent,
    PerfilComponent,
    RankingComponent,
    ListaComprasComponent,
    CadastroComponent,
    ContasComponent,
    RepublicaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TextMaskModule,
    HttpModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

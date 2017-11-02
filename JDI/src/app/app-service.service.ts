import { Injectable, Component, Output } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject } from "rxjs"
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Router } from "@angular/router";
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

declare var jQuery: any;

@Injectable()
export class AppService {
  user: any;
  logado: any;

  URL = "http://localhost:3000/";
  URL_ASSETS = "http://localhost:3000/assets/";

  User: any;
  clientes: any;

  constructor(private http: Http, private router: Router) {
    moment.locale('pt-BR');
  }

  private doRequest(method: string, url, data: any = null, redirectOnError = true, hideLoad = false): Observable<Response> {
    return new Observable(obs => {
      let headers = new Headers({ allowedHeaders: 'Content-Type,Authorization' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      if (!data)
        data = {};
      data["dt"] = new Date();
      var callback = res => {
        if (res.status === 444) {
          return;
        }

        if (res.status < 200 || res.status >= 300) {
          obs.error(res);
        }
        else {
          obs.next(res);
        }
        obs.complete();
      };

      if (method.toLowerCase() == "get" || method.toLowerCase() == "delete") {
        this.http[method](this.URL + url, options).subscribe(callback, callback);
      }
      else
        this.http[method](this.URL + url, data, options).subscribe(callback, callback);
    });
  }


}

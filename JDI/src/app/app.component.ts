import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "./app-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public service: AppService, public router: Router) {
  }

  ngOnInit() {
    this.service.getLogado().subscribe(res => {
      if (!res) this.router.navigate(['/login']);
    });
  }



}

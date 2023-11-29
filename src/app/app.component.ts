import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from './general/service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    console.log('AppComponent.constructor');
  }

  async ngOnInit() {
    console.log("AppComponent.ngOnInit");
    if (await this.auth.checkIfUserAuthenticated()) {
      this.router.navigate(['/manager']);
    } else {
      this.router.navigate(['/login']);
    }
    console.log("AppComponent.ngOnInit end");
  }


}

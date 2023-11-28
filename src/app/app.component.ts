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

  ngOnInit() {
    if (this.auth.userSignedIn) {
      this.router.navigate(['/manager']);
    } else {
      this.router.navigate(['/login']);
    }
  }


}

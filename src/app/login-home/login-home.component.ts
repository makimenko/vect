import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService, Profile} from '../general/service/auth.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent implements OnInit {

  @Output() authenticatedEvent!: EventEmitter<Profile>;

  constructor(
    protected authService: AuthService,
    private router: Router
  ) {
    this.userAuthenticated = this.userAuthenticated.bind(this);
    this.authenticatedEvent = this.authService.authenticatedEvent;
    this.authenticatedEvent.subscribe({
      next: (value: any) => this.userAuthenticated(value),
      error: (err: any) => console.error('Authentication error ' , err)
    });
  }

  userAuthenticated(profile: any) {
    console.log("LoginHomeComponent.userAuthenticated", profile);
    this.gotoDefault();
  }

  gotoDefault() {
    console.log("LoginHomeComponent.gotoDefault");
    this.router.navigate(["/manager"]);
  }

  async ngOnInit(): Promise<void> {
    console.log("LoginHomeComponent.ngOnInit")
    if (await this.authService.checkIfUserAuthenticated()) {
      this.gotoDefault();
    }
  }

  async handleAuthClick() {
    this.authService.handleAuthClick();
  }

}

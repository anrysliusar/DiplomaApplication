import {Component, OnInit} from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserLoginModel} from "../../model/user.model";
import {AuthStoreService} from "../../service/store/auth-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../security-shared.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  messages: Message[];

  constructor(private messageService: MessageService,
              private router: Router,
              private authService: AuthStoreService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup<any>({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.handleErrorMessage();
  }

  private handleErrorMessage() {
    this.authService.authError$.subscribe(value => {
      if (value) {
        this.messages = [{severity: 'error', summary: 'Error', detail: 'Invalid credentials'}];
      }
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      const user: UserLoginModel = this.loginForm.getRawValue();
      this.authService.login(user)
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']).then();
  }
}

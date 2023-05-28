import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserRegisterModel} from "../../model/user.model";
import {AuthStoreService} from "../../service/store/auth-store.service";
import {Message} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../security-shared.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  messages: Message[];

  constructor(private router: Router,
              private authService: AuthStoreService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup<any>({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
    this.handleErrorMessage();
  }

  register() {
    if (this.registerForm.valid) {
      const user: UserRegisterModel = this.registerForm.getRawValue();
      this.authService.register(user);
    }
  }

  private handleErrorMessage() {
    this.authService.authError$.subscribe(value => {
      if (value) {
        this.messages = [{severity: 'error', summary: 'Error', detail: 'Invalid credentials'}];
      }
    })
  }

  navigateToLogin() {
    this.router.navigate(['/login']).then();
  }
}

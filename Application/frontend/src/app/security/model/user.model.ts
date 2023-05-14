export class UserLoginModel {
  username: string;
  password: string;
}

export class UserRegisterModel extends UserLoginModel {
  email: string;
}

export class AuthResponse {
  token: string;
}

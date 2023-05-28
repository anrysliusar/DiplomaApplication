import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthApiService} from "../core/auth-api.service";
import {catchError, mergeMap, of, switchMap, tap} from "rxjs";
import * as AuthActions from './auth.actions';
import {Injectable} from "@angular/core";
import {AuthResponse} from "../../model/user.model";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthApiService,
              private router: Router) {
  }

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((value) =>
        this.authService.login(value.credentials).pipe(
          mergeMap((response: AuthResponse) => {
            return of(AuthActions.loginSuccess({ token: response.token }));
          }),
          tap(() => this.router.navigate(['/home'])),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((value) =>
        this.authService.register(value.userData).pipe(
          mergeMap((response: AuthResponse) => {
            return of(AuthActions.registerSuccess({ token: response.token }));
          }),
          tap(() => this.router.navigate(['/home'])),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/login'])),
    ), { dispatch: false }
  );

}

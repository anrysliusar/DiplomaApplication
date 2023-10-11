import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Settings} from "../components/settings.model";
import {Observable} from "rxjs";

@Injectable()
export class SettingsService {

  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>('settings/gesture-actions');
  }

  saveSettings(settings: Settings): Observable<Settings> {
    return this.http.post<Settings>('settings/gesture-actions', settings);
  }
}

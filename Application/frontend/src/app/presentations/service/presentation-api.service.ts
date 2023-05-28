import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Presentation} from "../component/presentation.model";

@Injectable()
export class PresentationApiService {

  constructor(private http: HttpClient) { }

  getPresentation(id: number): Observable<Presentation> {
    return this.http.get<Presentation>(`presentation/${id}`);
  }

  savePresentation(projectId : number,presentation: Presentation): Observable<Presentation> {
    const params = new HttpParams()
      .append('projectId', projectId.toString());
    return this.http.post<Presentation>('presentation', presentation, {params});
  }

  deletePresentation(id: number): Observable<Presentation> {
    return this.http.delete<Presentation>(`presentation/${id}`);
  }

  updatePresentation(id: number, presentation: Presentation): Observable<Presentation> {
    return this.http.put<Presentation>(`presentation/${id}`, presentation);
  }
}

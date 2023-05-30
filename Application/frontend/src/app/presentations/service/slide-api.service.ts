import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Slide} from "../component/presentation.model";
import {Observable} from "rxjs";

@Injectable()
export class SlideApiService {

  constructor(private http: HttpClient) { }

  public getSlide(id: number): Observable<Slide> {
    return this.http.get<Slide>(`slides/${id}`);
  }

  public getSlides(presentationId: number): Observable<Slide[]> {
    const params = new HttpParams()
      .append('presentationId', presentationId.toString());
    return this.http.get<Slide[]>(`slides`, {params: params});
  }

  public createSlide(slide: Slide, presentationId: number): Observable<Slide> {
    const params = new HttpParams()
      .append('presentationId', presentationId.toString());
    return this.http.post<Slide>(`slides`, slide, {params: params});
  }

  deleteSlide(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`slides/${id}`)
  }
}

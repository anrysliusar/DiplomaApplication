import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Slide} from "../component/presentation.model";

@Injectable()
export class SlideApiService {

  constructor(private http: HttpClient) { }

  public getSlide(id: number) {
    return this.http.get(`slides/${id}`);
  }

  public getSlides() {
    return this.http.get(`slides`);
  }

  public createSlide(slide: Slide, presentationId: number) {
    console.log(slide, presentationId)
    const params = new HttpParams()
      .append('presentationId', presentationId.toString());
    return this.http.post(`slides`, slide, {params: params});
  }
}

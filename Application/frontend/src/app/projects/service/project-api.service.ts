import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../component/project.model";
import {TreeNode} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http: HttpClient) {

  }

  getProjectsTree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>('project/tree');
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`project/${id}`);
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>('project', project);
  }

  deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`project/${id}`);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`project/${id}`, project);
  }


}

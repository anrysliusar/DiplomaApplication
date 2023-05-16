import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project, ProjectTreeNode} from "../component/project.model";
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
    return this.http.get<Project>('project/' + id);
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>('project', project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>('project/' + id);
  }

  updateProject(project: Project): Observable<void> {
    return this.http.put<void>('project', project);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = 'https://us-central1-prasaar-824d7.cloudfunctions.net/prasaarTasksWithMasters';
  private SECRET = 'EITOT';

  constructor(private http: HttpClient) {}

  // task related
  getTasks(): Observable<any> {
    return this.http.get(`${this.API_URL}?action=getTasks&secret=${this.SECRET}`);
  }

  getTaskStatus(userId:string):Observable<any>{
    return this.http.get(`${this.API_URL}?action=getTaskStatus&userId=${userId}&secret=${this.SECRET}`);
  }

  updateTask(taskId: string, updateData: any): Observable<any> {
    return this.http.post(`${this.API_URL}?taskId=${taskId}`, {
      action: 'updateTask',
      secret: this.SECRET,
      updateData
    });
  }
  createTask(task: any): Observable<any> {
    return this.http.post(this.API_URL, {
      action: 'createTask',
      secret: this.SECRET,
      ...task
    });
  }

  deleteTask(taskId:string):Observable<any>{
    return this.http.delete(`${this.API_URL}?action=deleteTask&secret=${this.SECRET}&taskId=${taskId}`);
  }

  //users related

  getUsers():Observable<any>{
    return this.http.get(`${this.API_URL}?action=getUsers&secret=${this.SECRET}`);
  }

}

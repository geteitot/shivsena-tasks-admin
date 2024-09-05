import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private secretKey = 'EITOTShivsena'
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

  getUsersData():Observable<any>{
    return this.http.get(`https://shivsena.prasaar.co:9090/accounts/userListAgainstMobileNumber/?org_code=ETIOT`);
  }


  //getsubmissions
  getTaskSubmissions(userId:string,taskId:string):Observable<any>{
    return this.http.get(`${this.API_URL}?action=getSubmissions&secret=${this.SECRET}&taskId=${taskId}&userId=${userId}`);
  }

  validateAuthToken(token: string): Observable<HttpResponse<any>> {
    
    const decreptedToken = this.decryptToken(token,this.secretKey);
    const headers = new HttpHeaders({
      'Authorization': `${decreptedToken}`
    });
    return this.http.get(`https://test.prasaar.co:9090/masters/profession/`, { headers, observe: 'response' });
  }

// import * as CryptoJS from 'crypto-js';
//   encryptToken(token: string, secretKey: string): string {
//     const encrypted = CryptoJS.AES.encrypt(token, secretKey).toString();
//     return encrypted;
//   }

  decryptToken(encryptedToken: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}

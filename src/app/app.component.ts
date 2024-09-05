import { Component,OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shivsena-tasks';
  showContent = false;
  constructor(private taskService:TaskService){};


  ngOnInit(): void {
    this.verification();
    // this.checkAuthToken();
  }

  // async verification() {

  //   const authToken = this.getCookie('auth-token');
  //   if(!authToken){
  //   }
  //   if(authToken){
  //     const isValidAuth = await this.verifyAuthToken(authToken);
  //     if (isValidAuth) {
  //       // Navigate to the main app content
  //       this.showContent = true;
  //     } else {
  //       // Redirect to another website if token is not valid
  //       window.location.href = 'https://shivsena.prasaar.co/prasaar/#/login';
  //     }
  //   }else{
  //     window.location.href = 'https://shivsena.prasaar.co/prasaar/#/login';
  //   }
  // }

  async verification() {
    const authToken = this.getCookie('auth-token');
    // If no auth token, redirect to another website
    if (!authToken) {
      window.location.href = 'https://shivsena.prasaar.co/prasaar/#/login';
      return; // Ensure no further code runs if no token is present
    }
    // If token exists, verify its validity
    try {
      const isValidAuth = await this.verifyAuthToken(authToken);
      if (isValidAuth) {
        // Navigate to the main app content if token is valid
        this.showContent = true;
      } else {
        // Redirect to another website if token is not valid
        window.location.href = 'https://shivsena.prasaar.co/prasaar/#/login';
      }
    } catch (error) {
      // Handle any unexpected errors during token verification
      console.error('Token verification failed:', error);
      window.location.href = 'https://shivsena.prasaar.co/prasaar/#/login';
    }
  }
  

  verifyAuthToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.taskService.validateAuthToken(token).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('verified');
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error: HttpErrorResponse) => {
          resolve(false);
        }
      );
    });
  }
  
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

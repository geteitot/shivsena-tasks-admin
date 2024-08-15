import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';  // Import these

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UpdateTaskDialogComponent } from './components/update-task-dialog/update-task-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterTasksPipe } from './tasks/filter-tasks.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-task', component: TaskFormComponent },
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    TaskFormComponent,
    TaskListComponent,
    UpdateTaskDialogComponent,
    FilterTasksPipe,
    LoginComponent,

    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)  ,// Add this,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

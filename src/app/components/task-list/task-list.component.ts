import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UpdateTaskDialogComponent } from '../update-task-dialog/update-task-dialog.component';
import { ConfirmatioonDialogComponent } from 'src/app/confirmatioon-dialog/confirmatioon-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  searchText: string = '';

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.viewTasks();
  }

  viewTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      let tasksData = [];
      for(const key in data){
        let task = data[key];
        task['taskId']=key;
        tasksData.push(task);
      }
      this.tasks = tasksData;
    });
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe(() => this.viewTasks());
      }
    });
  }

  openUpdateTaskDialog(task: any) {
    console.log(task);
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.taskService.updateTask(task.taskId, result).subscribe(() => this.viewTasks());
      }
    });
  }

  confirmDeleteDialog(taskId:string){
    console.log(taskId);
    const title = 'Delete Task?';
    const content = 'Are you sure to delete task?'
    var confirmDelete = this.dialog.open(ConfirmatioonDialogComponent,{
      data:{title,content}
    });

    confirmDelete.afterClosed().subscribe(status=>{
      if(status){
        this.taskService.deleteTask(taskId).subscribe((res)=>{
            alert(res['message']);
            this.viewTasks();
        });
      }

    });
   
  }
}

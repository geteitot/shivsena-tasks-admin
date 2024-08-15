import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UpdateTaskDialogComponent } from '../update-task-dialog/update-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
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
      console.log(data);
      this.tasks = Object.values(data);
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
    console.log('om');
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(task.id, result).subscribe(() => this.viewTasks());
      }
    });
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    dateValidity: ''
  };

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormComponent>
  ) {}

  createTask() {
    this.taskService.createTask(this.task).subscribe(() => {
      alert('Task Created');
      console.log(this.task);
      this.dialogRef.close(this.task); // Close the dialog and pass the created task back
    });
  }

  closeDialog() {
    this.dialogRef.close(); // Close the dialog without any data
  }
}

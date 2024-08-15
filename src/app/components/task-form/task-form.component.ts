import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  task = {
    title: '',
    subtitle: '',
    description: '',
    dateValidity: ''
  };

  constructor(private taskService: TaskService) {}

  createTask() {
    this.taskService.createTask(this.task).subscribe(() => {
      alert('Task Created');
    });
  }
}

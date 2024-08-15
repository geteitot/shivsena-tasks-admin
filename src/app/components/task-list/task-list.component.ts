import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  searchText: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.viewTasks();
  }

  viewTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      console.log(data);
      this.tasks = Object.values(data);
    });
  }

  openDialog(task: any) {
    // Logic to open dialog and pass task data
  }
}

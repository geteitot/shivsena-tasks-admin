import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  tasks: any[] = [];
  completedTasks: any[] = [];
  pendingTasks: any[] = [];
  
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.viewUsers();
  }

  viewUsers() {
    this.taskService.getUsers().subscribe((data: any) => {
      this.users = Object.values(data['users']);
    });
  }

  async selectUser(user: any) {
    this.selectedUser = user;
    await this.loadTasksForUser(user.id);
  }

  async getTasksStatus() {
    return await this.taskService.getTaskStatus(this.selectedUser).toPromise();
  }

  async getAllFalseTasks() {
    const tasksData = await this.taskService.getTasks().toPromise();
    for (const key in tasksData) {
      tasksData[key]['taskId'] = key;
      tasksData[key]['isCompleted'] = false;
    }
    return tasksData;
  }

  async loadTasksForUser(userId: string) {
    const tasksData = await this.getAllFalseTasks();
    const statusData = await this.getTasksStatus();

    for (let key in statusData) {
      tasksData[key]['isCompleted'] = statusData[key];
    }

    this.tasks = Object.values(tasksData);
    this.completedTasks = this.tasks.filter(task => task.isCompleted);
    this.pendingTasks = this.tasks.filter(task => !task.isCompleted);
  }
}

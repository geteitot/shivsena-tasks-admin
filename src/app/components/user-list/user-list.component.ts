import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  selectedTask: any = null;
  selectedUserName:string ='';
  tasks: any[] = [];
  submissions:any[]=[];
  documents:any[]=[];
  completedTasks: any[] = [];
  pendingTasks: any[] = [];
  expandedIndex: number | null = null;
  
  
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.viewUsers();
  }

  async viewUsers() {
    this.getUsersDataa().subscribe(formattedData => {
      this.users = formattedData;
    });
  }
  
  
  getUsersDataa() {
    return this.taskService.getUsersData().pipe(
      map((data: any[]) => {
        return data.map(item => {
          const key = Object.keys(item)[0]; 
          return {
            first_name: item[key].first_name,
            last_name: item[key].last_name,
            mobile_no: item[key].mobile_no
          };
        });
      })
    );
  }
  


  toggleExpand(index: number) {
    this.documents=this.submissions[index].documents;
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  async selectUser(user: any) {
    this.selectedUser = user;
    this.clearCacheUserTask();
    await this.loadTasksForUser(user.mobile_no);
  }

  async selectTask(task: any) {
    this.selectedTask = task;
    this.submissions= await this.getSubmissions(this.selectedUser.mobile_no,this.selectedTask.taskId);
  }


  clearCacheUserTask(){
    this.selectedTask=null;
    this.submissions=[];
    this.expandedIndex=null;
    this.documents=[];
  }

  async getTasksStatus() {
    return await this.taskService.getTaskStatus(this.selectedUser.mobile_no).toPromise();
  }

  async getSubmissions(userId:string,taskId:string){
    return await this.taskService.getTaskSubmissions(userId,taskId).toPromise();
  }

  async getAllFalseTasks() {
    const tasksData = await this.taskService.getTasks().toPromise();
    for (const key in tasksData) {
      tasksData[key]['taskId'] = key;
      tasksData[key].isCompleted = false;
    }
    return tasksData;
  }

  async loadTasksForUser(userId: string) {
    const tasksData = await this.getAllFalseTasks();
    try{
      const statusData = await this.getTasksStatus();

    if(statusData){
      for (const key in statusData) {
        if(tasksData[key]){
            tasksData[key].isCompleted = statusData[key];
        }
      } 
    }

    }catch(e){
      console.log(e);
    }
    
    
    this.tasks = Object.values(tasksData);
    console.log(tasksData)
    this.completedTasks = this.tasks.filter(task => task.isCompleted);
    this.pendingTasks = this.tasks.filter(task => !task.isCompleted);
    this.tasks=[...this.completedTasks,...this.pendingTasks];
  }

  getFileIcon(fileType: string): string {
    if (fileType === '.pdf') {
      return 'fas fa-file-pdf';
    } else if (fileType === '.jpg' || fileType === '.jpeg' || fileType === '.png') {
      return 'fas fa-file-image';
    } else if (fileType === '.mp4' || fileType === '.avi' || fileType === '.mov') {
      return 'fas fa-file-video';
    } else {
      return 'fas fa-file-alt'; // Default icon for other file types
    }
  }

  closeUserTasks(){
    this.selectedUser=null;
  }

  closeSubmissions(){
    this.selectedTask=null;
    this.submissions=[];
    this.documents=[];
  }
}

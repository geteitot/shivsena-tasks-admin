// import { Component, Input } from '@angular/core';
// import { TaskService } from '../../services/task.service';

// @Component({
//   selector: 'app-update-task-dialog',
//   templateUrl: './update-task-dialog.component.html'
// })
// export class UpdateTaskDialogComponent {
//   @Input() task: any;
//   isDialogOpen = false;

//   constructor(private taskService: TaskService) {}

//   openDialog(task: any) {
//     this.task = task;
//     this.isDialogOpen = true;
//   }

//   closeDialog() {
//     this.isDialogOpen = false;
//   }

//   updateTask() {
//     this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
//       alert('Task Updated');
//       this.closeDialog();
//     });
//   }
// }

import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.css']
})
export class UpdateTaskDialogComponent {
  @Input() task: any = {};


  constructor(private taskService: TaskService) {}

  openDialog(task: any) {
    this.task = task;
  }

  closeDialog() {
  }

  updateTask() {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      alert('Task Updated');
      this.closeDialog();
    });
  }
}


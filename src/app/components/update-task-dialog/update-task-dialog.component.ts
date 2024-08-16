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
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrls: ['./update-task-dialog.component.css']
})
export class UpdateTaskDialogComponent {
  task: any = {};

  constructor(private taskService: TaskService,
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = { ...data.task }; // Clone the task data to avoid direct mutation
  }

  closeDialog() {
    this.dialogRef.close(); // Close the dialog without passing any data
  }

  updateTask() {
    
    this.dialogRef.close(this.task); // Pass the updated task data back to the calling component
  }
}

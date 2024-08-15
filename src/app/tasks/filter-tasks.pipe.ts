import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: any[], searchText: string): any[] {
    if (!tasks || !searchText) {
      return tasks;
    }
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase()));
  }
}

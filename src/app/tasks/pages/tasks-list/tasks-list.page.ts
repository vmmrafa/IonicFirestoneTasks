import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { OverlayService } from '../../../core/services/overlay.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {

  tasks$: Observable<Task[]>;

  constructor(private navCtrl: NavController, private overlayService: OverlayService, private tasksService: TasksService) { }

  async ionViewDidEnter() {
    const loading = await this.overlayService.loading();
    this.tasks$ = this.tasksService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  onUpdate(task: Task) {
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`);
  }

  onDelete(task: Task) {
    this.overlayService.alert({
      message: `do you really to delete the task "${task.title}" ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksService.delete(task.id);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            });
          }
        },
        'No'
      ]
    });
  }

  onDone(task: Task) {
    task.done = !task.done;
    this.tasksService.update(task);
    this.overlayService.toast({
      message: `Task "${task.title}" ${task.done ? 'completed' : 'updated'}!`
    });
  }
}

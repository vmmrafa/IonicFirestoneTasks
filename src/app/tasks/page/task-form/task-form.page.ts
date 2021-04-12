import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { OverlayService } from '../../../core/services/overlay.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {

  taskForm: FormGroup;
  pageTitle = 'Create Task';
  taskId;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  private init() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.pageTitle = 'Edit Task';
      this.taskId = taskId;
      this.tasksService
            .getById(this.taskId)
            .pipe(take(1))
            .subscribe(
              task => {
                this.taskForm.get('title').setValue(task.title);
                this.taskForm.get('done').setValue(task.done);
              }
            );
    }
  }

  private createForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit() {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });

    try {
      (!this.taskId)
        ? await this.tasksService.create(this.taskForm.value)
        : await this.tasksService.update({
          id: this.taskId,
          ... this.taskForm.value
        });
      this.navCtrl.navigateBack('/tasks');
    } catch (error) {
     console.log('Error saving Task: ', error);
     await this.overlayService.toast({
       message: error.message
     });
    } finally {
      loading.dismiss();
    }
  }
}

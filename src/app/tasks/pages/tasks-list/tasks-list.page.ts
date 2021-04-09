import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  tasks$: Observable<Task[]>;

  constructor() { }

  ngOnInit() {
    this.tasks$ =   of([
      { id: 'dsa456dsa', title: 'Aprender Ionic', done: 'false' },
      { id: 'ewq456dsa', title: 'Aprender Firestore', done: 'false' },
      { id: 'cxz456dsa', title: 'Aprender', done: 'false' }
    ]);
  }

}

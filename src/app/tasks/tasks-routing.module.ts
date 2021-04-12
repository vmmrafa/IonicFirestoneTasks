import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: () => import('./page/task-form/task-form.module').then( m => m.TaskFormPageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./page/task-form/task-form.module').then( m => m.TaskFormPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/tasks-list/tasks-list.module').then(t => t.TasksListPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

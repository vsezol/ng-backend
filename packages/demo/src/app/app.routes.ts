import { Route } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';

export const appRoutes: Route[] = [
  {
    path: 'todos',
    component: TodosComponent,
  },
];

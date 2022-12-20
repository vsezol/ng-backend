import { Component } from '@angular/core';
import { TodosController } from './controllers/todos.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    console.log(new TodosController());
  }
}

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, Observable, startWith, switchMap } from 'rxjs';
import { Todo } from '../../declarations/interfaces/todo.interface';

import { TodosRequestsService } from '../../services/todos-requests.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule, ReactiveFormsModule, NgIf],
})
export class TodosComponent {
  public readonly todos$: Observable<Todo[]> =
    this.todosRequestsService.getTodos();

  public readonly todoIdControl: FormControl<number | null> = new FormControl<
    number | null
  >(null);

  public readonly todo$: Observable<Todo> =
    this.todoIdControl.valueChanges.pipe(
      startWith(this.todoIdControl.value),
      filter(Boolean),
      switchMap((id: number) => this.todosRequestsService.getTodoById(id))
    );

  constructor(private readonly todosRequestsService: TodosRequestsService) {}
}

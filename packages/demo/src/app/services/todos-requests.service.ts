import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from '../declarations/interfaces/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodosRequestsService {
  private readonly requestBaseUrl: string = `${environment.apiUrl}/todos`;

  constructor(private readonly httpClient: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.requestBaseUrl);
  }

  public getTodoById(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.requestBaseUrl}/${id}`);
  }
}

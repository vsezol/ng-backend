import { HttpRequest } from '@angular/common/http';
import {
  AutoResponse,
  Controller,
  Disabled,
  Get,
  Header,
  MethodHandlerResult,
} from 'ng-backend';

@Controller('todos')
export class TodosController {
  @Get._int_()
  @AutoResponse.body({
    userId: 777777,
    id: 777777,
    title: 'Я ИЗ JOOOOPA',
    completed: true,
  })
  public getById(): void {
    // return new HttpResponse<Todo>({
    //   body: {
    //     userId: 777777,
    //     id: 777777,
    //     title: request.url,
    //     completed: true,
    //   },
    // });
  }

  @Get()
  @Header('get1', 'get1')
  @Header('get2', 'get2')
  @Header('get3', 'get3')
  @Header('get4', 'get4')
  public get1(): void {}

  @Get()
  @AutoResponse.body([
    {
      userId: 777,
      id: 777,
      title: 'Я ИЗ @Response.Body',
      completed: true,
    },
  ])
  @Disabled.handler
  public get2(): void {}

  @Get()
  @Disabled.handler
  @AutoResponse({
    body: [
      {
        userId: 777,
        id: 777,
        title: 'Я ИЗ @Response',
        completed: true,
      },
    ],
  })
  public get3(): void {}

  @Get()
  @Disabled.handler
  public get(request: HttpRequest<unknown>): MethodHandlerResult {
    console.log('GET 4 RESPONSE', request);

    return [
      {
        userId: 777,
        id: 777,
        title: 'Я ПЕРЕХВАТЧИК',
        completed: true,
      },
      {
        userId: 888,
        id: 888,
        title: 'Всем привет',
        completed: true,
      },
    ];
  }
}

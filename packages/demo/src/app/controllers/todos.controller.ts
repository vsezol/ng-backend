import {
  Controller,
  Disabled,
  Get,
  MethodHandlerInput,
  MethodHandlerResult,
} from 'ng-backend';

@Controller('todos')
export class TodosController {
  // @Get.id('int')()
  // @Header('11111', '222222')
  // public getById({ request, dynamicParams }: MethodHandlerInput): void {
  //   console.log(request, dynamicParams.get('id'));
  // }

  // @Get.id('int')()
  // @Header('get1', 'get1')
  // @Header('get2', 'get2')
  // @Header('get3', 'get3')
  // @Header('get4', 'get4')
  // @AutoResponse.body({
  //   userId: 777777,
  //   id: 777777,
  //   title: 'Я ИЗ JOOOOPA',
  //   completed: true,
  // })
  // public getById1(): void {}

  // @Get()
  // @AutoResponse.body([
  //   {
  //     userId: 777,
  //     id: 777,
  //     title: 'Я ИЗ @Response.Body',
  //     completed: true,
  //   },
  // ])
  // public get3(): void {}

  @Get()
  @Disabled.handler
  public get(input: MethodHandlerInput): MethodHandlerResult {
    console.log('GET 4 RESPONSE', input);

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

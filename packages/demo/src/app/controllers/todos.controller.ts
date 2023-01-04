import {
  AutoResponse,
  Controller,
  Get,
  Header,
  MethodHandlerInput,
} from 'ng-backend';

@Controller('todos')
export class TodosController {
  @Get()
  @AutoResponse.body([
    {
      userId: 777,
      id: 777,
      title: 'I am from @AutoResponse.Body',
      completed: true,
    },
  ])
  public get(): void {}

  @Get.id('int')()
  @Header('author-name', 'Vsevolod Zolotov')
  @Header('author-age', '20')
  @Header('programming-language', 'TypeScript')
  public getById({ dynamicParamsMap }: MethodHandlerInput): void {
    console.log(dynamicParamsMap.get('id'));
  }
}

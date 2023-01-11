# NgBackend

**NgBackend** is a library that helps to write beautiful [Angular http interceptors](https://angular.io/api/common/http/HttpInterceptor) with decorators like controllers on backend.

- Speeds up writing http interceptors
- Adds sugar to the use of http interceptors
- Allows you to write request mocks as if it were a real backend
- Preserves the logic of the http interceptors

## Installation

NgBackend is available as a package for use with an [Angular](https://angular.io/) application.

```bash
# npm
npm install ng-backend
```

```bash
# yarn
yarn add ng-backend
```

TypeScript type definitions are included in the library and do not need to be installed additionally.

## Documentation

You can find the NgBackend documentation on the [website](https://vsezol.github.io/ng-backend/).

## Examples

### Get input request

```typescript
@Controller('todos')
class TodosController {
  @Get()
  public getById({ request }: MethodHandlerInput): void {
    return request.clone({
      withCredentials: true,
    });
  }
}
```

### Set headers for input request

```typescript
@Controller('todos')
class TodosController {
  @Get()
  @Header('author-name', 'Vsevolod Zolotov')
  @Header('author-age', '20')
  @Header('programming-language', 'TypeScript')
  public get(): void {}
}
```

### Intercept a request with dynamic params

```typescript
@Controller('todos')
class TodosController {
  // will filter request with todos/:id url
  @Get.id('int')()
  public getById({ dynamicParamsMap }: MethodHandlerInput): void {
    console.log(dynamicParamsMap.get('id'));
  }
}
```

### Redirect to another url

```typescript
@Controller('todos')
class TodosController {
  @Get()
  @Redirect('<your url>')
  public get(): void {}

  @Get()
  @Redirect((url) => `${url}/your/path`)
  public get(): void {}
}
```

### Return http response by AutoResponse decorator

```typescript
@Controller('todos')
class TodosController {
  @Post()
  // configure full Response
  @AutoResponse({
    body: {
      name: 'Vsevolod',
      age: 20,
    },
    status: 200,
  })
  public post(): void {}

  @Get()
  // configure only Response body
  @AutoResponse.body([
    {
      name: 'Vsevolod',
      age: 20,
    },
  ])
  public get(): void {}
}
```

### Return dynamic HttpResponse or HttpEvent

```typescript
@Controller('todos')
@Disabled.controller
class TodosController {
  @Get()
  public get(): MethodHandlerResult {
    return new HttpResponse({
      body: {
        name: 'Vsevolod',
        age: 20,
      },
    });
  }

  @Post()
  public post(): MethodHandlerResult {
    // if you return not HttpEvent it will be wrapped into HttpResponse
    return {
      name: 'Vsevolod',
      age: 20,
    };
  }
}
```

### Disable logic

```typescript
@Controller('todos')
@Disabled.controller
class TodosController {
  @Get()
  @Disabled.handler
  public get(): void {}
}
```

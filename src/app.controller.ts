import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

//this controller is for the main route www.domain.com/
//if controller("hello") and get("von") /hello/von to enable get method
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('content-type', 'text/html')
  getHello(): string {
    return this.appService.getHello();
  }
}

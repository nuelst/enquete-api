import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private pisma: PrismaService) { }

  @Get()
  async getHello() {
    return this.pisma.user.findMany()
    //  return this.appService.getHello();
  }
}

import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  constructor() {
    super({ log: ['error', 'warn'] })
  }

  // if happen any thing with the module that implements itself
  onModuleDestroy() {
    return this.$disconnect
  }
  onModuleInit() {
    return this.$connect
  }
}
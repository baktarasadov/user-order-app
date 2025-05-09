import './core/configs/env.config';
import { Module } from '@nestjs/common';
import { OrderModule, DatabaseModule } from './modules';

const imports = [
  DatabaseModule,
  OrderModule
]
@Module({
  imports,
})
export class AppModule { }
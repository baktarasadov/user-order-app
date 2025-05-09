import './core/configs/env.config';
import { Module } from '@nestjs/common';
import { AuthModule, DatabaseModule } from './modules';

const imports = [
  DatabaseModule,
  AuthModule
]

@Module({
  imports,
})
export class AppModule { }
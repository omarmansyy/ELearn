import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import {  ModuleSchema } from './modules.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Module.name, schema: ModuleSchema }])
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}

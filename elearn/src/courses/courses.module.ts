import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './courses.schema';
import { ModulesModule } from './modules/modules.module';
import { DynamicModule } from '@nestjs/common';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    ModulesModule,  
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

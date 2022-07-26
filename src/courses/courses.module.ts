import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CoursesController } from './courses.controller';
import { courseProviders } from './courses.provider';
import { CoursesService } from './courses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [...courseProviders, CoursesService],
})
export class CoursesModule {}

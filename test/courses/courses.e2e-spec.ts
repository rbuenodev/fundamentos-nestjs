import { Test, TestingModule } from '@nestjs/testing';
import {
  Body,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';
import { DatabaseModule } from '../../src/database/database.module';
import exp from 'constants';

describe('Courses: /courses (e2e)', () => {
  let app: INestApplication;
  const course: CreateCourseDto = {
    name: 'NestJS resiful api',
    description: 'NestJS with TypeORM',
    tags: ['nestjs', 'typeorm', 'typescript'],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'dbtest',
          port: 5433,
          username: 'postgres',
          password: 'docker',
          database: 'dbtest',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create POST / courses', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCourse = jasmine.objectContaining({
          ...course,
          tags: jasmine.arrayContaining(
            course.tags.map((name) => jasmine.objectContaining({ name })),
          ),
        });
        expect(body).toEqual(expectedCourse);
      });
  });
});

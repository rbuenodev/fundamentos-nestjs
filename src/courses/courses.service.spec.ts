import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createConnection } from 'net';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('find course by Id', () => {
      it('should return a course object', async () => {
        const courseId = '1';
        const expectCourse = {};
        courseRepository.findOne.mockReturnValue(expectCourse);
        const course = await service.findOne(courseId);
        expect(course).toEqual(expectCourse);
      });

      it('should return NotFoundException', async () => {
        const courseId = '1';
        courseRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(courseId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe(`Course id ${courseId} not found`);
        }
      });
    });
  });
});

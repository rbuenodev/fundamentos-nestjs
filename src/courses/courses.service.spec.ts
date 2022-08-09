import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createConnection } from 'net';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let id;
  let date;

  beforeEach(async () => {
    service = new CoursesService();
    id = '6be31b32-8315-4dee-8c73-02faa61acdfa';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should creates a course', async () => {
    const expectOutputTags = [{ id, name: 'nesjts', createdAt: date }];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      createdAt: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'Test descritpion',
      tags: ['nestjs'],
    };

    const newCourse = await service.create(createCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toEqual(newCourse);
  });

  it('should list courses', async () => {
    const expectOutputTags = [{ id, name: 'nesjts', createdAt: date }];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        createdAt: date,
        tags: expectOutputTags,
      },
    ];

    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourse).toEqual(courses);
  });

  it('should find a course', async () => {
    const expectOutputTags = [{ id, name: 'nesjts', createdAt: date }];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      createdAt: date,
      tags: expectOutputTags,
    };
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourse).toEqual(course);
  });

  it('should updates a course', async () => {
    const expectOutputTags = [{ id, name: 'nesjts', createdAt: date }];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      createdAt: date,
      tags: expectOutputTags,
    };

    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDto: UpdateCourseDto = {
      name: 'Test',
      description: 'Test descritpion',
      tags: ['nestjs'],
    };

    const course = await service.update(id, updateCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toEqual(course);
  });

  it('should deletes a course', async () => {
    const expectOutputTags = [{ id, name: 'nesjts', createdAt: date }];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      createdAt: date,
      tags: expectOutputTags,
    };
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.remove(id);
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourse).toEqual(course);
  });
});

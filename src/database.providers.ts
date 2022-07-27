/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { CreateTagsTable1658801942948 } from './migrations/1658801942948-CreateTagsTable.ts';
import { CreateCourseTable1658801962610 } from './migrations/1658801962610-CreateCourseTable';
import { CreateCoursesTagsTablets1658875924744 } from './migrations/1658875924744-CreateCoursesTagsTable';
import { AddCrousesIdToCoursesTagsTablets1658883893838 } from './migrations/1658883893838-AddCrousesIdToCoursesTagsTable';
import { AddTagsIdsToCoursesTagsTable1658884718998 } from './migrations/1658884718998-AddTagsIdsToCoursesTagsTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'cursonestjs',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [
    CreateCourseTable1658801962610,
    CreateTagsTable1658801942948,
    CreateCoursesTagsTablets1658875924744,
    AddCrousesIdToCoursesTagsTablets1658883893838,
    AddTagsIdsToCoursesTagsTable1658884718998,
  ],
});

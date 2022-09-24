import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import DatabaseLogger from './common/loggers/typeorm.logger';
import { MyValidationPipe } from './common/pipes/validation.pipe';
import { BooksController } from './controllers/books.controller';
import { UsersController } from './controllers/users.controller';
import { Book } from './entities/book.entity';
import { User } from './entities/user.entity';
import { UserBookHistory } from './entities/userbookhistory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          synchronize: true,
          logger: new DatabaseLogger(),
          entities: [User, Book, UserBookHistory],
        };
      },
    }),
    TypeOrmModule.forFeature([User, Book, UserBookHistory]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: MyValidationPipe,
    },
  ],
  controllers: [UsersController, BooksController],
})
export class AppModule {}

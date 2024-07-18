import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './application/todo.service';
import { TodoController } from './presentation/todo.controller';
import {
  TodoOrmEntity,
  TodoOrmEntitySchema,
} from './infraestructure/orm/todo.orm-entity';
import { TodoMongoRepository } from './infraestructure/repositories/todo.mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoOrmEntity.name, schema: TodoOrmEntitySchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    { provide: 'TodoRepository', useClass: TodoMongoRepository },
  ],
})
export class TodoModule {}

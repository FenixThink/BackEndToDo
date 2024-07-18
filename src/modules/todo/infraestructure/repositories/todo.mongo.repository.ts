import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDoRepository } from '../../domain/repositories/todo.repository.interface';
import { toDo } from '../../domain/entities/todo.entity';
import { TodoOrmEntity } from '../orm/todo.orm-entity';

@Injectable()
export class TodoMongoRepository implements ToDoRepository {
  constructor(
    @InjectModel(TodoOrmEntity.name)
    private readonly todoModel: Model<TodoOrmEntity>,
  ) {}

  async findById(id: string): Promise<toDo> {
    const todoDocument = await this.todoModel.findById(id).exec();
    return new toDo(
      todoDocument.id,
      todoDocument.title,
      todoDocument.description,
      todoDocument.status,
    );
  }

  async save(todo: toDo): Promise<void> {
    const todoDocument = new this.todoModel(todo);
    await todoDocument.save();
  }

  async findAll(): Promise<toDo[]> {
    const todoDocuments = await this.todoModel.find().exec();
    return todoDocuments.map(
      (todoDocument) =>
        new toDo(
          todoDocument.id,
          todoDocument.title,
          todoDocument.description,
          todoDocument.status,
        ),
    );
  }

  async updateById(id: string, todo: toDo): Promise<void> {
    await this.todoModel.findByIdAndUpdate(id, todo).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}

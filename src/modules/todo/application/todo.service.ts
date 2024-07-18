import { Inject, Injectable } from '@nestjs/common';
import { ToDoRepository } from '../domain/repositories/todo.repository.interface';
import { toDo } from '../domain/entities/todo.entity';
import { CreateTodoDto } from '../presentation/dto/create-todo.dto';

@Injectable()
export class TodoService {
  // constructor(private readonly todoRepository: ToDoRepository) {}
  constructor(
    @Inject('TodoRepository') private todoRepository: ToDoRepository,
  ) {}
  
  async create(createTodoDto: CreateTodoDto): Promise<void> {
    const todo = new toDo(
      null,
      createTodoDto.title,
      createTodoDto.description,
      createTodoDto.status,
    );
    await this.todoRepository.save(todo);
  }

  async findOne(id: string): Promise<toDo> {
    return this.todoRepository.findById(id);
  }

  async findAll(): Promise<toDo[]> {
    return this.todoRepository.findAll();
  }

  async update(id: string, createTodoDto: CreateTodoDto): Promise<void> {
    const todo = new toDo(
      id,
      createTodoDto.title,
      createTodoDto.description,
      createTodoDto.status,
    );
    await this.todoRepository.updateById(id, todo);
  }

  async delete(id: string): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}

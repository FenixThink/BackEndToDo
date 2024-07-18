import { toDo } from '../entities/todo.entity';

export interface ToDoRepository {
  save(todo: toDo): Promise<void>;
  findAll(): Promise<toDo[]>;
  findById(id: string): Promise<toDo | null>;
  updateById(id: string, todo: toDo): Promise<void>;
  deleteById(id: string): Promise<void>;
}
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { TodoService } from '../application/todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { toDo } from '../domain/entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<void> {
    await this.todoService.create(createTodoDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<toDo> {
    return this.todoService.findOne(id);
  }

  @Get()
  async findAll(): Promise<toDo[]> {
    return this.todoService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<void> {
    await this.todoService.update(id, createTodoDto);
  }
}

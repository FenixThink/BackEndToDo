import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoOrmEntity extends Document{
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true } )
  status: number;
}

export const TodoOrmEntitySchema = SchemaFactory.createForClass(TodoOrmEntity);
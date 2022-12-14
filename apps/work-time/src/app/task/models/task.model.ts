import { Document } from 'mongoose';
import { ITask } from '@finlab/interfaces';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Task extends Document implements ITask {
  @Prop({ required: true })
    userId: string;

  @Prop({ required: true })
    date: Date;

  @Prop({ required: true })
    text: string;

  @Prop()
    completeness: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

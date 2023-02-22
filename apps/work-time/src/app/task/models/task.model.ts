import { Document } from 'mongoose';
import { type ITask } from '@finlab/interfaces/work-time';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Task extends Document implements ITask {
  @Prop({ required: true })
    userId: string;

  @Prop({ required: true })
    date: Date;

  @Prop({ required: true })
    taskId: string;

  @Prop({ required: true })
    name: string;

  @Prop()
    comment: string;

  @Prop()
    completeness: number;

  @Prop()
    excludedFromSearch: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

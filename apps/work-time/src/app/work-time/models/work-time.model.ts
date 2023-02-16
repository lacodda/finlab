import { Document } from 'mongoose';
import { type IWorkTime } from '@finlab/interfaces';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class WorkTime extends Document implements IWorkTime {
  @Prop({ required: true })
    userId: string;

  @Prop({ required: true })
    date: Date;

  @Prop({ required: true })
    time: number;
}

export const WorkTimeSchema = SchemaFactory.createForClass(WorkTime);

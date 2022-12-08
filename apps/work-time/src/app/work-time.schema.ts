import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WorkTime extends Document {
  @Prop({ unique: true })
    date: Date;

  @Prop({ required: true })
    time: number;
}

export const WorkTimeSchema = SchemaFactory.createForClass(WorkTime);

import { Document } from 'mongoose';
import { type ISummary } from '@finlab/interfaces/work-time';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Summary extends Document implements ISummary {
  @Prop({ required: true })
    userId: string;

  @Prop({ required: true })
    date: Date;

  @Prop({ required: true })
    time: number;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);

import { Document } from 'mongoose';
import { type ICalendarDay, CalendarType } from '@finlab/interfaces/work-time';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'calendar', timestamps: true })
export class CalendarDay extends Document implements ICalendarDay {
  @Prop({ required: true })
    userId: string;

  @Prop({ required: true })
    date: Date;

  @Prop({ required: true, enum: CalendarType, type: String, default: 0 })
    type: CalendarType;

  @Prop({ default: 0 })
    time: number;
}

export const CalendarSchema = SchemaFactory.createForClass(CalendarDay);

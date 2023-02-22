import { Document } from 'mongoose';
import { type ITimestamp, TimestampType } from '@finlab/interfaces/work-time';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Timestamp extends Document implements ITimestamp {
  @Prop({ required: true })
    userId: string;

  @Prop({ required: true })
    timestamp: Date;

  @Prop({ required: true, enum: TimestampType, type: String })
    type: TimestampType;
}

export const TimestampSchema = SchemaFactory.createForClass(Timestamp);

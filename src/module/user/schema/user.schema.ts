import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  avatar: string;

  @Prop()
  refreshToken: string;

  _id: string;
}

export const userSchema = SchemaFactory.createForClass(User);

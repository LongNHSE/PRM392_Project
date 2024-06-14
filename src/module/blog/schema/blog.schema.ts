import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop()
  name: string;

  @Prop()
  subtitle: string;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: 0 })
  numRating: number;

  @Prop({ type: [String] })
  ingredient: string[];

  @Prop({ type: [String] })
  direction: string[];

  @Prop({ type: [String] })
  imageList: string[];

  @Prop({ default: Date.now })
  createdDate: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

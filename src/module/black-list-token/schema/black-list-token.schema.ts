import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlackListTokenDocument = BlackListToken & Document;

@Schema({
  timestamps: true,
})
export class BlackListToken {
  @Prop({ unique: true })
  token: string;
}

export const blackListTokenSchema =
  SchemaFactory.createForClass(BlackListToken);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/module/user/schema/user.schema';
@Schema({
  timestamps: true,
})
export class Bmi {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: string | User;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  height: number;

  @Prop()
  bmi: number;
}

const BmiSchema = SchemaFactory.createForClass(Bmi);
//Calculate BMI before saving only work with save method
BmiSchema.pre('save', function (next) {
  this.bmi = parseFloat(
    (this.weight / ((this.height / 100) * (this.height / 100))).toFixed(2),
  );
  next();
});

BmiSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Bmi;

  //To handle the case when only weight or height is updated
  const existingDocument = await this.model.findOne(this.getQuery());
  const weight = update.weight || existingDocument.weight;
  const height = update.height || existingDocument.height;
  //

  if (weight && height) {
    update.bmi = parseFloat(
      (weight / ((height / 100) * (height / 100))).toFixed(2),
    );
  }
  next();
});

export { BmiSchema };

import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Preference, PreferenceSchema } from './schema/preference.schema';
import { IsPreferenceExistsConstraint } from './decorator/is-preference-existed';

@Module({
  controllers: [PreferenceController],
  imports: [
    MongooseModule.forFeature([
      { name: Preference.name, schema: PreferenceSchema },
    ]),
  ],
  providers: [PreferenceService, IsPreferenceExistsConstraint],
})
export class PreferenceModule {}

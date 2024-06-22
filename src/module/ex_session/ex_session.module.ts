import { Module } from '@nestjs/common';
import { ExSessionService } from './ex_session.service';
import { ExSessionController } from './ex_session.controller';
import { ExSession, ExSessionSchema } from './schema/ex_session.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ExSessionController],
  imports: [
    MongooseModule.forFeature([
      {
        name: ExSession.name,
        schema: ExSessionSchema,
      },
    ]),
  ],
  providers: [ExSessionService],
})
export class ExSessionModule {}

import { Module } from '@nestjs/common';
import { MacroGroupService } from './macro_group.service';
import { MacroGroupController } from './macro_group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MacroGroup, MacroGroupSchema } from './schema/macro_group.schema';
import { IsMacroGroupExistedConstraint } from './decorator/is-macro-group-existed';

@Module({
  controllers: [MacroGroupController],
  imports: [
    MongooseModule.forFeature([
      { name: MacroGroup.name, schema: MacroGroupSchema },
    ]),
  ],
  providers: [MacroGroupService, IsMacroGroupExistedConstraint],
})
export class MacroGroupModule {}

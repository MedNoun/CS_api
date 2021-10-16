import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from './application.model';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PersonService } from 'src/person/person.service';
import { EventService } from 'src/event/event.service';
import { personModule } from 'src/person/person.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Application', schema: ApplicationSchema },
    ]),
    EventModule,
    personModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}

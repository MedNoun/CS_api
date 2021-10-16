import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { EventModule } from './event/event.module';
import { personModule } from './person/person.module';

@Module({
  imports: [
    personModule,
    EventModule,
    ApplicationModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://' +
        process.env.DATABASE_USER +
        ':' +
        process.env.DATABASE_PASSWORD +
        '@students.ole6z.mongodb.net/Nest_js_API?retryWrites=true&w=majority',
    ),
  ], //import modules
  controllers: [AppController], //handle requests
  providers: [AppService], //Service : for example access data in the db
})
export class AppModule {}

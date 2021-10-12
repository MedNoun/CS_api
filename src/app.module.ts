import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { personModule } from './person/person.module';

@Module({
  imports: [
    personModule,
    MongooseModule.forRoot(
      'mongodb+srv://mednoun:55162859$MoNgOdBaCcEsS@students.ole6z.mongodb.net/Nest_js_API?retryWrites=true&w=majority',
    ),
  ], //import modules
  controllers: [AppController], //handle requests
  providers: [AppService], //Service : for example access data in the db
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Post('add')
  async addEvent(
    @Body('name') name: string,
    @Body('deadLine') deadLine: string,
    @Body('date') date: string,
  ) {
    const id = await this.eventService.insertEvent(
      name,
      new Date(deadLine),
      new Date(date),
    );
    return { event_added: id };
  }
  @Get('all')
  async getEvents() {
    const rslt = this.eventService.getEvents();
    return rslt;
  }
  @Get(':name')
  async getEventByName(@Param('name') name: string) {
    const rslt = this.eventService.getEventByName(name);
    return rslt;
  }
  @Delete('id/:id')
  async deleteEvent(@Param('id') id: string) {
    const rslt = await this.eventService.deleteEvent(id);
    return { rslt };
  }
  @Patch('name/:name')
  async updateEvent(
    @Param('name') name: string,
    @Body('name') new_name: string,
    @Body('deadLine') deadLine: Date,
    @Body('date') date: Date,
  ) {
    const rslt = await this.eventService.updateEvent(
      name,
      new_name,
      deadLine,
      date,
    );
    return rslt;
  }
}

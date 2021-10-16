import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}
  async insertEvent(name: string, deadLine: Date, date: Date) {
    try {
      const event = new this.eventModel({ name, deadLine, date });
      const rslt = await event.save();
      return { name: rslt.name, id: rslt.id };
    } catch (error) {
      return { error };
    }
  }
  async getEvents() {
    try {
      const events = await this.eventModel.find().exec();
      return { events };
    } catch (e) {
      return { e };
    }
  }
  async getEventByName(name: string) {
    try {
      let e = 'Success';
      const event = (await this.eventModel.findOne({ name: name })) as Event;
      return { status: e, event };
    } catch (e) {
      const empty = (await new this.eventModel({
        name: 'nan',
        deadLine: new Date(),
        date: new Date(),
      })) as Event;
      return { status: e, event: empty };
    }
  }
  async deleteEvent(id: string) {
    try {
      const up = await this.eventModel.findByIdAndDelete(id);
      return { status: 'Event_id : ' + id + ' deleted successfully' };
    } catch (e) {
      return { status: 'could not delete event with id : ' + id, error: e };
    }
  }
  async updateEvent(
    name: string,
    new_name: string,
    deadLine: Date,
    date: Date,
  ) {
    try {
      const event = (await this.eventModel.findOne({ name: name })) as Event;
      if (!event) {
        throw NotFoundError;
      } else {
        if (new_name) {
          event.name = new_name;
        }
        if (deadLine) {
          event.deadLine = deadLine;
        }
        if (date) {
          event.date = date;
        }
        event.save();
        return { event };
      }
    } catch (e) {
      return { status: 'could not update event with name ' + name, error: e };
    }
  }
}

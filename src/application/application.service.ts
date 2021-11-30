import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './application.model';
import { EventService } from '../event/event.service';

export class ApplicationService {
  constructor(
    @InjectModel('Application')
    private readonly applicationModel: Model<Application>,
    private readonly eventService: EventService,
  ) {}
  async addApplication(
    id: string,
    event_name: string,
    position: string,
    skills: string,
    prevExp: string,
    other: string,
  ) {
    try {
      const { status, event } = await this.eventService.getEventByName(
        event_name,
      );
      if (status == 'Success') {
        const new_application = await new this.applicationModel({
          candidat: id,
          event: event.id,
          position: position,
          skills: skills,
          prevExp: prevExp,
          other: other,
          expireAt: event.date,
        });
        new_application.save();
        return new_application;
      } else {
        throw status;
      }
    } catch (e) {
      return { status: 'failed to add your new application! ', error: e };
    }
  }
  async deleteApplicationByEvent(event_name: string) {
    try {
      const { status, event } = await this.eventService.getEventByName(
        event_name,
      );
      if (status == 'Success') {
        const event_id = event.id;
        const rslt = await this.applicationModel.find({ event: event_id });
        return rslt;
      } else {
        throw status;
      }
    } catch (e) {
      return {
        status: 'could not delete applications of event : ' + event_name,
        error: e,
      };
    }
  }
}

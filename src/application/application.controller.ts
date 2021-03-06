import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post('put/:id')
  async putApplication(
    @Param('id') id: string,
    @Body('event') event: string,
    @Body('position') position: string,
    @Body('skills') skills: string,
    @Body('prevExp') prevExp: string,
    @Body('other') other: string,
  ) {
    const rslt = await this.applicationService.addApplication(
      id,
      event,
      position,
      skills,
      prevExp,
      other,
    );
    return rslt;
  }
  @Delete('delete/:event_name')
  async deleteApplicaionsByEvent(@Param('event_name') event_name: string) {
    const rslt = await this.applicationService.deleteApplicationByEvent(
      event_name,
    );
    return rslt;
  }
}

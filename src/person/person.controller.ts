import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @Post('add')
  async addPerson(
    @Body('name') name: string,
    @Body('lastName') lastName: string,
    @Body('phone') phone: number,
    @Body('email') email: string,
    @Body('motivation') motivation: string,
  ) {
    const generatedId = await this.personService.insertPerson(
      name,
      lastName,
      phone,
      email,
      motivation,
    );
    return { userName: generatedId };
  }

  @Get('persons')
  async getAllPersons() {
    let persons = await this.personService.displayPersons();

    return persons;
  }

  @Get(':userName')
  async getPerson(@Param('userName') userName: string) {
    const person = await this.personService.getPersonById(userName);
    return person;
  }

  @Patch(':userName')
  async updatePerson(
    @Param('userName') personId: string,
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('lastName') lastName: string,
    @Body('phone') phone: number,
    @Body('email') email: string,
    @Body('motivation') motivation: string,
  ) {
    if (id !== personId) {
      return { PermissionError: 'you cannot change a persons ID! ' };
    }
    return await this.personService.updatePerson(
      personId,
      name,
      lastName,
      phone,
      email,
      motivation,
    );
  }

  @Delete(':userName')
  async deletePerson(@Param('userName') id: string) {
    const stat = await this.personService.deletePerson(id);
    return { stat };
  }
}

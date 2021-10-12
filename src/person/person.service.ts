import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Person } from './person.model';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel('Person') private readonly personModel: Model<Person>,
  ) {}
  private reshape_helper = (e) => ({
    id: e.id,
    name: e.name,
    lastName: e.lastName,
    phone: e.phone,
    email: e.email,
    motivation: e.motivation,
  });
  private reshape_person(person) {
    return this.reshape_helper(person) as Person;
  }
  private reshape_persons(persons) {
    return persons.map((e) => this.reshape_helper(e)) as Person[];
  }
  async getPersonById(id: string): Promise<Person> {
    try {
      const person = await this.personModel.findById(id);
      return this.reshape_person(person);
    } catch (e) {
      throw new NotFoundException('could not find the person with id ' + id);
    }
  }
  async displayPersons() {
    const persons = await this.personModel.find().exec();
    return this.reshape_persons(persons) as Person[];
  }
  async insertPerson(
    name: string,
    lastName: string,
    phone: number,
    email: string,
    motivation: string,
  ) {
    const newPerson = new this.personModel({
      name,
      lastName,
      phone,
      email,
      motivation,
    });
    const rslt = await newPerson.save();
    return rslt.id as string;
  }
  async updatePerson(
    id: string,
    name: string,
    lastName: string,
    phone: number,
    email: string,
    motivation: string,
  ) {
    try {
      const up = await this.personModel.findById(id);
      let arg = {
        name: name,
        lastName: lastName,
        phone: phone,
        email: email,
        motivation: motivation,
      };
      let person = this.reshape_person(up);
      let params = Object.entries(arg);
      params = params.filter((e) => {
        return e[1] != null && e[1] != '';
      });
      let new_arg = Object.fromEntries(params);
      const newPerson = new this.personModel({
        ...person,
        ...new_arg,
      } as Person);
      newPerson.save();
    } catch (e) {
      return 'an error occured : ' + e;
    }

    return 'person updated successfully ! ';
  }
  async deletePerson(id: string) {
    try {
      const up = await this.personModel.findById(id);
      up.delete();
      return 'id : ' + id + ' deleted successfully';
    } catch (e) {
      return 'could not delete the person with id ' + id + ' : ' + e;
    }
  }
}

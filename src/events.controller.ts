import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];
  @Get()
  findAll() {
    return this.events;
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    const event = this.events.find((event) => event.id === id);
    return event;
  }
  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(event);
    return event;
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === id);
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    return this.events[index];
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    this.events = this.events.filter((event) => event.id !== id);
    return this.events;
  }
}

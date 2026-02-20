import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  findAll() { return this.guestbookService.findAll(); }

  @Post()
  create(@Body() body: { name: string; message: string }) { return this.guestbookService.create(body); }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { message: string }) { return this.guestbookService.update(id, body); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.guestbookService.remove(id); }
}
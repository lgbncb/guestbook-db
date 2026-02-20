import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async findAll() {
    // The 'return' keyword is critical here so the frontend gets the array!
    return await this.guestbookService.findAll();
  }

  @Post()
  async create(@Body() entry: { name: string; message: string }) {
    return await this.guestbookService.create(entry);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() entry: { message: string }) {
    return await this.guestbookService.update(id, entry);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.guestbookService.remove(id);
  }
}
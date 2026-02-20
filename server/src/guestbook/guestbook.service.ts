import { Injectable } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';

@Injectable()
export class GuestbookService {
  create(createGuestbookDto: CreateGuestbookDto) {
    return 'This action adds a new guestbook';
  }

  findAll() {
    return `This action returns all guestbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guestbook`;
  }

  update(id: number, updateGuestbookDto: UpdateGuestbookDto) {
    return `This action updates a #${id} guestbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} guestbook`;
  }
}

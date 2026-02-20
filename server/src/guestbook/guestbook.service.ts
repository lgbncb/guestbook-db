import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL as string, 
      process.env.SUPABASE_KEY as string
    );
  }

  async findAll() {
    const { data, error } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    // Force the server to scream if Supabase fails
    if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // Guarantee an array is returned, even if empty
    return data || [];
  }

  async create(entry: { name: string; message: string }) {
    const { data, error } = await this.supabase.from('guestbook').insert([entry]).select();
    if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    return data || [];
  }

  async update(id: string, entry: { message: string }) {
    const { data, error } = await this.supabase.from('guestbook').update({ message: entry.message }).eq('id', id).select();
    if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    return data || [];
  }

  async remove(id: string) {
    const { error } = await this.supabase.from('guestbook').delete().eq('id', id);
    if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    return { message: 'Deleted successfully' };
  }
}
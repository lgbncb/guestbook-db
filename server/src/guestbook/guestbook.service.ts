import { Injectable } from '@nestjs/common';
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
    const { data } = await this.supabase.from('guestbook').select('*').order('created_at', { ascending: false });
    return data;
  }

  async create(entry: { name: string; message: string }) {
    const { data } = await this.supabase.from('guestbook').insert([entry]).select();
    return data;
  }

  async update(id: string, entry: { message: string }) {
    const { data } = await this.supabase.from('guestbook').update({ message: entry.message }).eq('id', id).select();
    return data;
  }

  async remove(id: string) {
    await this.supabase.from('guestbook').delete().eq('id', id);
    return { message: 'Deleted' };
  }
}
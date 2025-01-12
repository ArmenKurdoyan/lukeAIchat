import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}

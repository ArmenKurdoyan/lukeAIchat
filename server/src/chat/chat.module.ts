import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message]), UserModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}

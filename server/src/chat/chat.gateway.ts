import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() body: { chatId: number; content: string },
  ) {
    const { chatId, content } = body;

    await this.chatService.addMessage(chatId, content, 'user');

    const aiResponse = await this.chatService.getAIResponse(content);
    const aiMessage = await this.chatService.addMessage(
      chatId,
      aiResponse,
      'ai',
    );

    this.server
      .to(`chat_${chatId}`)
      .emit('newMessage', { sender: 'user', content });
    this.server
      .to(`chat_${chatId}`)
      .emit('newMessage', { sender: 'ai', content: aiResponse });

    return aiMessage;
  }
}

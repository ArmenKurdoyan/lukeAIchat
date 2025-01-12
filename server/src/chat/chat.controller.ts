import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('user/:userId')
  async getChatsByUser(@Param('userId') userId: string) {
    return await this.chatService.findChatsByUser(+userId);
  }

  @Post('start')
  async startChat(@Body('userId') userId: number) {
    return this.chatService.createChat(userId);
  }

  @Post('message')
  async sendMessage(@Body() body: { chatId: number; content: string }) {
    const { chatId, content } = body;
    const aiResponse = await this.chatService.getAIResponse(content);
    await this.chatService.addMessage(chatId, content, 'user');
    const aiMessage = await this.chatService.addMessage(
      chatId,
      aiResponse,
      'ai',
    );

    return aiMessage;
  }

  @Get(':id/messages')
  async getMessages(@Param('id') id: number) {
    return this.chatService.getMessages(id);
  }

  @Get(':chatId')
  async getChat(@Param('chatId') chatId: number) {
    return this.chatService.getChat(chatId);
  }
}

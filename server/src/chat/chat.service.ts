import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from '../entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getChats(userId: number) {
    const chats = await this.chatRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['messages'],
    });

    if (!chats.length) {
      throw new Error('No chats found for this user');
    }

    return chats;
  }

  async createChat(userId: number): Promise<Chat> {
    let user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      user = this.userRepository.create({ id: userId });
      await this.userRepository.save(user);
    }
    const chat = this.chatRepository.create({ user });
    return this.chatRepository.save(chat);
  }

  async findChatsByUser(userId: number): Promise<Chat[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.chatRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getMessages(chatId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { chat: { id: chatId } },
      relations: ['chat'],
      order: { createdAt: 'ASC' },
    });
  }

  async addMessage(
    chatId: number,
    content: string,
    sender: 'user' | 'ai',
  ): Promise<Message> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new Error('Chat not found');
    }

    const message = this.messageRepository.create({ chatId, content, sender });
    const savedMessage = await this.messageRepository.save(message);

    return savedMessage;
  }

  async getAIResponse(prompt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async getChat(chatId: number): Promise<Chat> {
    return this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['messages'],
    });
  }
}

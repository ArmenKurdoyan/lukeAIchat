import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Chat, Message, User],
      synchronize: false, // Disable this in production
    }),
    TypeOrmModule.forFeature([Chat, Message, User]),
    UserModule,
    ChatModule,
  ],
})
export class AppModule {}

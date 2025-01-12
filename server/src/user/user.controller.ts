import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Get('check-user/:userId')
  async checkUser(
    @Param('userId') userId: string,
  ): Promise<{ exists: boolean }> {
    const exists = await this.userService.checkUserExists(userId);
    return { exists };
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}

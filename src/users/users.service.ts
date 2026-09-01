import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './users.repository.js';
import { createUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcryptjs';
import { loginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async register(data: createUserDto) {
    const existingUser = await this.usersRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return newUser;
  }

  async login(data: loginUserDto) {
    const result = await this.usersRepository.findByEmail(data.email);
    if (!result) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const user = result[0];
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return {
      message: 'login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // DELETE /users/:id
  async remove(id: number) {
    // Check user exists
    await this.findById(id);

    const result = await this.usersRepository.delete(id);

    const user = result[0];

    return {
      message: 'User deleted successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

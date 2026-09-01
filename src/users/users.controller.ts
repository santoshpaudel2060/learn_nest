import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { registerUserDto } from './dto/register-user.dto.js';
import { loginUserDto } from './dto/login-user.dto.js';
import {
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all registered users.',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of users has been successfully retrieved.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(id: number) {
    return this.usersService.findById(id);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  register(@Body() data: registerUserDto) {
    return this.usersService.register(data);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login a user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  login(@Body() data: loginUserDto) {
    return this.usersService.login(data);
  }

  @Delete(':id')
  @ApiConflictResponse({
    description: 'User not found',
  })
  @ApiOperation({
    summary: 'Delete a user',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}

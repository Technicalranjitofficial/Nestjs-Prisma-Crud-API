import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDTO } from './user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  async createUser(@Body() userDTO: CreateDTO) {
    try {
      return this.userService.createUser(userDTO);
    } catch (error) {
      return error;
    }
  }

  @Get('getAllUsers')
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUser();
      if (!users) {
        return 'No users found';
      }
      return {
        message: 'Users Found Successfully',
        users,
      };
    } catch (error) {
      return {
        message: 'Error while fetching users',
        error,
      };
    }
  }

  //getting user by id
  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new HttpException(
          {
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'User Found Successfully',
        user,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error while fetching user',
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }


  }

  //deleting user by id
    @Delete('deleteUserById/:id')
    async deleteUserById(@Param('id') id:string){
        try{
            const user=await this.userService.deleteUser(id);
            if(!user){
                throw new HttpException({
                    message:'User not found'
                },HttpStatus.NOT_FOUND)
            }
            return {
                message:'User deleted successfully',
                user
            }
        }catch(error){
            throw new HttpException({
                message:'Error while deleting user',
                error
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    //updating user by id
    @Post('updateUserById/:id')
    async updateUserById(@Param('id') id:string,@Body("email") userEmail:string){
        try{
            const user=await this.userService.updateUser(id,userEmail);
            if(!user){
                throw new HttpException({
                    message:'User not found'
                },HttpStatus.NOT_FOUND)
            }
            return {
                message:'User updated successfully',
                user
            }
        }catch(error){
            throw new HttpException({
                message:'Error while updating user',
                error
            },HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

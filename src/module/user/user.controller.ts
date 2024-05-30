import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ImageService } from '../image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { apiFailed, apiSuccess } from 'src/common/api-response';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(createUserDto);
      return apiSuccess(201, createdUser, 'Create user successfully');
    } catch (error) {
      throw apiFailed(error.statusCode, null, error.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    try {
      const listUsers = await this.userService.findAll();

      if (!listUsers.length) {
        throw apiFailed(404, null, 'Empty list users');
      }

      return apiSuccess(
        200,
        { users: listUsers, count: listUsers.length },
        'Get list users successfully',
      );
    } catch (error) {
      throw apiFailed(error.statusCode, null, error.message);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw apiFailed(404, null, 'User not found');
      }

      return apiSuccess(200, user, 'Get user successfully');
    } catch (error) {
      throw apiFailed(error.statusCode, null, error.message);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, skipMissingProperties: true }))
    updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto);
    const userUpdated = await this.userService.update(id, updateUserDto);
    return apiSuccess(200, { userUpdated }, 'Update user successfully');
  }

  // @Post(':id/avatar')
  // @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(FileInterceptor('file'))
  // async postAvatar(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   try {
  //     const urlResult = await this.imageService.uploadImage(file);
  //     const imageName = getNameImageFromUrl(urlResult);
  //     const updatedUser = await this.userService.updateImage(id, imageName);
  //     return apiSuccess(200, { updatedUser }, 'Add user avatar successfully');
  //   } catch (error) {
  //     return apiFailed(error.statusCode, null, error.message);
  //   }
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  // async deleteUserById(@Param('id') id: string) {
  //   try {
  //     await this.userService.deleteUser(id);

  //     return apiSuccess(200, null, 'Delete user successfully');
  //   } catch (error) {
  //     throw apiFailed(error.statusCode, null, error.message);
  //   }
  // }

  // @Get('profile/get-me')
  // @UseGuards(AuthGuard('jwt'))
  // async getProfileDetailByToken(@Headers('authorization') jwt: string) {
  //   try {
  //     const profile = await this.userService.getProfileDetailByToken(jwt);

  //     if (!profile) {
  //       throw apiFailed(404, null, 'Profile not found');
  //     }

  //     return apiSuccess(200, profile, 'Get profile successfully');
  //   } catch (error) {
  //     throw apiFailed(error.statusCode, null, error.message);
  //   }
  // }

  // @Post('password/update')
  // @UseGuards(AuthGuard('jwt'))
  // async updateUserPassword(
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  //   @Headers('authorization') jwt: string,
  // ) {
  //   try {
  //     await this.userService.updateUserPassword(updatePasswordDto, jwt);
  //     return apiSuccess(200, null, 'User password update successfully');
  //   } catch (error) {
  //     throw apiFailed(error.statusCode, null, error.message);
  //   }
  // }

  // @Post('password/reset')
  // @UseGuards(AuthGuard('jwt'))
  // async resetUserPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //   try {
  //     await this.userService.resetUserPassword(resetPasswordDto);
  //     return apiSuccess(200, null, 'User password reset successfully');
  //   } catch (error) {
  //     throw apiFailed(error.statusCode, null, error.message);
  //   }
  // }
}

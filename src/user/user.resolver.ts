import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AddUserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation()
  async addUser(@Args('addUserInput') addUserInput: AddUserDTO) {
    return await this.userService.addUser(addUserInput);
  }

  @Query()
  async getUsers() {
    return await this.userService.getUsers();
  }
}

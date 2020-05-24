import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleInterface } from './interfaces/role.interface';
import { UserInterface } from './interfaces/user.interface';
import { AddUserDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<RoleInterface>,
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async addUser(addUserInput: AddUserDTO) {
    const newUser = new this.userModel(addUserInput);

    let user = await newUser.save();
    user = await user.populate('role').execPopulate();
    return user;
  }

  async getUsers() {
    const users = await this.userModel.find({}).populate('role');
    return users;
  }

  async getGraphQLOptionsForRoles() {
    const roles = await this.roleModel.find({});
    const roleNames = roles
      .filter(role => role.name != 'ADMIN')
      .map(role => role.name);
    const roleTypeDefs = `enum UserRole { ${roleNames.join(' ')} }`;
    const UserRole = {};
    roles.forEach(role => {
      if (role.name != 'ADMIN') {
        UserRole[role.name.toString()] = role._id.toString();
      }
    });

    return {
      roleTypeDefs: roleTypeDefs,
      UserRole: UserRole,
    };
  }
}

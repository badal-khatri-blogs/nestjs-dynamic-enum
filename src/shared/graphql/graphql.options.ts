import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { UserService } from '../../user/user.service';

@Injectable()
export class GraphQLOptions implements GqlOptionsFactory {
  constructor(private readonly userService: UserService) {}

  async createGqlOptions(): Promise<GqlModuleOptions> /* | GqlModuleOptions*/ {
    const {
      roleTypeDefs,
      UserRole,
    } = await this.userService.getGraphQLOptionsForRoles();

    const options: GqlModuleOptions = {
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
        outputAs: 'class',
      },
      debug: true,
      introspection: true,
      playground: true,
      cors: true,
      typeDefs: [roleTypeDefs],
      resolvers: [
        {
          UserRole: UserRole,
        },
      ]
    };

    return options;
  }
}

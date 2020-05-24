import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseConfigOptions } from './shared/mongoose/mongoose.options';
import { GraphQLOptions } from './shared/graphql/graphql.options';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigOptions,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphQLOptions,
      imports: [UserModule],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

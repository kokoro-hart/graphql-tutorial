import { Field, ObjectType } from '@nestjs/graphql';
import { User as UserModel } from 'src/user/models/user.model';

@ObjectType()
export class SignInResponse {
  @Field()
  accessToken: string;

  @Field(() => UserModel)
  user: UserModel;
}

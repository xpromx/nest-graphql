import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, Validate } from 'class-validator';
import { UniqueEmail } from '../validations/unique-email.validation';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @IsEmail()
  @Validate(UniqueEmail)
  email: string;
}

import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'UniqueEmail', async: true })
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(email: string) {
    return this.userService.findOneByEmail(email).then((user) => !user);
  }

  defaultMessage() {
    return 'Email is already taken';
  }
}

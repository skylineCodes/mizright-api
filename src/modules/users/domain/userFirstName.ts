import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { Guard } from '../../../shared/core/Guard';

interface UserFirstNameProps {
  firstname: string;
}

export class UserFirstName extends ValueObject<UserFirstNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  get value(): string {
    return this.props.firstname;
  }

  private constructor(props: UserFirstNameProps) {
    super(props);
  }

  public static create(props: UserFirstNameProps): Result<UserFirstName> {
    const userfirstnameResult = Guard.againstNullOrUndefined(props.firstname, 'firstname');
    if (userfirstnameResult.isFailure) {
      return Result.fail<UserFirstName>(userfirstnameResult.getErrorValue());
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.firstname);
    if (minLengthResult.isFailure) {
      return Result.fail<UserFirstName>(minLengthResult.getErrorValue());
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.firstname);
    if (maxLengthResult.isFailure) {
      return Result.fail<UserFirstName>(minLengthResult.getErrorValue());
    }

    return Result.ok<UserFirstName>(new UserFirstName(props));
  }
}

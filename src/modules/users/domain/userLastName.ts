import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { Guard } from '../../../shared/core/Guard';

interface userLastNameProps {
  lastname: string;
}

export class UserLastName extends ValueObject<userLastNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  get value(): string {
    return this.props.lastname;
  }

  private constructor(props: userLastNameProps) {
    super(props);
  }

  public static create(props: userLastNameProps): Result<userLastName> {
    const userLastNameResult = Guard.againstNullOrUndefined(props.lastname, 'lastname');
    if (userLastNameResult.isFailure) {
      return Result.fail<userLastName>(userLastNameResult.getErrorValue());
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.lastname);
    if (minLengthResult.isFailure) {
      return Result.fail<userLastName>(minLengthResult.getErrorValue());
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.lastname);
    if (maxLengthResult.isFailure) {
      return Result.fail<userLastName>(minLengthResult.getErrorValue());
    }

    return Result.ok<userLastName>(new userLastName(props));
  }
}

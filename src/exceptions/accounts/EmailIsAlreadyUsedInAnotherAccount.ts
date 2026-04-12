import { DomainError } from "../DomainError";

export class EmailIsAlreadyUsedInAnotherAccount extends DomainError {
  constructor(email: string) {
    super(
      "EMAIL_IS_ALREADY_USED_IN_ANOTHER_ACCOUNT",
      "Email is already used in another account",
      { email },
    );
  }
}

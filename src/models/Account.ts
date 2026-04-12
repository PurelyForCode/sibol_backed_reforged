export class Account {
  constructor(
    private _id: string,
    private _email: string,
    private _password: string,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _bannedAt: Date | null,
  ) {}

  public get bannedAt(): Date | null {
    return this._bannedAt;
  }
  public set bannedAt(value: Date | null) {
    this._bannedAt = value;
  }
  public get updatedAt(): Date {
    return this._updatedAt;
  }
  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }
  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
}

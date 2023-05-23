export abstract class BaseEntity {
  uuid: string;

  protected constructor(uuid: string) {
    this.uuid = uuid;
  }

  public equals(other: BaseEntity): boolean {
    return other && other instanceof BaseEntity && this.uuid === other.uuid;
  }
}

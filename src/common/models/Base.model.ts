export abstract class BaseModel {
  uuid: string;

  protected constructor(uuid: string) {
    this.uuid = uuid;
  }

  public equals(other: BaseModel): boolean {
    return other && other instanceof BaseModel && this.uuid === other.uuid;
  }
}

import { prop } from '@typegoose/typegoose';

class Station {
  @prop()
  public geometry: object;

  @prop({ default: {} })
  public properties: object;

  @prop()
  public type: string;
}

export default Station;

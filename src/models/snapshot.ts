import {
  prop, getModelForClass, modelOptions, index, Severity,
} from '@typegoose/typegoose';
import Station from './schema/station';

@index({ at: 1 })
@modelOptions({ options: { allowMixed: Severity.ALLOW }, schemaOptions: { timestamps: { createdAt: 'at' } } })
export class Snapshot {
  @prop()
  public at?: Date;

  @prop({})
  public stations: Station[];

  @prop({})
  public weather: object;
}

export default getModelForClass(Snapshot);

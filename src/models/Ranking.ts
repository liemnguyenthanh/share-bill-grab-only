import { ModelOptions, Severity, getModelForClass, index, post, prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@post<RankingSchema[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === 'find') {
    docs.forEach((doc) => {
      doc._id = doc._id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'rankings',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class RankingSchema {
  @prop({ required: true, unique: true })
  slug: string;

  _id: mongoose.Types.ObjectId | string;

  name: string;

  payment_period: number;

  date: string;

  price: number;
}

const Ranking = getModelForClass(RankingSchema);
export { Ranking, RankingSchema };

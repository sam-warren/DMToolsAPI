import * as mongoose from 'mongoose';

const DamageType = new mongoose.Schema({
  _id: { type: String, select: false },
  desc: { type: [String], index: true },
  index: { type: String, index: true },
  name: { type: String, index: true },
  url: { type: String, index: true },
});

export default mongoose.model('DamageType', DamageType, 'damage-types');

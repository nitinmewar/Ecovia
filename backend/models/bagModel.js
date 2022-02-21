import mongoose from 'mongoose';

const bagSchema = mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    flap_color: {
      type: String,
      required: true,
    },
    ecovian: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bag = mongoose.model('Bag', bagSchema);

export default Bag;

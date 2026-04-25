import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    address: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    veterinarians: {
      type: [
        {
          type: String,
          trim: true
        }
      ],
    default: []
    }
  },
  {
    timestamps: true
  }
);

clientSchema.plugin(mongoosePaginate);

const ClientModel = mongoose.model('Client', clientSchema);

export default ClientModel;

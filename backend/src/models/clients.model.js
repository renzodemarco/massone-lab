import mongoose from "mongoose";

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
  }
);

const ClientModel = mongoose.model('Client', clientSchema);

export default ClientModel;
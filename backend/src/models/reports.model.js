import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    species: {
      type: String,
      trim: true
    },
    breed: {
      type: String,
      trim: true
    },
    age: {
      type: String,
      trim: true
    },
    sex: {
      type: String,
      enum: ['macho', 'hembra'],
      required: true
    },
    color: {
      type: String,
      trim: true
    },
    neutered: {
      type: Boolean,
      default: undefined
    }
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    protocolNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    patient: {
      type: patientSchema,
      required: true
    },
    veterinarian: {
      type: String,
      trim: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    },
    studyType: {
      type: String,
      enum: ['citología', 'histopatología', 'inmunohistoquímica'],
      required: true
    },
    macroDescription: {
      type: String,
      trim: true
    },
    microDescription: {
      type: String,
      trim: true
    },
    comments: {
      type: String,
      trim: true
    },
    result: {
      type: String,
      trim: true
    },
    images: [
      {
        type: String,
        trim: true
      }
    ],
    entryDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const ReportModel = mongoose.model('Report', reportSchema);

export default ReportModel;
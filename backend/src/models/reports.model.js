import mongoose from "mongoose";
import { mongoosePaginate } from "mongoose-paginate-v2";

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
    status: {
      type: String,
      enum: ['entered', 'started', 'finished', 'sent', 'cancelled'],
      default: 'entered'
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
      enum: ['cito', 'hp', 'ihq'],
      required: true
    },
    sampleInfo: {
      type: String,
      trim: true
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
    },
    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

reportSchema.pre('save', function (next) {
  if (!this.dueDate && this.entryDate && this.studyType) {
    const daysToAdd = {
      cito: 3,
      hp: 7,
      ihq: 10
    }[this.studyType] || 7;

    this.dueDate = new Date(this.entryDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  }
  next();
});

reportSchema.plugin(mongoosePaginate);

const ReportModel = mongoose.model('Report', reportSchema);

export default ReportModel;
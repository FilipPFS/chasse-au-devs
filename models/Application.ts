import { Schema, model, Document, models, Types } from "mongoose";

export interface ApplicationSchema extends Document {
  jobOffer: Types.ObjectId;
  sender: Types.ObjectId;
  jobCreator: Types.ObjectId | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cv: string;
  coverLetter: string;
  status: "Accepté" | "Rejetée" | "En attente de réponse";
}

const applicationSchema = new Schema<ApplicationSchema>({
  jobOffer: { type: Schema.Types.ObjectId, ref: "JobOffer", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  jobCreator: { type: Schema.Types.ObjectId, ref: "User", required: false },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  cv: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Accepté", "Rejetée", "En attente de réponse"],
  },
});

const Application =
  models.Application ||
  model<ApplicationSchema>("Application", applicationSchema);

export default Application;

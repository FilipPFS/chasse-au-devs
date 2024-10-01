import { Schema, model, models, Types } from "mongoose";

export interface IJob {
  owner: Types.ObjectId;
  jobTitle: string;
  companyName: string;
  contract: string;
  location: {
    city: string;
    postalCode: string;
    country: string;
  };
  salary: string;
  jobTime: string;
  schedules: string[];
  technologies: string[];
  workingMethod: string;
  experience: string;
  diploma: string;
  description: string;
  benefits: string[];
}

const JobSchema = new Schema<IJob>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    contract: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    salary: { type: String, required: true },
    jobTime: { type: String, required: true },
    schedules: [{ type: String, required: true }],
    technologies: [{ type: String, required: true }],
    workingMethod: { type: String, required: true },
    experience: { type: String, required: true },
    diploma: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

const JobOffer = models.JobOffer || model<IJob>("JobOffer", JobSchema);

export default JobOffer;

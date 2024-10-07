import { Schema, model, Document, models } from "mongoose";

export interface Experience {
  jobTitle: string;
  yearsWorked: string;
  quickDescription?: string;
}

export interface Links {
  linkedin?: string;
  twitter?: string;
  github?: string;
  personnal?: string;
}

export interface Education {
  schoolName?: string;
  diploma?: string;
  quickDescription?: string;
}

export interface UserSchema extends Document {
  email: string;
  username: string;
  image?: string;
  pdf?: string;
  employer: "candidat" | "employer";
  experience?: Experience[];
  links?: Links;
  education?: Education[];
  visible: Boolean;
}

const userSchema = new Schema<UserSchema>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
  pdf: {
    type: String,
  },
  employer: {
    type: String,
    enum: ["candidat", "employer"],
  },
  experience: [
    {
      jobTitle: { type: String },
      yearsWorked: { type: String },
      quickDescription: { type: String },
    },
  ],
  links: {
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String },
    personnal: { type: String },
  },
  education: [
    {
      schoolName: { type: String },
      diploma: { type: String },
      quickDescription: { type: String },
    },
  ],
  visible: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model<UserSchema>("User", userSchema);

export default User;

import { Schema, model, Document, models } from "mongoose";

interface Experience {
  jobTitle: string;
  yearsWorked: number;
  quickDescription: string;
}

interface Education {
  schoolName: string;
  diploma: string;
  quickDescription: string;
}

interface User extends Document {
  email: string;
  username: string;
  image?: string;
  pdf?: string;
  employer: boolean;
  experience?: Experience[];
  links?: string[];
  education?: Education[];
}

const userSchema = new Schema<User>({
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
    type: Boolean,
    default: false,
  },
  experience: [
    {
      jobTitle: { type: String },
      yearsWorked: { type: Number },
      quickDescription: { type: String },
    },
  ],
  links: {
    type: [String],
    default: [],
  },
  education: [
    {
      schoolName: { type: String },
      diploma: { type: String },
      quickDescription: { type: String },
    },
  ],
});

const UserModel = models.User || model<User>("User", userSchema);

export default UserModel;

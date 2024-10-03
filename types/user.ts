import { Types } from "mongoose";

interface Experience {
  jobTitle: string;
  yearsWorked: number;
  quickDescription: string;
}

interface Links {
  linkedin?: string;
  twitter: string;
  github: string;
  personnal: string;
}

interface Education {
  schoolName: string;
  diploma: string;
  quickDescription: string;
}

export interface UserType {
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

export interface JobType {
  _id: string;
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
  createdAt?: string;
}

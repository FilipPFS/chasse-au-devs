import { Types } from "mongoose";

interface Experience {
  jobTitle: string;
  yearsWorked: string;
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
  _id: string;
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

export interface JobCardType {
  companyName: string;
  location: {
    city: string;
    postalCode: string;
    country: string;
  };
  _id: string;
  jobTitle: string;
  contract: string;
  salary: string;
  jobTime: string;
  createdAt: string;
}

export interface UserApplication {
  _id: string;
  jobOffer: {
    companyName: string;
    location: {
      city: string;
      postalCode: string;
      country: string;
    };
    _id: string;
    jobTitle: string;
    contract: string;
    salary: string;
    jobTime: string;
    createdAt: string;
  };
  status: "Accepté" | "Rejetée" | "En attente de réponse";
}

export interface EmployerApplicationType {
  _id: string;
  jobOffer: {
    companyName: string;
    _id: string;
    jobTitle: string;
  };
  sender: {
    username: string;
    _id: string;
    image?: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cv: string;
  coverLetter: string;
  status: "Accepté" | "Rejetée" | "En attente de réponse";
}

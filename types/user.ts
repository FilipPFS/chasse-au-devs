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

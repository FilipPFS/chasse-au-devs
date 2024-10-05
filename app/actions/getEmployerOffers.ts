"use server";

import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";
import { getSessionDb } from "./getSessionDb";
import { JobType, UserType } from "@/types/user";
import Application from "@/models/Application";

export const getEmployerOffers = async () => {
  try {
    await connectToDb();

    const user: UserType = await getSessionDb();

    if (!user.employer) {
      throw new Error("Vous n'êtes pas un recruteur.");
    }

    const jobs: JobType[] = await JobOffer.find({ owner: user._id });

    return jobs;
  } catch (err) {
    console.error(err);
  }
};

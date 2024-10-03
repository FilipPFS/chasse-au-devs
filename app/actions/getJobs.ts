"use server";

import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const getJobsHome = async () => {
  try {
    await connectToDb();

    const jobs = await JobOffer.find().sort({ createdAt: -1 });

    return jobs;
  } catch (err) {
    console.error(err);
  }
};

export const getJobsOffer = async () => {
  try {
    await connectToDb();

    const jobs = await JobOffer.find();

    return jobs;
  } catch (err) {
    console.error(err);
  }
};

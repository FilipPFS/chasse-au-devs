"use server";

import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";

export const getJobById = async (id: string) => {
  try {
    await connectToDb();

    const job = await JobOffer.findById(id);

    return job;
  } catch (err) {
    console.error(err);
  }
};

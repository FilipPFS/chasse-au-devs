"use server";

import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";
import { getSessionDb } from "./getSessionDb";
import Application from "@/models/Application";
import { getSessionUser } from "@/utils/getSessionUser";

export const getExistingApplication = async (id: string) => {
  try {
    await connectToDb();

    const user = await getSessionUser();

    const existingApplication = await Application.findOne({
      jobOffer: id,
      sender: user?.userId,
    });

    return existingApplication;
  } catch (err) {
    console.error(err);
  }
};

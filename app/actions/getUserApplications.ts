"use server";

import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";
import { getSessionDb } from "./getSessionDb";
import Application from "@/models/Application";
import { getSessionUser } from "@/utils/getSessionUser";

export const getUserApplications = async () => {
  try {
    await connectToDb();

    const user = await getSessionUser();

    const existingApplications = await Application.find({
      sender: user?.userId,
    })
      .select("status") // Only retrieve the 'status' field from Application
      .populate({
        path: "jobOffer",
        select:
          "companyName jobTitle location contract salary jobTime createdAt", // Specify the fields to retrieve from JobOffer
      });

    return existingApplications;
  } catch (err) {
    console.error(err);
  }
};

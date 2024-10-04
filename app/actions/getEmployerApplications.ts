"use server";

import connectToDb from "@/config/database";
import Application from "@/models/Application";
import { getSessionUser } from "@/utils/getSessionUser";

export const getEmployerApplications = async () => {
  try {
    await connectToDb();

    const user = await getSessionUser();

    const existingApplications = await Application.find({
      jobCreator: user?.userId,
    })
      .populate({
        path: "jobOffer",
        select: "companyName jobTitle",
      })
      .populate({
        path: "sender",
        select: "username image",
      });

    return existingApplications;
  } catch (err) {
    console.error(err);
  }
};

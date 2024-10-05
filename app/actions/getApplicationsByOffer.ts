"use server";

import connectToDb from "@/config/database";
import Application from "@/models/Application";
import { getSessionUser } from "@/utils/getSessionUser";

export const getApplicationsByOffer = async (id: string) => {
  try {
    await connectToDb();

    const user = await getSessionUser();

    const applicationsByOffer = await Application.find({
      jobCreator: user?.userId,
      jobOffer: id,
    })
      .populate({
        path: "jobOffer",
        select: "companyName jobTitle",
      })
      .populate({
        path: "sender",
        select: "username image",
      });

    return applicationsByOffer;
  } catch (err) {
    console.error(err);
  }
};

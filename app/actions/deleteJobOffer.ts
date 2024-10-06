"use server";

import connectToDb from "@/config/database";
import Application from "@/models/Application";
import JobOffer from "@/models/JobOffer";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  submitted: boolean;
};

export const deleteJobOffer = async (
  previousState: FormState,
  formData: FormData
): Promise<{ submitted: boolean }> => {
  try {
    await connectToDb();

    const user = await getSessionUser();
    const jobOfferId = formData.get("jobOfferId");

    if (!user) {
      throw new Error("User not authenticated.");
    }

    const jobOffer = await JobOffer.findById(jobOfferId);

    if (!jobOffer) {
      throw new Error("Job offer not found.");
    }

    if (jobOffer.owner.toString() !== user.userId.toString()) {
      throw new Error("Vous n'êtes pas autorisé.");
    }

    const applicationLinkedWithOffer = await Application.find({
      jobOffer: jobOffer._id,
    });

    await jobOffer.deleteOne();

    await Promise.all(
      applicationLinkedWithOffer.map((application) => application.deleteOne())
    );

    revalidatePath("/my-account/offers", "layout");

    return { submitted: true };
  } catch (err) {
    console.error(err);
    return { submitted: false };
  }
};

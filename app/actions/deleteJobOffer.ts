"use server";

import connectToDb from "@/config/database";
import Application from "@/models/Application";
import JobOffer from "@/models/JobOffer";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteJobOffer = async (formData: FormData) => {
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

    alert("L'offre d'emploi a été suprimé.");
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/my-account/offers", "layout");

  redirect("/my-account/offers");
};

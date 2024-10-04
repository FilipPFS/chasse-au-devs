"use server";

import connectToDb from "@/config/database";
import Application from "@/models/Application";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const changeApplicationStatus = async (formData: FormData) => {
  try {
    await connectToDb();

    const user = await getSessionUser();
    const applicationId = formData.get("applicationId") as string;

    const application = await Application.findById(applicationId);

    console.log("APPLICATION JOB CREATOR", application.jobCreator);
    console.log("USERID", user?.userId);

    if (!application) {
      throw new Error("Cette candidature n'a pas été trouvé.");
    }

    if (application.jobCreator.toString() !== user?.userId) {
      throw new Error("Vous n'êtes pas autorisé à realiser cette action.");
    }

    if (application.status !== "En attente de réponse") {
      throw new Error(
        "Vous ne pouvez pas modifer le statut de cette candidature."
      );
    }

    const newStatus = formData.get("status");

    application.status = newStatus;

    await application.save();
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/application/received", "layout");

  redirect("/applications/received");
};

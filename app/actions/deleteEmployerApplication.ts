"use server";

import connectToDb from "@/config/database";
import Application from "@/models/Application";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteEmployerApplication = async (formData: FormData) => {
  try {
    await connectToDb();

    const user = await getSessionUser();
    const applicationId = formData.get("applicationId") as string;

    const application = await Application.findById(applicationId);

    if (!application) {
      throw new Error("Cette candidature n'a pas été trouvé.");
    }

    if (application.jobCreator.toString() !== user?.userId) {
      throw new Error("Vous n'êtes pas autorisé à realiser cette action.");
    }

    application.jobCreator = null;

    await application.save();
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/application/received", "layout");

  redirect("/applications/received");
};

"use server";

import { Education, Experience, Links, UserSchema } from "@/models/User";
import { getSessionDb } from "./getSessionDb";
import { createExperience, uploadPdfToCloudinary } from "./completeProfile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateEducation = async (
  formData: FormData,
  schoolTitleKey: string,
  diplomaKey: string,
  descriptionKey: string
): Promise<Education | null> => {
  const schoolName = (await formData.get(schoolTitleKey)) as string;
  const diploma = (await formData.get(diplomaKey)) as string;
  const quickDescription = (await formData.get(descriptionKey)) as string;

  if (schoolName || diploma || quickDescription) {
    return {
      schoolName,
      diploma,
      quickDescription,
    };
  }

  return null;
};

export const updateProfile = async (formData: FormData) => {
  const userFromDb: UserSchema | null = await getSessionDb();

  if (!userFromDb) {
    throw new Error("No user found");
  }

  const pdfFile = formData.get("pdf");

  const myPdf =
    pdfFile && pdfFile.size > 0
      ? await uploadPdfToCloudinary(pdfFile)
      : userFromDb.pdf;

  const experience1 = await createExperience(
    formData,
    "expTitle1",
    "exp_number1",
    "exp_select1",
    "expDescription1"
  );
  const experience2 = await createExperience(
    formData,
    "expTitle2",
    "exp_number2",
    "exp_select2",
    "expDescription2"
  );
  const experience3 = await createExperience(
    formData,
    "expTitle3",
    "exp_number3",
    "exp_select3",
    "expDescription3"
  );

  const experience = [experience1, experience2, experience3].filter(
    (exp): exp is Experience => exp?.jobTitle !== ""
  );

  const education1 = await updateEducation(
    formData,
    "edcSchool1",
    "edcDiploma1",
    "edcDescription1"
  );
  const education2 = await updateEducation(
    formData,
    "edcSchool2",
    "edcDiploma2",
    "edcDescription2"
  );
  const education3 = await updateEducation(
    formData,
    "edcSchool3",
    "edcDiploma3",
    "edcDescription3"
  );

  const education = [education1, education2, education3].filter(
    (edc): edc is Education => edc !== null
  );

  const links: Links = {
    linkedin: formData.get("linkedin") as string,
    twitter: formData.get("twitter") as string,
    github: formData.get("github") as string,
    personnal: formData.get("personal") as string,
  };

  const selectVisibility = formData.get("visibility");
  const visibility = selectVisibility === "public";

  try {
    userFromDb.pdf = myPdf;
    userFromDb.experience = experience;
    userFromDb.education = education;
    userFromDb.links = links;
    userFromDb.visible = visibility;

    await userFromDb.save();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to save user profile"); // Or handle accordingly
  }

  revalidatePath("/my-account", "layout");

  redirect("/my-account");
};

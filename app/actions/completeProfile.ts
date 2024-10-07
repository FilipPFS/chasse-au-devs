"use server";

import cloudinary from "@/config/cloudinary";
import User, { Education, Experience, Links, UserSchema } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const uploadPdfToCloudinary = async (
  pdfFile: FormDataEntryValue | null
) => {
  if (pdfFile instanceof File && pdfFile.type === "application/pdf") {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfArray = Array.from(new Uint8Array(arrayBuffer));
    const pdfData = Buffer.from(pdfArray);
    const pdfBase64 = pdfData.toString("base64");

    try {
      const result = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${pdfBase64}`, // Correct MIME type for PDF
        {
          resource_type: "raw", // Ensure 'raw' is used for non-image files like PDFs
          folder: "chasse-au-devs",
          format: "pdf", // Add this to ensure Cloudinary recognizes it as a PDF
        }
      );

      return result.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } else {
    console.log("Invalid file or no file uploaded");
  }
};

export const createExperience = (
  formData: FormData,
  jobTitleKey: string,
  timeWorkedKey: string,
  typeWorkedKey: string,
  descriptionKey: string
): Experience | null => {
  const jobTitle = formData.get(jobTitleKey) as string;
  const timeWorked = formData.get(timeWorkedKey) as string;
  const typeWorked = formData.get(typeWorkedKey) as string;
  const quickDescription = formData.get(descriptionKey) as string;

  const yearsWorked = `${timeWorked} ${typeWorked}`;

  if (jobTitle || yearsWorked || quickDescription) {
    return {
      jobTitle,
      yearsWorked,
      quickDescription,
    };
  }

  return null;
};

const createEducation = (
  formData: FormData,
  schoolTitleKey: string,
  diplomaKey: string,
  descriptionKey: string
): Education | null => {
  const schoolName = formData.get(schoolTitleKey) as string;
  const diploma = formData.get(diplomaKey) as string;
  const quickDescription = formData.get(descriptionKey) as string;

  if (schoolName || diploma || quickDescription) {
    return {
      schoolName,
      diploma,
      quickDescription,
    };
  }

  return null;
};

export const completeProfile = async (formData: FormData): Promise<void> => {
  const sessionUser = await getSessionUser();
  const userFromDb: UserSchema | null = await User.findOne({
    email: sessionUser?.user.email,
  });

  if (!userFromDb) {
    throw new Error("No user found");
  }

  const pdfFile = formData.get("pdf");

  const pdf = await uploadPdfToCloudinary(pdfFile);

  const experience1 = await createExperience(
    formData,
    "expTitle",
    "exp_number",
    "exp_select",
    "expDescription"
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
    (exp): exp is Experience => exp?.jobTitle !== null
  );

  const education1 = createEducation(
    formData,
    "edcSchool",
    "edcDiploma",
    "edcDescription"
  );
  const education2 = createEducation(
    formData,
    "edcSchool2",
    "edcDiploma2",
    "edcDescription2"
  );
  const education3 = createEducation(
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

  const newUser = {
    pdf,
    experience,
    education,
    links,
    visibility,
  };

  console.log("NEW USER", newUser);

  try {
    userFromDb.pdf = pdf;
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

  redirect("/");
};

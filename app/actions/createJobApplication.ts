"use server";

import cloudinary from "@/config/cloudinary";
import connectToDb from "@/config/database";
import Application, { ApplicationSchema } from "@/models/Application";
import JobOffer from "@/models/JobOffer";
import { JobType } from "@/types/user";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  submitted: boolean;
};

const uploadPdfToCloudinary = async (pdfFile: FormDataEntryValue | null) => {
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

const createJobApplication = async (
  previousState: FormState,
  formData: FormData
): Promise<{ submitted: boolean }> => {
  await connectToDb();

  const sessionUser = await getSessionUser();
  const offerId = formData.get("offer_id");

  if (!offerId) {
    throw new Error("Cette offre n'existe pas.");
  }

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("L'id de l'utilisateur n'a pas été trouvé.");
  }

  const offer: JobType | null = await JobOffer.findById(offerId);

  const { userId } = sessionUser;

  const existingApplication = await Application.findOne({
    jobOffer: offerId,
    sender: userId,
  });

  if (existingApplication) {
    throw new Error("Vous avez déjà postulé à cette offre.");
  }

  const cvFile = formData.get("cv");
  const coverLetterFile = formData.get("coverLetter");

  const cv = await uploadPdfToCloudinary(cvFile);
  const coverLetter = await uploadPdfToCloudinary(coverLetterFile);

  const applicationObject = {
    jobOffer: offer?._id,
    jobCreator: offer?.owner,
    sender: userId,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    cv,
    coverLetter,
    status: "En attente de réponse",
  };

  const newApplication = new Application(applicationObject);
  await newApplication.save();

  revalidatePath("/", "layout");

  return {
    submitted: true,
  };
};

export default createJobApplication;

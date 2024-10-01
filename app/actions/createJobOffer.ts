"use server";

import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const addJobOffer = async (formData: FormData) => {
  await connectToDb();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId not found.");
  }

  const { userId } = sessionUser;

  const formSalary = formData.get("salary");
  const salarySelect = formData.get("salarySelect");
  const salaryMix = `${formSalary} / ${salarySelect}`;
  const schedulesString = formData.get("schedules") as string;
  const schedulesArray = schedulesString
    .split("/")
    .map((schedule) => schedule.trim());

  const technologiesString = formData.get("technologies") as string;
  const technologiesArray = technologiesString
    .split("/")
    .map((schedule) => schedule.trim());

  const benefitsString = formData.get("benefits") as string;
  const benefitsArray = benefitsString
    .split("/")
    .map((schedule) => schedule.trim());

  const expNumber = formData.get("exp_number");
  const expSelect = formData.get("exp_select");
  const experience = `${expNumber} ${expSelect}`;

  const jobOfferObject = {
    owner: userId,
    jobTitle: formData.get("jobTitle"),
    companyName: formData.get("companyName"),
    contract: formData.get("contract"),
    location: {
      city: formData.get("location.city"),
      postalCode: formData.get("location.zipcode"),
      country: formData.get("location.country"),
    },
    salary: salaryMix,
    jobTime: formData.get("jobTime"),
    schedules: schedulesArray,
    workingMethod: formData.get("workingMethod"),
    technologies: technologiesArray,
    experience,
    diploma: formData.get("diploma"),
    description: formData.get("description"),
    benefits: benefitsArray,
  };

  const newJobOffer = new JobOffer(jobOfferObject);
  await newJobOffer.save();

  revalidatePath("/", "layout");

  redirect("/");
};

export default addJobOffer;

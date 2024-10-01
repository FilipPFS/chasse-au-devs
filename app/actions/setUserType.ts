"use server";

import connectToDb from "@/config/database";
import User, { UserSchema } from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";

export const setUserType = async (formData: FormData) => {
  try {
    await connectToDb();

    const sessionUser = await getSessionUser();
    const userFromDb: UserSchema | null = await User.findOne({
      email: sessionUser?.user.email,
    });

    const userType = formData.get("userType");

    if (userFromDb && userType === "candidat") {
      userFromDb.employer = "candidat";
    } else if (userFromDb && userType === "recruteur") {
      userFromDb.employer = "employer";
    }

    await userFromDb?.save();

    console.log("Redirecting...");
  } catch (err) {
    console.error(err);
  }

  redirect("/");
};

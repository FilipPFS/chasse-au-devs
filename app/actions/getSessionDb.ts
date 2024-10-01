"use server";

import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const getSessionDb = async () => {
  try {
    const sessionUser = await getSessionUser();
    const userFromDb = await User.findOne({ email: sessionUser?.user.email });

    return userFromDb;
  } catch (err) {
    console.error(err);
  }
};

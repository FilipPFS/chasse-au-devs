"use server";

import User from "@/models/User";

export const getUserProfile = async (id: string) => {
  try {
    const userProfile = await User.findById(id);

    return userProfile;
  } catch (err) {
    console.error(err);
  }
};

import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import React from "react";
import { UserType } from "@/types/user";
import CreateJobButton from "@/components/CreateJobButton/CreateJobButton";
import styles from "./Jobs.module.css";

const Jobs = async () => {
  const sessionUser = await getSessionUser();

  const user: UserType | null = await User.findById(sessionUser?.userId);

  const userEmployer = user?.employer === "employer";

  return (
    <div className={styles.container}>
      <CreateJobButton userEmployer={userEmployer} />
    </div>
  );
};

export default Jobs;

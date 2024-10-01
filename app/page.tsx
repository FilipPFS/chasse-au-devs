import FormJobOffer from "@/components/FormJobOffer/FormJobOffer";
import JobCard from "@/components/JobCard/JobCard";
import connectToDb from "@/config/database";
import JobOffer, { IJob } from "@/models/JobOffer";
import React from "react";
import styles from "./page.module.css";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { UserType } from "@/types/user";
import { getSessionDb } from "./actions/getSessionDb";
import { redirect } from "next/navigation";

const Home = async () => {
  await connectToDb();

  const jobs = await JobOffer.find();
  const user: UserType | null = await getSessionDb();

  if (user && !user?.employer) {
    redirect("/question");
  }

  if (!jobs) {
    return <LoaderSpinner />;
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Les dernière offres d'emploi</h1>
      <div className={styles.jobContainer}>
        {jobs.map((job) => (
          <JobCard job={job} jobId={job._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

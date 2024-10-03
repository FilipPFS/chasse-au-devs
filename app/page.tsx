import JobCard from "@/components/JobCard/JobCard";
import JobOffer, { IJob } from "@/models/JobOffer";
import React from "react";
import styles from "./page.module.css";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { UserType } from "@/types/user";
import { getSessionDb } from "./actions/getSessionDb";
import { redirect } from "next/navigation";
import { getJobsHome } from "./actions/getJobs";

const Home = async () => {
  const jobs = await getJobsHome();
  const user: UserType | null = await getSessionDb();

  if (user && !user?.employer) {
    redirect("/question");
  }

  if (!jobs) {
    return <LoaderSpinner />;
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Les dernières offres d'emploi</h1>
      <div className={styles.jobContainer}>
        {jobs.map((job) => (
          <JobCard job={job} jobId={job._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

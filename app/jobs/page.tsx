import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import React from "react";
import { JobType, UserType } from "@/types/user";
import CreateJobButton from "@/components/CreateJobButton/CreateJobButton";
import styles from "./Jobs.module.css";
import { getSessionDb } from "../actions/getSessionDb";
import { getJobsOffer } from "../actions/getJobs";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import JobCard from "@/components/JobCard/JobCard";
import { IJob } from "@/models/JobOffer";

const Jobs = async () => {
  const user: UserType | null = await getSessionDb();
  const userEmployer = user?.employer === "employer";
  const jobs: JobType[] | undefined = await getJobsOffer();

  return (
    <div className={styles.container}>
      <CreateJobButton userEmployer={userEmployer} />
      <div className={styles.titleContainer}>
        <h1>Les meilleurs offres d'emploi</h1>
      </div>
      <div className={styles.jobContainer}>
        {jobs.map((job) => (
          <JobCard job={job} jobId={job._id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;

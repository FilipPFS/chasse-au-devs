import React from "react";
import styles from "./Apply.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { JobType, UserType } from "@/types/user";
import { getJobById } from "@/app/actions/getJobById";
import { getSessionDb } from "@/app/actions/getSessionDb";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm/ApplicationForm";

type Props = {};

const ApplyPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const job: JobType = await getJobById(params.id);
  const user: UserType | null = await getSessionDb();

  if (user?.employer === "employer") {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <ApplicationForm params={params.id} />
        <section className={styles.applyBlock}>
          <h2>{job.jobTitle}</h2>
          <div className={styles.smallTags}>
            <small>{job.contract}</small>
            <small>·</small>
            <small>{job.jobTime}</small>
            <small>·</small>
            <small className={styles.smallLocation}>
              <FaLocationDot /> {job.location.city} {job.location.postalCode}
            </small>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApplyPage;

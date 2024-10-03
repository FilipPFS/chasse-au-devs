"use client";

import { type IJob } from "@/models/JobOffer";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import styles from "./JobCard.module.css";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type Props = {
  job: IJob;
  jobId: string;
};

const JobCard = ({ job, jobId }: Props) => {
  const router = useRouter();

  const formatDateToNow = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
  };

  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/jobs/${jobId}`)}
    >
      <section className={styles.jobInfos}>
        <small>{job.companyName}</small>
        <h2>{job.jobTitle}</h2>
        <small className={styles.location}>
          <FaLocationDot />
          {`${job.location.city} · ${job.location.postalCode}`}
        </small>
        <div className={styles.tags}>
          <span className={styles.tag}>{job.contract}</span>
          <span className={styles.tag}>{job.salary}</span>
          <span className={styles.tag}>{job.jobTime}</span>
        </div>
        <small>Publié {formatDateToNow(job.createdAt!)}</small>
      </section>
      <Link className={styles.link} href={`/jobs/${jobId}`}>
        Voir l'offre
      </Link>
    </div>
  );
};

export default JobCard;

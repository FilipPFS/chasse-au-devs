import Link from "next/link";
import React from "react";
import { FaCheck, FaClock, FaLocationDot, FaXmark } from "react-icons/fa6";
import styles from "./JobCard.module.css";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { JobCardType } from "@/types/user";

type Props = {
  job: JobCardType;
  jobId: string;
  status?: "Accepté" | "Rejetée" | "En attente de réponse";
};

const JobCard = ({ job, jobId, status }: Props) => {
  const formatDateToNow = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
  };

  return (
    <div className={styles.container}>
      <Link href={`/jobs/${jobId}`} className={styles.containerLink}>
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
        <button className={styles.link}>Voir l'offre</button>
      </Link>
      {status && status === "En attente de réponse" ? (
        <span className={`${styles.status} ${styles.statusPending}`}>
          <FaClock /> {status}
        </span>
      ) : null}
      {status && status === "Rejetée" ? (
        <span className={`${styles.status} ${styles.statusRejected}`}>
          <FaXmark /> {status}
        </span>
      ) : null}
      {status && status === "Accepté" ? (
        <span className={`${styles.status} ${styles.statusAccepted}`}>
          <FaCheck /> {status}
        </span>
      ) : null}
    </div>
  );
};

export default JobCard;

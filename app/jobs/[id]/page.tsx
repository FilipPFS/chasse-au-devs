import { getJobById } from "@/app/actions/getJobById";
import { JobType, UserType } from "@/types/user";
import Link from "next/link";
import React from "react";
import styles from "./JobPage.module.css";
import {
  FaCircleCheck,
  FaLocationDot,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { FaCheck, FaExclamation, FaLightbulb } from "react-icons/fa";
import { getSessionDb } from "@/app/actions/getSessionDb";
import { getExistingApplication } from "@/app/actions/getExistingApplication";

type Props = {};

const JobPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const user: UserType | null = await getSessionDb();
  const job: JobType = await getJobById(params.id);
  const application = await getExistingApplication(params.id);

  if (!job) {
    return <h1>L'offre pour cet emploi n'a pas été trouvé.</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <section className={styles.content}>
          <div className={styles.header}>
            <h3>{job.companyName}</h3>
            <h1 className={styles.title}>{job.jobTitle}</h1>
            <div>
              <p className={styles.pTags}>
                {job.contract}
                <span className={styles.dot}> · </span>
                {job.jobTime}
                <span className={styles.dot}> · </span>
                <span className={styles.pLocation}>
                  <FaLocationDot /> {job.location.city}{" "}
                  {job.location.postalCode}
                </span>
              </p>
            </div>
            <div className={styles.line}></div>
            <div>
              <h2>
                <FaLightbulb /> Vos comptétences
              </h2>
              <div className={styles.techBlock}>
                {job.technologies.map((tech) => (
                  <p className={styles.tech}>
                    {" "}
                    <FaCheck /> {tech}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.details}>
            <h2>Détails sur l'offre</h2>
            <div className={styles.detailContainer}>
              <h3>Salaire</h3>
              <p className={styles.techInfo}>
                <FaRegCircleCheck /> {job.salary}
              </p>
            </div>
            <div className={styles.detailContainer}>
              <h3>Horaires</h3>
              {job.schedules.map((schedule) => (
                <p className={styles.techInfo}>
                  <FaRegCircleCheck /> {schedule}
                </p>
              ))}
            </div>
            <div className={styles.detailContainer}>
              <h3>Méthode de travail</h3>
              <p className={styles.techInfo}>
                <FaRegCircleCheck /> {job.workingMethod}
              </p>
            </div>
            <div className={styles.detailContainer}>
              <h3>Expérience recherché</h3>
              <p className={styles.techInfo}>
                <FaRegCircleCheck /> {job.experience}
              </p>
            </div>
            <div className={styles.detailContainer}>
              <h3>Diplôme rechrché</h3>
              <p className={styles.techInfo}>
                <FaRegCircleCheck /> {job.diploma}
              </p>
            </div>
          </div>
          <div className={styles.line}></div>
          <div>
            <h2>Description</h2>
            <p className={styles.jobDescription}>{job.description}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.detailContainer}>
            <h2>Avantages</h2>
            {job.benefits.map((benefit) => (
              <p className={styles.techInfo}>
                <FaRegCircleCheck /> {benefit}
              </p>
            ))}
          </div>
          <div className={styles.line}></div>
          {user?.employer === "employer" ? (
            <button disabled className={styles.applyBtnMain}>
              Vous êtes un recruteur
            </button>
          ) : (
            <>
              {application ? (
                <button disabled className={styles.applyBtnMain}>
                  Vous avez déjà postulé
                </button>
              ) : (
                <Link href={`/jobs/${job._id}/apply`}>
                  <button className={styles.applyBtnMain}>Postuler</button>
                </Link>
              )}
            </>
          )}
        </section>
        <section></section>
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
          {user?.employer === "employer" ? (
            <button disabled className={styles.applyBtnMain}>
              Vous êtes un recruteur
            </button>
          ) : (
            <>
              {application ? (
                <button disabled className={styles.applyBtnMain}>
                  Vous avez déjà postulé
                </button>
              ) : (
                <Link href={`/jobs/${job._id}/apply`}>
                  <button className={styles.applyBtnMain}>Postuler</button>
                </Link>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default JobPage;

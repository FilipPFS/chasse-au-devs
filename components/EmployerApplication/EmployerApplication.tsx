import Link from "next/link";
import styles from "./EmployerApplication.module.css";
import {
  FaEnvelope,
  FaPerson,
  FaPhone,
  FaUser,
  FaXmark,
} from "react-icons/fa6";
import { FaCheck, FaClock, FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import StatusForm from "../StatusForm/StatusForm";

type Props = {
  applicationId: string;
  jobTitle: string;
  jobCompany: string;
  jobId: string;
  applicationFirstName: string;
  applicationLastName: string;
  applicationEmail: string;
  applicationPhone: string;
  applicationCv: string;
  applicationCoverLetter: string;
  applicationStatus: "Accepté" | "Rejetée" | "En attente de réponse";
  senderUsername: string;
  senderImage: string;
  senderId: string;
};

const EmployerApplication = ({
  applicationId,
  jobTitle,
  jobCompany,
  jobId,
  applicationFirstName,
  applicationLastName,
  applicationEmail,
  applicationPhone,
  applicationCv,
  applicationCoverLetter,
  applicationStatus,
  senderUsername,
  senderImage,
  senderId,
}: Props) => {
  return (
    <div className={styles.container}>
      <section className={styles.sectionBlock}>
        <h2>Offre</h2>
        <div className={styles.offerContainer}>
          <div className={styles.titleDetails}>
            <h2>{jobTitle}</h2>
            <small>{jobCompany}</small>
          </div>
          <Link href={`/jobs/${jobId}`} className={styles.offerLink}>
            Voir l'offre
          </Link>
        </div>
      </section>
      <div className={styles.line}></div>
      <section className={styles.sectionBlock}>
        <h2>Elèments recues</h2>
        <div className={styles.applicationDetailBlock}>
          <h3>Les informations</h3>
          <div className={styles.applicationDetail}>
            <span className={styles.singleApplicationDetail}>
              <FaUser /> Prénom: {applicationFirstName}
            </span>
            <span className={styles.singleApplicationDetail}>
              <FaUser /> Nom: {applicationLastName}
            </span>
            <span className={styles.singleApplicationDetail}>
              <FaEnvelope /> Email: {applicationEmail}
            </span>
            <span className={styles.singleApplicationDetail}>
              <FaPhone /> Téléphone: {applicationPhone}
            </span>
          </div>
        </div>
        <div className={styles.applicationDetailBlock}>
          <h3>Les pièces jointes</h3>
          <div className={styles.applicationDetail}>
            <a
              className={styles.singleApplicationDetail}
              href={applicationCv}
              target="_blank"
            >
              <FaFilePdf /> CV
            </a>
            <a
              className={styles.singleApplicationDetail}
              href={applicationCoverLetter}
              target="_blank"
            >
              <FaFilePdf /> Lettre de motivation
            </a>
          </div>
        </div>
      </section>
      <div className={styles.line}></div>
      <section className={styles.sectionBlock}>
        <h2>Compte de l'utilisateur</h2>
        <Link href={`/profile/${senderId}`} className={styles.userLink}>
          <Image src={senderImage} width={50} height={50} alt="user avatar" />
          <h3>{senderUsername}</h3>
        </Link>
      </section>
      <section className={styles.sectionBlock}>
        <h2>Status de la candidature</h2>
        {applicationStatus && applicationStatus === "En attente de réponse" ? (
          <div className={styles.changeStatus}>
            <span className={`${styles.status} ${styles.statusPending}`}>
              <FaClock /> {applicationStatus}
            </span>
            <StatusForm applicationId={applicationId} />
          </div>
        ) : null}
        {applicationStatus && applicationStatus === "Rejetée" ? (
          <span className={`${styles.status} ${styles.statusRejected}`}>
            <FaXmark /> {applicationStatus}
          </span>
        ) : null}
        {applicationStatus && applicationStatus === "Accepté" ? (
          <span className={`${styles.status} ${styles.statusAccepted}`}>
            <FaCheck /> {applicationStatus}
          </span>
        ) : null}
      </section>
    </div>
  );
};

export default EmployerApplication;

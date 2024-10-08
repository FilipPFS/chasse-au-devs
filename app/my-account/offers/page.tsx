import { getEmployerOffers } from "@/app/actions/getEmployerOffers";
import { getSessionDb } from "@/app/actions/getSessionDb";
import JobCard from "@/components/JobCard/JobCard";
import { JobType, UserType } from "@/types/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./DashboardOffers.module.css";
import { FaEye, FaTrash, FaXmark } from "react-icons/fa6";
import { deleteJobOffer } from "@/app/actions/deleteJobOffer";
import DeleteConfirm from "@/components/DeleteConfirm/DeleteConfirm";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";

export const dynamic = "force-dynamic";

const DasboardOffers = async () => {
  const user: UserType = await getSessionDb();
  if (user.employer !== "employer") {
    redirect("/");
  }

  const jobOffers: JobType[] | undefined = await getEmployerOffers();

  if (!jobOffers) {
    <LoaderSpinner />;
  }

  if (jobOffers?.length === 0) {
    <div className={styles.zeroApplications}>
      <span>
        <FaXmark />
      </span>
      Aucune offre n'a crée recu pour le moment.
    </div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mes offres d'emploi</h1>
      <div className={styles.jobOffers}>
        {jobOffers?.map(async (jobOffer) => (
          <div className={styles.singleOffer}>
            <JobCard job={jobOffer} jobId={jobOffer._id} />
            <div className={styles.singleOfferButtons}>
              <Link href={`/my-account/offers/${jobOffer._id}`}>
                <FaEye /> Voir les candidatures
              </Link>
              <DeleteConfirm jobId={jobOffer._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DasboardOffers;

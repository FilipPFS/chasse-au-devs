import { getEmployerOffers } from "@/app/actions/getEmployerOffers";
import { getSessionDb } from "@/app/actions/getSessionDb";
import JobCard from "@/components/JobCard/JobCard";
import { JobType, UserType } from "@/types/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./DashboardOffers.module.css";
import { FaEye, FaTrash } from "react-icons/fa6";
import { deleteJobOffer } from "@/app/actions/deleteJobOffer";

const DasboardOffers = async () => {
  const user: UserType = await getSessionDb();
  if (user.employer !== "employer") {
    redirect("/");
  }

  const jobOffers: JobType[] | undefined = await getEmployerOffers();

  return (
    <div className={styles.container}>
      <h1>Mes offres d'emploi</h1>
      <div className={styles.jobOffers}>
        {jobOffers?.map(async (jobOffer) => (
          <div className={styles.singleOffer}>
            <JobCard job={jobOffer} jobId={jobOffer._id} />
            <div className={styles.singleOfferButtons}>
              <Link href={`/my-account/offers/${jobOffer._id}`}>
                <FaEye /> Voir les candidatures
              </Link>
              <form action={deleteJobOffer}>
                <input type="hidden" name="jobOfferId" value={jobOffer._id} />
                <button type="submit">
                  <FaTrash /> Supprimer l'offre
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DasboardOffers;

import { getApplicationsByOffer } from "@/app/actions/getApplicationsByOffer";
import EmployerApplication from "@/components/EmployerApplication/EmployerApplication";
import { EmployerApplicationType } from "@/types/user";
import React from "react";
import styles from "./DashboardApplications.module.css";
import { FaXmark } from "react-icons/fa6";

export const dynamic = "force-dynamic";

type Props = {};

const DashboardApplications = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const applications: EmployerApplicationType[] | undefined =
    await getApplicationsByOffer(id);

  if (applications?.length === 0) {
    return (
      <div className={styles.noContainer}>
        <h2 className={styles.info}>
          <FaXmark /> Aucun candidature n'a été recu pour cette offre.
        </h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Les candidatures pour cette offre</h1>
      <div className={styles.applications}>
        {applications?.map((application) => (
          <EmployerApplication
            applicationId={application._id}
            jobTitle={application.jobOffer.jobTitle}
            jobCompany={application.jobOffer.companyName}
            jobId={application.jobOffer._id}
            applicationFirstName={application.firstName}
            applicationLastName={application.lastName}
            applicationEmail={application.email}
            applicationPhone={application.phone}
            applicationCv={application.cv}
            applicationCoverLetter={application.coverLetter}
            applicationStatus={application.status}
            senderUsername={application.sender.username}
            senderImage={application.sender.image!}
            senderId={application.sender._id}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardApplications;

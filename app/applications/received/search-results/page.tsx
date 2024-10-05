import connectToDb from "@/config/database";
import React from "react";
import { getSessionDb } from "@/app/actions/getSessionDb";
import Application from "@/models/Application";
import FilterApplication from "@/components/FilterApplication/FilterApplication";
import EmployerApplication from "@/components/EmployerApplication/EmployerApplication";
import styles from "../ApplicationsReceived.module.css";
import { EmployerApplicationType } from "@/types/user";

const SearchPage = async ({
  searchParams: { status },
}: {
  searchParams: {
    status: string;
  };
}) => {
  await connectToDb();
  const user = await getSessionDb();

  const typePattern = new RegExp(status, "i");

  const query = {
    status: typePattern,
    jobCreator: user._id,
  };

  const applicationsQueryResults = (await Application.find(query)
    .populate({
      path: "jobOffer",
      select: "companyName jobTitle",
    })
    .populate({
      path: "sender",
      select: "username image",
    })
    .lean()) as EmployerApplicationType[];

  console.log("APPLICATION QUERY", applicationsQueryResults);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Candidatures recues suite à vos offres</h1>
        <FilterApplication />
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.search}>
          Les résultats de recherche pour{" "}
          <span className={styles.keyWord}>{status && status}</span>
        </span>
        <section className={styles.applications}>
          {applicationsQueryResults?.map((application) => (
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
        </section>
      </div>
    </div>
  );
};

export default SearchPage;

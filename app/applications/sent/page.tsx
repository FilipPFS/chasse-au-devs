import { UserApplication } from "@/types/user";
import styles from "./ApplicationsSent.module.css";
import Link from "next/link";
import JobCard from "@/components/JobCard/JobCard";
import { getUserApplications } from "@/app/actions/getUserApplications";

type Props = {};

const Applications = async (props: Props) => {
  const myApplications: UserApplication[] | undefined =
    await getUserApplications();

  if (!myApplications) {
    return (
      <div>
        Vous n'avez toujours pas envoyé de candidatures.
        <Link href={"/jobs"}> Voir les offres</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Vos candidatures</h1>
      <div className={styles.applications}>
        {myApplications.map((application) => (
          <JobCard
            job={application.jobOffer}
            jobId={application.jobOffer._id}
            status={application.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Applications;

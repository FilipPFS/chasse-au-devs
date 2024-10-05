import JobCard from "@/components/JobCard/JobCard";
import SearchForm from "@/components/SearchForm/SearchForm";
import connectToDb from "@/config/database";
import JobOffer from "@/models/JobOffer";
import styles from "./SearchResults.module.css";
import React from "react";

const SearchPage = async ({
  searchParams: { technology, contract },
}: {
  searchParams: {
    technology: string;
    contract: string;
  };
}) => {
  await connectToDb();

  const jobPattern = new RegExp(technology, "i");

  let query: Record<string, unknown> = {
    $or: [
      { jobTitle: jobPattern },
      { description: jobPattern },
      { technologies: { $elemMatch: { $regex: jobPattern } } }, // Check if technologies array includes technology (case-insensitive)
    ],
  };

  if (contract && contract !== "Tous") {
    const typePattern = new RegExp(contract, "i");
    query = {
      $and: [query, { contract: typePattern }],
    };
  }

  const jobsQueryResults = await JobOffer.find(query).lean();

  return (
    <div className={styles.container}>
      <SearchForm />
      <div className={styles.contentContainer}>
        <span className={styles.search}>
          Les résultats de recherche pour{" "}
          <span className={styles.keyWord}>{technology && technology}</span>{" "}
          <span className={styles.keyWord}>{contract && contract}</span>
        </span>
        <div className={styles.jobCardContainer}>
          {jobsQueryResults.map((job) => (
            <JobCard job={job} jobId={job._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

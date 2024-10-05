"use client";

import { useState } from "react";
import styles from "./SearchForm.module.css";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const [contract, setContract] = useState("");
  const [technology, setTechnology] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (technology === "" && contract === "Tous") {
      router.push("/jobs");
    } else {
      const query = `?technology=${technology}&contract=${contract}`;
      router.push(`/jobs/search-results${query}`);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Rechercher une offre"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        />
      </div>
      <div>
        <select value={contract} onChange={(e) => setContract(e.target.value)}>
          <option value="Tous">Tous</option>
          <option value="Alternance">Alternance</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Intérim">Intérim</option>
          <option value="Stage">Stage</option>
          <option value="Freelance">Freelance</option>
          <option value="Associé">Associé</option>
        </select>
      </div>
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchForm;

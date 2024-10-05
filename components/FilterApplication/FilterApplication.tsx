"use client";

import { useState } from "react";
import styles from "./FilterApplication.module.css";
import { useRouter } from "next/navigation";

const FilterApplication = () => {
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = `?status=${status}`;
    router.push(`/applications/received/search-results${query}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="En attente de réponse">En attente de réponse</option>
          <option value="Accepté">Accepté</option>
          <option value="Rejetée">Rejetée</option>
        </select>
      </div>
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default FilterApplication;

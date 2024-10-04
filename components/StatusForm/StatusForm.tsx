"use client";

import { useState } from "react";
import styles from "./StatusForm.module.css";
import { FaPenToSquare, FaTriangleExclamation } from "react-icons/fa6";
import { changeApplicationStatus } from "@/app/actions/changeApplicationStatus";

type Props = {
  applicationId: string;
};

const StatusForm = ({ applicationId }: Props) => {
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState("En attente de réponse");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <button
        onClick={() => setClicked((prev) => !prev)}
        className={styles.editBtn}
      >
        <FaPenToSquare />
        Modifier
      </button>
      {clicked && (
        <form className={styles.form} action={changeApplicationStatus}>
          <input
            type="hidden"
            name="applicationId"
            defaultValue={applicationId}
          />
          <span className={styles.danger}>
            <FaTriangleExclamation />
            Si vous modifiez le statut de la candidature, vous ne pourrez plus
            le faire.
          </span>
          <div className={styles.statusChange}>
            <label>Statut actuel</label>
            <select name="status" onChange={handleChange}>
              <option value="En attente de réponse">
                En attente de réponse
              </option>
              <option value="Accepté">Accepté</option>
              <option value="Rejetée">Rejetée</option>
            </select>
            {(status === "Accepté" || status === "Rejetée") && (
              <button type="submit">Modifer</button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default StatusForm;

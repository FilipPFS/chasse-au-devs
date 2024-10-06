"use client";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./DeleteConfirm.module.css";
import { deleteJobOffer } from "@/app/actions/deleteJobOffer";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  jobId: string;
};

const DeleteConfirm = ({ jobId }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const [state, formAction] = useFormState(deleteJobOffer, {
    submitted: false,
  });

  useEffect(() => {
    if (state.submitted) {
      toast.success("Votre offre a été supprimé.");
      redirect("/");
    }
  }, [state]);

  return (
    <>
      {openModal && (
        <div
          className={styles.overlay}
          onClick={() => setOpenModal(false)}
        ></div>
      )}
      <button className={styles.trashButton} onClick={() => setOpenModal(true)}>
        <FaTrash /> Supprimer l'offre
      </button>
      {openModal && (
        <div className={styles.modal}>
          <form action={formAction} className={styles.form}>
            <input type="hidden" name="jobOfferId" value={jobId} />
            <label>Etes-vous sûr de vouloir cette offre d'emploi?</label>
            <div className={styles.buttons}>
              <button className={styles.singleButton} type="submit">
                Oui
              </button>
              <span
                className={styles.singleButton}
                onClick={() => setOpenModal(false)}
              >
                Non
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default DeleteConfirm;

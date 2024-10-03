"use client";

import styles from "./ApplicationForm.module.css";
import PdfUploader from "../PdfUploader/PdfUploader";
import createJobApplication from "@/app/actions/createJobApplication";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

type Props = {
  params: string;
};

const ApplicationForm = ({ params }: Props) => {
  const [state, formAction] = useFormState(createJobApplication, {
    submitted: false,
  });

  useEffect(() => {
    if (state.submitted) {
      toast.success("Votre candidature a été envoyé.");
      redirect("/");
    }
  }, [state]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="offer_id" defaultValue={params} />
      <div className={styles.nameBlock}>
        <div className={styles.labelBlock}>
          <label>Prénom</label>
          <input type="text" name="firstName" placeholder="Ex: Filip" />
        </div>
        <div className={styles.labelBlock}>
          <label>Nom</label>
          <input type="text" name="lastName" placeholder="Ex: Petrovic" />
        </div>
      </div>
      <div className={styles.contactBlock}>
        <div className={styles.labelBlock}>
          <label>Email</label>
          <input type="text" name="email" placeholder="Ex: example@gmail.com" />
        </div>
        <div className={styles.labelBlock}>
          <label>Téléphone</label>
          <input type="text" name="phone" placeholder="Ex: 07 60 50 40 30" />
        </div>
      </div>
      <div className={styles.fileBlock}>
        <PdfUploader name="cv" type={"CV"} />
        <PdfUploader name="coverLetter" type={"Lettre de motivation"} />
      </div>
      <button className={styles.applyBtn}>Postuler</button>
    </form>
  );
};

export default ApplicationForm;

import React from "react";
import "./CompleteAccount.module.css";
import { getSessionDb } from "@/app/actions/getSessionDb";
import { UserType } from "@/types/user";
import ExperienceForm from "@/components/ExperienceForm/ExperienceForm";
import { updateProfile } from "@/app/actions/updateProfile";
import EducationForm from "@/components/EducationForm/EducationForm";
import SocialMediaForm from "@/components/SocialMediaForm/SocialMediaForm";
import styles from "./CompleteAccount.module.css";
import { FaExclamation, FaEye } from "react-icons/fa6";
import PdfUploader from "@/components/PdfUploader/PdfUploader";

export const dynamic = "force-dynamic";

type Props = {};

const CompleteAccount = async (props: Props) => {
  const user: UserType = await getSessionDb();

  if (!user) {
    throw new Error("Utilisatuer non trouvé.");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Completer votre profil</h1>
      <form action={updateProfile} className={styles.form}>
        <span className={styles.info}>
          <FaExclamation /> Veuillez mettre les expériences et les formations
          les plus récentes à gauche.
        </span>
        <ExperienceForm experience={user.experience} />
        <EducationForm education={user.education} />
        <div className={styles.socialsBlock}>
          <h2>Réseaux sociaux & Visibilité & CV</h2>
          <SocialMediaForm links={user.links} />
          <section className={styles.visibilityBlock}>
            <h3>Visibilité</h3>
            <div className={styles.visibilityLabel}>
              <label>Rendre mon profil visible (Recommandé)</label>
              <select name="visibility">
                <option value={"public"}>Oui</option>
                <option value={"private"}>Non</option>
              </select>
            </div>
          </section>
          <section className={styles.cvBlock}>
            <h3>Remplacer mon CV</h3>
            <a href={user.pdf} target="_blank" className={styles.defaultCv}>
              <FaEye /> CV Actuel
            </a>
            <PdfUploader name="pdf" type="CV" />
          </section>
          <button className={styles.submitButton} type="submit">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteAccount;

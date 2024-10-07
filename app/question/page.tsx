import React from "react";
import { getSessionDb } from "../actions/getSessionDb";
import { UserType } from "@/types/user";
import { setUserType } from "../actions/setUserType";
import { redirect } from "next/navigation";
import styles from "./Question.module.css";

export const dynamic = "force-dynamic";

type Props = {};

const Question = async (props: Props) => {
  const user: UserType | null = await getSessionDb();

  return (
    <div>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        {!user?.employer ? (
          <form action={setUserType} className={styles.form}>
            <div className={styles.selectContainer}>
              <label>Vous êtes un</label>
              <select name="userType" required>
                <option value={"candidat"}>Candidat</option>
                <option value={"recruteur"}>Recruteur</option>
              </select>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        ) : (
          <>{redirect("/")}</>
        )}
      </div>
    </div>
  );
};

export default Question;

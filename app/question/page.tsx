import React from "react";
import { getSessionDb } from "../actions/getSessionDb";
import { UserType } from "@/types/user";
import { setUserType } from "../actions/setUserType";
import { redirect } from "next/navigation";

type Props = {};

const Question = async (props: Props) => {
  const user: UserType | null = await getSessionDb();

  return (
    <div>
      {!user?.employer ? (
        <form action={setUserType}>
          <label>Vous êtes un</label>
          <select name="userType" required>
            <option value={"candidat"}>Candidat</option>
            <option value={"recruteur"}>Recruteur</option>
          </select>
          <button type="submit">Envoyer</button>
        </form>
      ) : (
        <>{redirect("/")}</>
      )}
    </div>
  );
};

export default Question;

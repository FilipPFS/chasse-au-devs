"use client";

import { useState } from "react";
import CompleteProfile from "../CompleteProfile/CompleteProfile";
import { UserType } from "@/types/user";
import styles from "./CompleteProfileButton.module.css";

type Props = {
  user: UserType | null;
};

const CompleteProfileButton = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Completer votre profil
      </button>
      {isOpen && (
        <CompleteProfile isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      )}
    </>
  );
};

export default CompleteProfileButton;

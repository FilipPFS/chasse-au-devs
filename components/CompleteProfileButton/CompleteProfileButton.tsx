"use client";

import { useState } from "react";
import CompleteProfile from "../CompleteProfile/CompleteProfile";
import { UserType } from "@/types/user";
import styles from "./CompleteProfileButton.module.css";

const CompleteProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Completer votre profil
      </button>
      {isOpen && <CompleteProfile isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default CompleteProfileButton;

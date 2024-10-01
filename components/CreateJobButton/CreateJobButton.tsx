"use client";

import { useState } from "react";
import FormJobOffer from "../FormJobOffer/FormJobOffer";
import styles from "./CreateJobButton.module.css";

type Props = {
  userEmployer: boolean;
};

const CreateJobButton = ({ userEmployer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {userEmployer && (
        <>
          <button className={styles.button} onClick={() => setIsOpen(true)}>
            Créer votre offre
          </button>
          {isOpen && <FormJobOffer isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
      )}
    </>
  );
};

export default CreateJobButton;

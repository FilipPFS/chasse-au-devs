import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CompleteProfile.module.css";
import { UserType } from "@/types/user";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: UserType | null;
};

const CompleteProfile = ({ isOpen, setIsOpen, user }: Props) => {
  const [counter, setCounter] = useState(0);
  const [secondCounter, setSecondCoutner] = useState(0);

  console.log(counter);

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}
      <div className={styles.modal}>
        <form className={styles.form}>
          <h2>Completer votre profil</h2>
          <section className={styles.formSection}>
            <h4>Expérience professionnelle</h4>
            <div className={styles.formBlock}>
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Ex: Développeur Full Stack"
              />
              <label>Années travaillés</label>
              <input type="number" name="jobTitle" />
              <label>Description</label>
              <textarea name="jobTitle" placeholder="Tâches et missions..." />
            </div>
          </section>
          {counter > 0 && (
            <section className={styles.formSection}>
              <div className={styles.formBlock}>
                <label>Nom de l'entreprise</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Ex: Développeur Full Stack"
                />
                <label>Années travaillés</label>
                <input type="number" name="jobTitle" />
                <label>Description</label>
                <textarea name="jobTitle" placeholder="Tâches et missions..." />
              </div>
            </section>
          )}
          {counter > 1 && (
            <section className={styles.formSection}>
              <div className={styles.formBlock}>
                <label>Nom de l'entreprise</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Ex: Développeur Full Stack"
                />
                <label>Années travaillés</label>
                <input type="number" name="jobTitle" />
                <label>Description</label>
                <textarea name="jobTitle" placeholder="Tâches et missions..." />
              </div>
            </section>
          )}
          {counter < 2 && (
            <div onClick={() => setCounter((prev) => prev + 1)}>
              Ajouter une expérience
            </div>
          )}
          <section className={styles.formSection}>
            <h4>Education & Formation</h4>
            <div className={styles.formBlock}>
              <label>Nom de l'établissement</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Ex: Sorbonne Université"
              />
              <label>Diplôme obtenu</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Ex: Licence Développeur Web"
              />
              <label>Description</label>
              <textarea name="jobTitle" placeholder="Tâches et missions..." />
            </div>
          </section>
          {secondCounter > 0 && (
            <section className={styles.formSection}>
              <h4>Education & Formation</h4>
              <div className={styles.formBlock}>
                <label>Nom de l'établissement</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Ex: Sorbonne Université"
                />
                <label>Diplôme obtenu</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Ex: Licence Développeur Web"
                />
                <label>Description</label>
                <textarea name="jobTitle" placeholder="Tâches et missions..." />
              </div>
            </section>
          )}
          {secondCounter > 1 && (
            <section className={styles.formSection}>
              <h4>Education & Formation</h4>
              <div className={styles.formBlock}>
                <label>Nom de l'établissement</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Ex: Sorbonne Université"
                />
                <label>Diplôme obtenu</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="Ex: Licence Développeur Web"
                />
                <label>Description</label>
                <textarea name="jobTitle" placeholder="Tâches et missions..." />
              </div>
            </section>
          )}
          {secondCounter < 2 && (
            <div onClick={() => setSecondCoutner((prev) => prev + 1)}>
              Ajouter formation
            </div>
          )}
          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;

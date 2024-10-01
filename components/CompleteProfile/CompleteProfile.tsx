import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CompleteProfile.module.css";
import { UserType } from "@/types/user";
import { FaPlus } from "react-icons/fa";
import { completeProfile } from "@/app/actions/completeProfile";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CompleteProfile = ({ isOpen, setIsOpen }: Props) => {
  const [counter, setCounter] = useState(0);
  const [secondCounter, setSecondCoutner] = useState(0);

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}
      <div className={styles.modal}>
        <form action={completeProfile} className={styles.form}>
          <h2>Completer votre profil</h2>
          <section className={styles.formSection}>
            <h4>CV</h4>
            <div className={styles.formBlock}>
              <label>Ajouter mon CV</label>
              <input type="file" name="pdf" accept="application/pdf" />
            </div>
          </section>
          <section className={styles.formSection}>
            <h4>Expérience professionnelle</h4>
            <div className={styles.formBlock}>
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                name="expTitle"
                placeholder="Ex: Développeur Full Stack"
              />
              <label>Années travaillés</label>
              <input type="number" name="expYears" />
              <label>Description</label>
              <textarea
                name="expDescription"
                placeholder="Tâches et missions..."
              />
            </div>
          </section>
          {counter > 0 && (
            <section className={styles.formSection}>
              <div className={styles.formBlock}>
                <label>Nom de l'entreprise</label>
                <input
                  type="text"
                  name="expTitle2"
                  placeholder="Ex: Développeur Full Stack"
                />
                <label>Années travaillés</label>
                <input type="number" name="expYears2" />
                <label>Description</label>
                <textarea
                  name="expDescription2"
                  placeholder="Tâches et missions..."
                />
              </div>
            </section>
          )}
          {counter > 1 && (
            <section className={styles.formSection}>
              <div className={styles.formBlock}>
                <label>Nom de l'entreprise</label>
                <input
                  type="text"
                  name="expTitle3"
                  placeholder="Ex: Développeur Full Stack"
                />
                <label>Années travaillés</label>
                <input type="number" name="expYears3" />
                <label>Description</label>
                <textarea
                  name="expDescription3"
                  placeholder="Tâches et missions..."
                />
              </div>
            </section>
          )}
          {counter < 2 && (
            <div
              onClick={() => setCounter((prev) => prev + 1)}
              className={styles.addBtn}
            >
              <FaPlus />
              Ajouter une expérience
            </div>
          )}
          <section className={styles.formSection}>
            <h4>Formation</h4>
            <div className={styles.formBlock}>
              <label>Nom de l'établissement</label>
              <input
                type="text"
                name="edcSchool"
                placeholder="Ex: Sorbonne Université"
              />
              <label>Diplôme obtenu</label>
              <input
                type="text"
                name="edcDiploma"
                placeholder="Ex: Licence Développeur Web"
              />
              <label>Description</label>
              <textarea
                name="edcDescription"
                placeholder="Tâches et missions..."
              />
            </div>
          </section>
          {secondCounter > 0 && (
            <section className={styles.formSection}>
              <h4>Education & Formation</h4>
              <div className={styles.formBlock}>
                <label>Nom de l'établissement</label>
                <input
                  type="text"
                  name="edcSchool2"
                  placeholder="Ex: Sorbonne Université"
                />
                <label>Diplôme obtenu</label>
                <input
                  type="text"
                  name="edcDiploma2"
                  placeholder="Ex: Licence Développeur Web"
                />
                <label>Description</label>
                <textarea
                  name="edcDescription2"
                  placeholder="Tâches et missions..."
                />
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
                  name="edcSchool3"
                  placeholder="Ex: Sorbonne Université"
                />
                <label>Diplôme obtenu</label>
                <input
                  type="text"
                  name="edcDiploma3"
                  placeholder="Ex: Licence Développeur Web"
                />
                <label>Description</label>
                <textarea
                  name="edcDescription3"
                  placeholder="Tâches et missions..."
                />
              </div>
            </section>
          )}
          {secondCounter < 2 && (
            <div
              onClick={() => setSecondCoutner((prev) => prev + 1)}
              className={styles.addBtn}
            >
              <FaPlus />
              Ajouter formation
            </div>
          )}
          <section className={styles.formSection}>
            <h4>Liens</h4>
            <div className={styles.formBlock}>
              <label>Linkedin</label>
              <input
                type="text"
                name="linkedin"
                placeholder="Ex: https://www.linkedin.com/in/filip-petrovic-business/"
              />
              <label>Twitter</label>
              <input
                type="text"
                name="twitter"
                placeholder="Ex: https://x.com/fp__business"
              />
              <label>GitHub</label>
              <input
                type="text"
                name="github"
                placeholder="Ex: https://github.com/FilipPFS"
              />
              <label>Site Personnel</label>
              <input
                type="text"
                name="personal"
                placeholder="Ex: https://filip-petrovic.com/"
              />
            </div>
          </section>
          <section className={styles.formSection}>
            <h4>Visibilité</h4>
            <div className={styles.formBlock}>
              <label>Rendre mon profil visible (Recommandé)</label>
              <select name="visibility">
                <option value={"public"}>Oui</option>
                <option value={"private"}>Non</option>
              </select>
            </div>
          </section>
          <button type="submit" className={styles.btn}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;

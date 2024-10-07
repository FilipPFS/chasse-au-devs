import { Experience } from "@/models/User";
import styles from "./ExperienceForm.module.css";
import { FaExclamation } from "react-icons/fa";

type Props = {
  experience: Experience[] | undefined;
};

const ExperienceForm = ({ experience }: Props) => {
  const number = 3 - experience!.length;

  return (
    <div className={styles.experienceBlock}>
      <h2>Expérience professionnelle</h2>
      <div className={styles.experienceContainer}>
        {experience!.length > 0 && (
          <>
            {experience?.map((singleExperience, index) => (
              <div className={styles.formBlock}>
                <label>Nom de l'entreprise</label>
                <input
                  type="text"
                  name={`expTitle${index + 1}`}
                  defaultValue={singleExperience.jobTitle}
                  placeholder="Ex: Développeur Full Stack"
                />
                <label>Expérience</label>
                <div className={styles.selectContainer}>
                  <input
                    type="number"
                    defaultValue={Number(
                      singleExperience.yearsWorked.split(" ")[0]
                    )}
                    name={`exp_number${index + 1}`}
                    min={1}
                    max={12}
                  />
                  <select
                    name={`exp_select${index + 1}`}
                    defaultValue={singleExperience.yearsWorked.split(" ")[1]}
                  >
                    <option>mois</option>
                    <option>ans</option>
                  </select>
                </div>
                <label>Description</label>
                <textarea
                  name={`expDescription${index + 1}`}
                  defaultValue={singleExperience.quickDescription}
                  placeholder="Tâches et missions..."
                />
              </div>
            ))}
          </>
        )}
        {Array.from({ length: number }, (_, i) => (
          <div className={styles.formBlock} key={i}>
            <label>Nom de l'entreprise</label>
            <input
              type="text"
              name={`expTitle${experience!.length + i + 1}`}
              placeholder="Ex: Développeur Full Stack"
            />
            <label>Expérience</label>
            <div className={styles.selectContainer}>
              <input
                type="number"
                name={`exp_number${experience!.length + i + 1}`}
                min={1}
                max={12}
              />
              <select name={`exp_select${experience!.length + i + 1}`}>
                <option>mois</option>
                <option>ans</option>
              </select>
            </div>
            <label>Description</label>
            <textarea
              name={`expDescription${experience!.length + i + 1}`}
              placeholder="Tâches et missions..."
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;

import { Education } from "@/models/User";
import styles from "./EducationForm.module.css";

type Props = {
  education: Education[] | undefined;
};

const EducationForm = ({ education }: Props) => {
  const number = 3 - education!.length;

  return (
    <div className={styles.educationBlock}>
      <h2>Formations</h2>
      <div className={styles.educationContainer}>
        {education!.length > 0 && (
          <>
            {education?.map((singleEducation, index) => (
              <div className={styles.formBlock}>
                <label>Nom de l'établissement</label>
                <input
                  type="text"
                  name={`edcSchool${index + 1}`}
                  defaultValue={singleEducation.schoolName}
                  placeholder="Ex: Développeur Full Stack"
                />
                <label>Diplome obtenu</label>
                <input
                  type="text"
                  name={`edcDiploma${index + 1}`}
                  defaultValue={singleEducation.diploma}
                />
                <label>Description</label>
                <textarea
                  name={`edcDescription${index + 1}`}
                  defaultValue={singleEducation.quickDescription}
                  placeholder="Tâches et missions..."
                />
              </div>
            ))}
          </>
        )}
        {Array.from({ length: number }, (_, i) => (
          <div className={styles.formBlock}>
            <label>Nom de l'établissement</label>
            <input
              type="text"
              name={`edcSchool${education!.length + i + 1}`}
              placeholder="Ex: Sorbonne Université"
            />
            <label>Diplôme obtenu</label>
            <input
              type="text"
              name={`edcDiploma${education!.length + i + 1}`}
              placeholder="Ex: Licence Développeur Web"
            />
            <label>Description</label>
            <textarea
              name={`edcDescription${education!.length + i + 1}`}
              placeholder="Tâches et missions..."
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;

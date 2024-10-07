import { Links } from "@/models/User";
import styles from "./SocialMediaForm.module.css";

type Props = {
  links: Links | undefined;
};

const SocialMediaForm = ({ links }: Props) => {
  return (
    <section className={styles.formSection}>
      <div className={styles.formBlock}>
        <label>Linkedin</label>
        <input
          type="text"
          name="linkedin"
          defaultValue={links?.linkedin ? links?.linkedin : ""}
          placeholder="Ex: https://www.linkedin.com/in/filip-petrovic-business/"
        />
      </div>
      <div className={styles.formBlock}>
        <label>Twitter</label>
        <input
          type="text"
          name="twitter"
          defaultValue={links?.twitter ? links?.twitter : ""}
          placeholder="Ex: https://x.com/fp__business"
        />
      </div>
      <div className={styles.formBlock}>
        <label>GitHub</label>
        <input
          type="text"
          name="github"
          defaultValue={links?.github ? links?.github : ""}
          placeholder="Ex: https://github.com/FilipPFS"
        />
      </div>
      <div className={styles.formBlock}>
        <label>Site Personnel</label>
        <input
          type="text"
          name="personal"
          defaultValue={links?.personnal ? links?.personnal : ""}
          placeholder="Ex: https://filip-petrovic.com/"
        />
      </div>
    </section>
  );
};

export default SocialMediaForm;

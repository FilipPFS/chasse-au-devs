import { UserType } from "@/types/user";
import React from "react";
import styles from "./ProfileInfos.module.css";
import {
  FaClock,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaWebAwesome,
  FaX,
  FaXTwitter,
} from "react-icons/fa6";

type Props = {
  user: UserType | null;
};

const ProfileInfos = ({ user }: Props) => {
  return (
    <section className={styles.mainPage}>
      <div className={styles.experienceContainer}>
        <h1>Expérience professionnelle</h1>
        <div className={styles.experience}>
          {user?.experience?.map((exp) => (
            <div className={styles.expCard}>
              <h2>{exp.jobTitle}</h2>
              <small className={styles.expTime}>
                <FaClock /> {exp.yearsWorked} an(s)
              </small>
              <p className={styles.textContent}>{exp.quickDescription}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.experienceContainer}>
        <h1>Formation</h1>
        <div className={styles.experience}>
          {user?.education?.map((edc) => (
            <div className={styles.edcCard}>
              <h2>{edc.schoolName}</h2>
              <small className={styles.expTime}>
                <FaGraduationCap /> {edc.diploma}
              </small>
              <p className={styles.textContent}>{edc.quickDescription}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.experienceContainer}>
        <h1>Mes liens</h1>
        <div className={styles.links}>
          {user?.links?.linkedin && (
            <a
              href={user.links.linkedin}
              target="_blank"
              className={styles.link}
            >
              <FaLinkedin /> Linkedin
            </a>
          )}
          {user?.links?.twitter && (
            <a
              href={user.links.twitter}
              target="_blank"
              className={styles.link}
            >
              <FaXTwitter /> Twitter
            </a>
          )}
          {user?.links?.github && (
            <a href={user.links.github} target="_blank" className={styles.link}>
              <FaGithub /> Github
            </a>
          )}
          {user?.links?.personnal && (
            <a
              href={user.links.personnal}
              target="_blank"
              className={styles.link}
            >
              <FaWebAwesome /> Site Personnel
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfos;

import { Loader } from "lucide-react";
import React from "react";
import styles from "./LoaderSession.module.css";

const LoaderSession = () => {
  return (
    <div className={styles.container}>
      <Loader className={styles.loader} size={30} />
    </div>
  );
};

export default LoaderSession;

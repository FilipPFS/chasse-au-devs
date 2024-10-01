import { Loader } from "lucide-react";
import React from "react";
import styles from "./LoaderSpinner.module.css";

const LoaderSpinner = () => {
  return (
    <div className={styles.container}>
      <Loader className={styles.loader} size={30} />
    </div>
  );
};

export default LoaderSpinner;

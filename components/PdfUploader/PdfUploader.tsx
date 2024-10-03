"use client";

import { FaCheckCircle, FaFilePdf } from "react-icons/fa";
import styles from "./PdfUploader.module.css";
import { InputHTMLAttributes, useState } from "react";

type Props = {
  name: string;
  type: string;
};

const PdfUploader = ({ name, type }: Props) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label className={styles.fileUploadLabel}>
        {fileName ? (
          <>
            {fileName} <FaCheckCircle />
          </>
        ) : (
          <>
            <FaFilePdf /> Téléchargez votre {type}
          </>
        )}
        <input
          type="file"
          accept="application/pdf"
          name={name}
          className={styles.fileUploadInput}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default PdfUploader;

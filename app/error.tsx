"use client";

import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";

type ErrorProps = {
  error: Error; // Use the built-in Error type
};

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div>
      <FaExclamationCircle size={50} color="red" />
      <h1>Oops. Une erreur est survenue.</h1>
      <p>{error.message}</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default ErrorPage;

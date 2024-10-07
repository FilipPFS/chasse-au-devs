import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <section>
      <div>
        <div>
          <div>
            <FaExclamationTriangle className="text-8xl text-yellow-400" />
          </div>
          <div>
            <h1>Page non trouvé</h1>
            <p>Cette page n'existe pas.</p>
            <Link href="/">Revenir à l'accueil</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

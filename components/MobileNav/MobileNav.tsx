"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import styles from "./MobileNav.module.css";
import Providers from "../Providers/Providers";

type Props = {
  userEmployer: "employer" | "candidat" | undefined;
};

const MobileNav = ({ userEmployer }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobileLinks}>
      <button
        className={styles.openButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaBars className={styles.barsIcon} />
      </button>
      {open && (
        <div className={styles.mobileNav}>
          <Link
            href={"/jobs"}
            className={styles.navLink}
            onClick={() => setOpen(false)}
          >
            Offres
          </Link>
          <>
            {userEmployer === "employer" ? (
              <Link
                href={"/applications/received"}
                className={styles.navLink}
                onClick={() => setOpen(false)}
              >
                Candidatures
              </Link>
            ) : (
              <Link
                href={"/applications/sent"}
                className={styles.navLink}
                onClick={() => setOpen(false)}
              >
                Mes Candidatures
              </Link>
            )}
          </>
          {userEmployer === "employer" && (
            <Link href={"/my-account/offers"} onClick={() => setOpen(false)}>
              Mes offres
            </Link>
          )}
          <Providers setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default MobileNav;

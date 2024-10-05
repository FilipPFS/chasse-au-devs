import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Providers from "../Providers/Providers";
import { getSessionDb } from "@/app/actions/getSessionDb";
import { UserType } from "@/types/user";

const Navbar = async () => {
  const user: UserType | null = await getSessionDb();

  return (
    <nav className={styles.navigation}>
      <Link href={"/"} className={styles.logo}>
        <Image
          src={"/images/search-icon.webp"}
          alt="logo"
          width={60}
          height={60}
        />
        <h1>ChasseAuDevs</h1>
      </Link>

      <div className={styles.links}>
        <Link href={"/jobs"} className={styles.navLink}>
          Offres
        </Link>
        {user && (
          <>
            {user.employer === "employer" ? (
              <Link href={"/applications/received"} className={styles.navLink}>
                Candidatures
              </Link>
            ) : (
              <Link href={"/applications/sent"} className={styles.navLink}>
                Mes Candidatures
              </Link>
            )}
          </>
        )}
        {user?.employer === "employer" && (
          <Link href={"/my-account/offers"}>Mes offres</Link>
        )}
        <Providers />
      </div>
    </nav>
  );
};

export default Navbar;

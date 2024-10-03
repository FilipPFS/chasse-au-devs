"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const Navbar = () => {
  const { data: session } = useSession();
  const [linksVisible, setLinksVisible] = useState(false);

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const getAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    getAuthProviders();
  }, []);

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
        {session ? (
          <>
            <Link href={"/applications"} className={styles.navLink}>
              Candidatures
            </Link>
            <div
              className={styles.profile}
              onClick={() => setLinksVisible((prev) => !prev)}
            >
              <Image
                src={session.user.image ? session.user.image : ""}
                alt="google avatar"
                width={40}
                height={40}
                className={styles.avatar}
              />
              <h4 className={styles.username}>{session.user.name}</h4>
              {linksVisible && (
                <section className={styles.linksVisible}>
                  <Link href={"/my-account"} className={styles.profileLink}>
                    Mon Compte
                  </Link>
                  <button onClick={() => signOut()} className={styles.signOut}>
                    Se déconnecter
                  </button>
                </section>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, index) => {
                return (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={index}
                    className={styles.connectButton}
                  >
                    <FaGoogle />
                    Se connecter
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

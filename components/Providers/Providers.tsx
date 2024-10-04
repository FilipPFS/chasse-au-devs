"use client";
import styles from "./Providers.module.css";
import Image from "next/image";
import Link from "next/link";
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

const Providers = () => {
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
    <div>
      {session ? (
        <>
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
  );
};

export default Providers;

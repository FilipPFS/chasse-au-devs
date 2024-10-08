"use client";
import styles from "./Providers.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import LoaderSession from "../LoaderSession/LoaderSession";

type Props = {
  setOpen?: (value: SetStateAction<boolean>) => void;
};

const Providers = ({ setOpen }: Props) => {
  const { data: session, status } = useSession();
  const [linksVisible, setLinksVisible] = useState(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (status === "loading") {
    return <LoaderSession />;
  }

  return (
    <>
      {session ? (
        <>
          <div
            className={styles.profile}
            onClick={() => setLinksVisible((prev) => !prev)}
          >
            <Image
              src={session.user.image || ""}
              alt="google avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <h4 className={styles.username}>{session.user.name}</h4>
            {linksVisible && (
              <section className={styles.linksVisible}>
                <Link href="/my-account" className={styles.profileLink}>
                  Mon Compte
                </Link>
                <button onClick={() => signOut()} className={styles.signOut}>
                  Se déconnecter
                </button>
              </section>
            )}
          </div>
          <div className={styles.mobileProfile}>
            <Link href="/my-account" onClick={() => setOpen?.(false)}>
              <Image
                src={session.user.image || ""}
                alt="google avatar"
                width={40}
                height={40}
                className={styles.avatar}
              />
            </Link>
            <button onClick={() => signOut()} className={styles.connectButton}>
              Se déconnecter
            </button>
          </div>
        </>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider, index) => (
              <button
                onClick={() => signIn(provider.id)}
                key={index}
                className={styles.connectButton}
              >
                <FaGoogle />
                Se connecter
              </button>
            ))}
        </>
      )}
    </>
  );
};

export default Providers;

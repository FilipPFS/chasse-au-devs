import { getUserProfile } from "@/app/actions/getUserProfile";
import ProfileInfos from "@/components/ProfileInfos/ProfileInfos";
import Image from "next/image";
import React from "react";
import styles from "./ProfileId.module.css";
import { UserType } from "@/types/user";
import { FaEyeSlash } from "react-icons/fa";

type Props = {};

const ProfileId = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const user: UserType = await getUserProfile(params.id);

  if (!user) {
    throw new Error("L'utilisateur n'existe pas.");
  }

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div className={styles.userContainer}>
          <Image
            src={user?.image!}
            alt="image avatar"
            width={100}
            height={100}
          />
          <div>
            <h2>{user?.username}</h2>
          </div>
        </div>
      </section>
      {user.visible ? (
        <ProfileInfos user={user} />
      ) : (
        <div className={styles.notVisibleBlock}>
          <h2 className={styles.notVisibleTitle}>
            <FaEyeSlash /> Le compte de l'utilisateur n'est pas visible.
          </h2>
        </div>
      )}
    </div>
  );
};

export default ProfileId;

import Image from "next/image";
import { UserType } from "@/types/user";
import CompleteProfileButton from "@/components/CompleteProfileButton/CompleteProfileButton";
import { getSessionDb } from "../actions/getSessionDb";
import ProfileInfos from "@/components/ProfileInfos/ProfileInfos";
import styles from "./myAccount.module.css";
import { FaEye } from "react-icons/fa";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {};

const MyAccount = async (props: Props) => {
  const user: UserType | null = await getSessionDb();

  if (!user) {
    return <div>No user found.</div>;
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
            <small className={styles.smallInfo}>
              <FaEye /> Votre profil est {user.visible ? "visible" : "privée"}
            </small>
          </div>
        </div>
        {user.education?.length === 0 && user.experience?.length === 0 && (
          <CompleteProfileButton />
        )}
        {user.education!.length > 0 && user.experience!.length > 0 && (
          <Link href={"/my-account/complete"} className={styles.editButton}>
            Modifier mon profil
          </Link>
        )}
      </section>
      <ProfileInfos user={user} />
    </div>
  );
};

export default MyAccount;

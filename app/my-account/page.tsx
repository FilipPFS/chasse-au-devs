import Image from "next/image";
import { UserType } from "@/types/user";
import CompleteProfileButton from "@/components/CompleteProfileButton/CompleteProfileButton";
import { getSessionDb } from "../actions/getSessionDb";
import ProfileInfos from "@/components/ProfileInfos/ProfileInfos";
import styles from "./myAccount.module.css";
import { FaEye } from "react-icons/fa";

type Props = {};

const MyAccount = async (props: Props) => {
  const user: UserType | null = await getSessionDb();

  if (!user) {
    return <div>No user</div>;
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
        <CompleteProfileButton />
      </section>
      <ProfileInfos user={user} />
    </div>
  );
};

export default MyAccount;

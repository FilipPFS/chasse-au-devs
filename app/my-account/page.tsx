import React from "react";
import { getSessionDb } from "../actions/getSessionDb";
import Image from "next/image";
import { UserType } from "@/types/user";
import CompleteProfileButton from "@/components/CompleteProfileButton/CompleteProfileButton";

type Props = {};

const MyAccount = async (props: Props) => {
  const user: UserType | null = await getSessionDb();

  return (
    <div>
      <section>
        <div>
          <Image
            src={user?.image!}
            alt="image avatar"
            width={100}
            height={100}
          />
          <h2>{user?.username}</h2>
        </div>
        <CompleteProfileButton user={user} />
      </section>
    </div>
  );
};

export default MyAccount;

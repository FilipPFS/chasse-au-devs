import connectToDb from "@/config/database";
import React from "react";

const Home = async () => {
  await connectToDb();
  return <div>Home</div>;
};

export default Home;

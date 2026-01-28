import React from "react";
import Banner from "./Banner";
import AllFriends from "./AllFriends";
import { useLoaderData } from "react-router";
import Memories from "./Memories";

const Home = () => {
  const friends = useLoaderData();
  // console.log(friends);
  return (
    <div>
      <section className="container ">
        <Banner></Banner>
        <Memories></Memories>
        <AllFriends friends={friends}></AllFriends>
      </section>
    </div>
  );
};

export default Home;

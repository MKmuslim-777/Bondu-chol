import React from "react";
import Banner from "./Banner";
import AllFriends from "./AllFriends";
import { useLoaderData } from "react-router";
import Gallery from "./Gallery";

const Home = () => {
  const friends = useLoaderData();
  // console.log(friends);
  return (
    <div>
      <section className="container ">
        <Banner></Banner>
        <Gallery></Gallery>
        <AllFriends friends={friends}></AllFriends>
      </section>
    </div>
  );
};

export default Home;

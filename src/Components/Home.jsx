import React from "react";
import Banner from "./Banner";
import { useLoaderData } from "react-router";
import Memories from "./Memories";
import TravelStats from "./TravelStats/TravelStats";
import FriendsTestimonials from "./FriendsTestimonials/FriendsTestimonials";

const Home = () => {
  return (
    <div>
      <section className="">
        <Banner></Banner>
        <Memories></Memories>

        <TravelStats></TravelStats>
        <FriendsTestimonials></FriendsTestimonials>
      </section>
    </div>
  );
};

export default Home;

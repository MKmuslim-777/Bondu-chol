import React from "react";
// import { useLoaderData } from 'react-router';
import Friend from "./Friend";
// import Marquee from 'react-fast-marquee';

const AllFriends = ({ friends }) => {
  console.log(friends);

  return (
    <div>
      <h2 className="text-center text-5xl my-16">All Friends</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend}></Friend>
        ))}
      </div>
    </div>
  );
};

export default AllFriends;

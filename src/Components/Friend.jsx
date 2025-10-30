import React from "react";
import Marquee from "react-fast-marquee";
import { FaBriefcase } from "react-icons/fa";

const Friend = ({ friend }) => {
  const { name, photoUrl, profession } = friend;

  return (
    // <Marquee pauseOnHover={true} speed={60}>
      <div className="w-64 bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
        <img src={photoUrl} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
            <FaBriefcase className="text-[#088599]" />
            <p className="text-sm font-medium">{profession}</p>
          </div>
        </div>
      </div>
    // </Marquee>
  );
};

export default Friend;

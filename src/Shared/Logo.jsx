import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to={"/"} className="font-bold text-2xl">
        বন্ধু <span className="text-yellow-500">চল</span>
      </Link>
    </div>
  );
};

export default Logo;

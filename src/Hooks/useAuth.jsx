import React, { use } from "react";
import { AuthContext } from "../Components/context/AuthContext/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;

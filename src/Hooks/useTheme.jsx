import { use } from "react";
import { ThemeContext } from "../Components/context/ThemeContext/ThemeContext";

const useTheme = () => {
  const themeInfo = use(ThemeContext);
  return themeInfo;
};

export default useTheme;

import { useSelector, useDispatch } from "react-redux";
import { handleDarkMode } from "@/store/layout";

const useDarkMode = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.layout.darkMode);

  const setDarkMode = (mode) => {
    dispatch(handleDarkMode(mode));
  };

  return [isDark, setDarkMode];
};

export default useDarkMode;

import { createSlice } from "@reduxjs/toolkit";

const initialDarkMode = () => {
  const item = window?.localStorage?.getItem("darkMode");
  return item ? JSON.parse(item) : false;
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    darkMode: initialDarkMode(),
    mobileMenu: false,
  },
  reducers: {
    handleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      window?.localStorage?.setItem("darkMode", JSON.stringify(action.payload));
      if (action.payload) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    },
    handleMobileMenu: (state, action) => {
      state.mobileMenu = action.payload;
    },
  },
});

export const { handleDarkMode, handleMobileMenu } = layoutSlice.actions;
export default layoutSlice.reducer;

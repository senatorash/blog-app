import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: null,
};

export const blogSlice = createSlice({
  initialState,
  name: "blogState",
  reducers: {
    clearBlog: () => initialState,
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export default blogSlice.reducer;
export const { clearBlog, setBlog } = blogSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isError: false,
  completed: false,
  currentLecture: null,
};

const courseProgressSlice = createSlice({
  name: "courseProgress",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setCourseData: (state, action) => {
      state.data = action.payload;
      state.completed = action.payload.completed;
      state.currentLecture = action.payload.courseDetails.lectures[0];
    },
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
    },
    markCompleted: (state) => {
      state.completed = true;
    },
    markIncompleted: (state) => {
      state.completed = false;
    },

    markLectureViewed: (state, action) => {
      const lectureId = action.payload;
      const alreadyViewed = state.data?.progress?.some(
        (p) => p.lectureId === lectureId && p.viewed
      );
      if (!alreadyViewed) {
        state.data.progress.push({ lectureId, viewed: true });
      }
    },
  },
});

export const {
  setError,
  setCourseData,
  setCurrentLecture,
  markCompleted,
  markIncompleted,
  markLectureViewed,
} = courseProgressSlice.actions;

export default courseProgressSlice.reducer;

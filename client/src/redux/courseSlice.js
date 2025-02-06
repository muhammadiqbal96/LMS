import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        instructorCourse: [],
        singleCourse: [],
        lectures: [],
    },
    reducers: {
        setinstructorCourse: (state, action) => {
            state.instructorCourse = action.payload;
        },
        setsingleCourse: (state, action) => {
            state.singleCourse = action.payload;
        },
        setlectures: (state, action) => {
            state.lectures = action.payload;
        },
    }
});
export const { setinstructorCourse, setsingleCourse, setlectures } = courseSlice.actions;
export default courseSlice.reducer;
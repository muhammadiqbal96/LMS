import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        instructorCourse: [],
        singleCourse: [],
    },
    reducers: {
        setinstructorCourse: (state, action) => {
            state.instructorCourse = action.payload;
        },
        setsingleCourse: (state, action) => {
            state.singleCourse = action.payload;
        },
    }
});
export const { setinstructorCourse, setsingleCourse } = courseSlice.actions;
export default courseSlice.reducer;
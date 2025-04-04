import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        courses: [],
        instructorCourse: [],
        singleCourse: [],
        singleCoursePurchasedStatus: null,
        lectures: [],
    },
    reducers: {
        setcourses: (state, action) => {
            state.courses = action.payload;
        },
        setinstructorCourse: (state, action) => {
            state.instructorCourse = action.payload;
        },
        setsingleCourse: (state, action) => {
            state.singleCourse = action.payload;
        },
        setsingleCoursePurchasedStatus: (state, action) => {
            state.singleCoursePurchasedStatus = action.payload;
        },
        setlectures: (state, action) => {
            state.lectures = action.payload;
        },
    }
});
export const { setcourses, setinstructorCourse, setsingleCourse, setlectures, setsingleCoursePurchasedStatus } = courseSlice.actions;
export default courseSlice.reducer;